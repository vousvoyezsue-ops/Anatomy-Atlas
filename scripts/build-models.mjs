// Builds public/anatomy.glb from BodyParts3D.
//   node scripts/build-models.mjs <4.0 assets folder> <4.3 repo> <3.0 stl folder>
// 4.0: the IS-A mesh set as packed by github.com/tamir-ichikawa/human-atlas
//      (dist/assets: atlas.json + <system>.bin.gz, metres, Y-up).
// 4.3: github.com/olivercase/body_parts_3d_api, OBJ files kept in Git LFS
//      (mm, Z-up). Only the meshes needed are downloaded, into .cache/, and
//      checked against their LFS hash. Used for what 4.0 lacks, e.g. nerves.
// 3.0: STL files from github.com/Kevin-Mattheus-Moerman/BodyParts3D (mm, Z-up),
//      for what neither has (the lung lobes, some abdominal wall muscles).
// Each node is one part, named by its FMA id, at its place in the body (metres,
// Y-up), so a structure can be shown among its neighbours. Includes the quiz
// parts and the note figures' parts. See src/data/sources.js for how ids map.
// Normals are computed at load time: stored normals would unweld the mesh.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import { Document, Logger, NodeIO } from '@gltf-transform/core'
import { KHRMeshQuantization } from '@gltf-transform/extensions'
import { weld, simplifyPrimitive, quantize } from '@gltf-transform/functions'
import { MeshoptSimplifier } from 'meshoptimizer'
import { STRUCTURES, PART_KIND } from '../src/data/structures.js'
import { VIEW_PARTS } from '../src/data/views.js'
import { ALIASES } from '../src/data/sources.js'

const [V4_DIR, V43_DIR, V3_DIR] = process.argv.slice(2)
const CACHE = new URL('../.cache/bp3d-4.3/', import.meta.url).pathname
const OUT = new URL('../public/anatomy.glb', import.meta.url).pathname
const QUIZ_TRIANGLES = 4000
const CONTEXT_TRIANGLES = 1200
const FIGURE_TRIANGLES = 3000

if (!V3_DIR) throw new Error('usage: build-models.mjs <4.0 assets dir> <4.3 repo> <3.0 stl dir>')

// --- BodyParts3D 4.0 -------------------------------------------------------

const atlas = JSON.parse(fs.readFileSync(path.join(V4_DIR, 'atlas.json'), 'utf8'))
const byConcept = {}
for (const p of atlas.parts) (byConcept[p.concept] ??= []).push(p)

const packs = {}
function pack(system) {
  packs[system] ??= zlib.gunzipSync(fs.readFileSync(path.join(V4_DIR, `${system}.bin.gz`)))
  return packs[system]
}

// A 4.0 mesh: positions are stored about the part's centre, indices are uint32.
function readV4(p) {
  const buf = pack(p.system)
  const at = (offset, Type, count) => new Type(buf.buffer.slice(buf.byteOffset + offset, buf.byteOffset + offset + count * Type.BYTES_PER_ELEMENT))
  const positions = at(p.offset, Float32Array, p.vertices * 3)
  for (let i = 0; i < positions.length; i++) positions[i] += p.center[i % 3]
  const indices = at(p.offset + p.vertices * 24, Uint32Array, p.indices)
  return { positions, indices }
}

// --- BodyParts3D 4.3 -------------------------------------------------------

// Mesh files are named FJ…_BP…_FMA<concept>_<name>.obj.
const v43Files = {}
for (const file of fs.readdirSync(path.join(V43_DIR, 'meshes'))) {
  const concept = file.split('_')[2]
  ;(v43Files[concept] ??= []).push(file)
}

async function fetchV43(file) {
  const cached = path.join(CACHE, file)
  if (!fs.existsSync(cached)) {
    const pointer = fs.readFileSync(path.join(V43_DIR, 'meshes', file), 'utf8')
    const oid = pointer.match(/sha256:([0-9a-f]{64})/)[1]
    const url = `https://media.githubusercontent.com/media/olivercase/body_parts_3d_api/main/meshes/${encodeURIComponent(file)}`
    const body = Buffer.from(await (await fetch(url)).arrayBuffer())
    if (crypto.createHash('sha256').update(body).digest('hex') !== oid) throw new Error(`hash mismatch: ${file}`)
    fs.mkdirSync(CACHE, { recursive: true })
    fs.writeFileSync(cached, body)
  }
  return fs.readFileSync(cached, 'utf8')
}

