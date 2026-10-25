// Builds public/anatomy.glb from BodyParts3D.
//   node scripts/build-models.mjs <4.0 assets folder> <3.0 stl folder>
// 4.0: the IS-A mesh set as packed by github.com/tamir-ichikawa/human-atlas
//      (dist/assets: atlas.json + <system>.bin.gz, metres, Y-up).
// 3.0: STL files from github.com/Kevin-Mattheus-Moerman/BodyParts3D (mm, Z-up).
// Each node is one part, named by its FMA id, at its place in the body (metres,
// Y-up), so a structure can be shown among its neighbours. Includes the quiz
// parts and the note figures' parts. See src/data/sources.js for how ids map.
// Normals are computed at load time: stored normals would unweld the mesh.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { Document, Logger, NodeIO } from '@gltf-transform/core'
import { KHRMeshQuantization } from '@gltf-transform/extensions'
import { weld, simplifyPrimitive, quantize } from '@gltf-transform/functions'
import { MeshoptSimplifier } from 'meshoptimizer'
import { STRUCTURES, PART_KIND } from '../src/data/structures.js'
import { VIEW_PARTS } from '../src/data/views.js'
import { ALIASES } from '../src/data/sources.js'

const [V4_DIR, V3_DIR] = process.argv.slice(2)
const OUT = new URL('../public/anatomy.glb', import.meta.url).pathname
const QUIZ_TRIANGLES = 4000
const CONTEXT_TRIANGLES = 1200
const FIGURE_TRIANGLES = 3000

if (!V4_DIR || !V3_DIR) throw new Error('usage: build-models.mjs <4.0 assets dir> <3.0 stl dir>')

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

function v4Meshes(id) {
  const concepts = ALIASES[id] ?? [id.replace('nsn', '')]
  return concepts.flatMap((c) => byConcept[c] ?? []).map(readV4)
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
  let meshes = v4Meshes(id)
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
