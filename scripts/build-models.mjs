// Converts BodyParts3D STL files into one GLB scene, public/anatomy.glb.
//   node scripts/build-models.mjs <path-to-BodyParts3D stl folder>
// Every part keeps its place in the body (metres, Y-up) so a structure can be
// shown among its neighbours. Each node is named by its FMA id.
// Normals are computed at load time: stored normals would unweld the mesh.

import fs from 'node:fs'
import path from 'node:path'
import { Document, Logger, NodeIO } from '@gltf-transform/core'
import { KHRMeshQuantization } from '@gltf-transform/extensions'
import { weld, simplifyPrimitive, quantize } from '@gltf-transform/functions'
import { MeshoptSimplifier } from 'meshoptimizer'
import { STRUCTURES, PART_KIND } from '../src/data/structures.js'

const STL_DIR = process.argv[2]
const OUT = new URL('../public/anatomy.glb', import.meta.url).pathname
const QUIZ_TRIANGLES = 4000
const CONTEXT_TRIANGLES = 1200

if (!STL_DIR) throw new Error('usage: build-models.mjs <stl dir>')

// Binary STL → flat Float32Array of triangle vertices.
function readStl(file) {
  const buf = fs.readFileSync(file)
  const count = buf.readUInt32LE(80)
  const out = new Float32Array(count * 9)
  for (let i = 0; i < count; i++) {
    const base = 84 + i * 50 + 12 // skip the facet normal
    for (let j = 0; j < 9; j++) out[i * 9 + j] = buf.readFloatLE(base + j * 4)
  }
  return out
}

// BodyParts3D: x = left, y = posterior, z = superior (mm).
// three.js:    x = right of screen, y = up, z = toward viewer (m).
// Viewed from the front the patient's left is on screen right, so (x, z, -y).
function toYUpMetres(v) {
  const out = new Float32Array(v.length)
  for (let i = 0; i < v.length; i += 3) {
    out[i] = v[i] / 1000
    out[i + 1] = v[i + 2] / 1000
    out[i + 2] = -v[i + 1] / 1000
  }
  return out
}

await MeshoptSimplifier.ready
const quizParts = new Set(STRUCTURES.flatMap((s) => s.fma))
const doc = new Document().setLogger(new Logger(Logger.Verbosity.WARN))
const buffer = doc.createBuffer()
const scene = doc.createScene()

for (const id of Object.keys(PART_KIND)) {
  const positions = toYUpMetres(readStl(path.join(STL_DIR, `${id}.stl`)))
  const attr = doc.createAccessor().setType('VEC3').setArray(positions).setBuffer(buffer)
  const prim = doc.createPrimitive().setAttribute('POSITION', attr)
  scene.addChild(doc.createNode(id).setMesh(doc.createMesh(id).addPrimitive(prim)))
}

await doc.transform(weld())

// Quiz parts keep more detail than the faint surroundings.
for (const mesh of doc.getRoot().listMeshes()) {
  const prim = mesh.listPrimitives()[0]
  const cap = quizParts.has(mesh.getName()) ? QUIZ_TRIANGLES : CONTEXT_TRIANGLES
  const ratio = Math.min(1, cap / (prim.getIndices().getCount() / 3))
  simplifyPrimitive(prim, { simplifier: MeshoptSimplifier, ratio, error: 0.01 })
}

await doc.transform(quantize({ quantizePosition: 14 }))
await new NodeIO().registerExtensions([KHRMeshQuantization]).write(OUT, doc)
console.log(`${Object.keys(PART_KIND).length} parts → ${(fs.statSync(OUT).size / 1e6).toFixed(1)} MB`)