// OBJ in mm, Z-up → metres, Y-up, same axes as 3.0 below: (x, z, -y).
function parseObj(text) {
  const v = []
  const f = []
  for (const line of text.split('\n')) {
    if (line.startsWith('v ')) {
      const [x, y, z] = line.slice(2).trim().split(/\s+/).map(Number)
      v.push(x / 1000, z / 1000, -y / 1000)
    } else if (line.startsWith('f ')) {
      const idx = line.slice(2).trim().split(/\s+/).map((t) => parseInt(t, 10) - 1)
      for (let k = 1; k < idx.length - 1; k++) f.push(idx[0], idx[k], idx[k + 1])
    }
  }
  return { positions: Float32Array.from(v), indices: Uint32Array.from(f) }
}

// --- BodyParts3D 3.0 -------------------------------------------------------

// Binary STL → unindexed triangles. BodyParts3D 3.0: x = left, y = posterior,
// z = superior (mm). three.js: x = right of screen, y = up, z = toward viewer
// (m). Viewed from the front the patient's left is on screen right: (x, z, -y).
function readV3(id) {
  const buf = fs.readFileSync(path.join(V3_DIR, `${id}.stl`))
  const count = buf.readUInt32LE(80)
  const positions = new Float32Array(count * 9)
  for (let i = 0; i < count * 3; i++) {
    const base = 84 + Math.floor(i / 3) * 50 + 12 + (i % 3) * 12 // skip each facet normal
    positions[i * 3] = buf.readFloatLE(base) / 1000
    positions[i * 3 + 1] = buf.readFloatLE(base + 8) / 1000
    positions[i * 3 + 2] = -buf.readFloatLE(base + 4) / 1000
  }
  return { positions, indices: Uint32Array.from({ length: count * 3 }, (_, i) => i) }
}

// --- One mesh per part -----------------------------------------------------

// Each concept from 4.0 if it has it, else from 4.3.
async function newerMeshes(id) {
  const concepts = ALIASES[id] ?? [id.replace('nsn', '')]
  const meshes = []
  for (const c of concepts) {
    if (byConcept[c]) meshes.push(...byConcept[c].map(readV4))
    else for (const file of v43Files[c] ?? []) meshes.push(parseObj(await fetchV43(file)))
  }
  return meshes
}

function merge(meshes) {
  const positions = new Float32Array(meshes.reduce((n, m) => n + m.positions.length, 0))
  const indices = new Uint32Array(meshes.reduce((n, m) => n + m.indices.length, 0))
  let p = 0
  let i = 0
  for (const m of meshes) {
    positions.set(m.positions, p)
    for (let k = 0; k < m.indices.length; k++) indices[i + k] = m.indices[k] + p / 3
    p += m.positions.length
    i += m.indices.length
  }
  return { positions, indices }
}

await MeshoptSimplifier.ready
const quizParts = new Set(STRUCTURES.flatMap((s) => s.fma))
const doc = new Document().setLogger(new Logger(Logger.Verbosity.WARN))
const buffer = doc.createBuffer()
const scene = doc.createScene()
const ALL_PARTS = [...new Set([...Object.keys(PART_KIND), ...Object.keys(VIEW_PARTS)])]
const fromV3 = []

for (const id of ALL_PARTS) {
  let meshes = await newerMeshes(id)
  if (!meshes.length) {
    meshes = [readV3(id)]
    fromV3.push(id)
  }
  const { positions, indices } = merge(meshes)
  const prim = doc
    .createPrimitive()
    .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(positions).setBuffer(buffer))
    .setIndices(doc.createAccessor().setType('SCALAR').setArray(indices).setBuffer(buffer))
  scene.addChild(doc.createNode(id).setMesh(doc.createMesh(id).addPrimitive(prim)))
}

await doc.transform(weld())

// Quiz and note-figure parts keep more detail than the faint surroundings.
function budget(id) {
  if (VIEW_PARTS[id]) return VIEW_PARTS[id]
  if (quizParts.has(id)) return QUIZ_TRIANGLES
  if (id in VIEW_PARTS) return FIGURE_TRIANGLES
  return CONTEXT_TRIANGLES
}

for (const mesh of doc.getRoot().listMeshes()) {
  const prim = mesh.listPrimitives()[0]
  const ratio = Math.min(1, budget(mesh.getName()) / (prim.getIndices().getCount() / 3))
  simplifyPrimitive(prim, { simplifier: MeshoptSimplifier, ratio, error: 0.01 })
}

await doc.transform(quantize({ quantizePosition: 14 }))
await new NodeIO().registerExtensions([KHRMeshQuantization]).write(OUT, doc)
console.log(`${ALL_PARTS.length} parts (${fromV3.length} from 3.0) → ${(fs.statSync(OUT).size / 1e6).toFixed(1)} MB`)
console.log(`from 3.0: ${fromV3.join(' ')}`)
