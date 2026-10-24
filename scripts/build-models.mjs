// Converts BodyParts3D STL files into small, centred GLB models.
//   node scripts/build-models.mjs <path-to-BodyParts3D stl folder>
// For each structure: merge its parts, convert mm → unit size, re-orient to
// Y-up, weld + simplify, quantize, write public/models/<id>.glb.
// Normals are computed at load time: stored normals would unweld the mesh.

import fs from 'node:fs'
import path from 'node:path'
import { Document, Logger, NodeIO } from '@gltf-transform/core'
import { KHRMeshQuantization } from '@gltf-transform/extensions'
import { weld, simplify, quantize } from '@gltf-transform/functions'
import { MeshoptSimplifier } from 'meshoptimizer'
import { STRUCTURES } from '../src/data/structures.js'

const STL_DIR = process.argv[2]
const OUT_DIR = new URL('../public/models/', import.meta.url).pathname
const TARGET_TRIANGLES = 9000

if (!STL_DIR) throw new Error('usage: build-models.mjs <stl dir>')
fs.mkdirSync(OUT_DIR, { recursive: true })

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
// three.js:    x = right of screen, y = up, z = toward viewer.
// Viewed from the front the patient's left is on screen right, so (x, z, -y).
function toYUp(v) {
  const out = new Float32Array(v.length)
  for (let i = 0; i < v.length; i += 3) {
    out[i] = v[i]
    out[i + 1] = v[i + 2]
    out[i + 2] = -v[i + 1]
  }
  return out
}

function centreAndScale(v) {
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < v.length; i++) {
    const a = i % 3
    if (v[i] < min[a]) min[a] = v[i]
    if (v[i] > max[a]) max[a] = v[i]
  }
  const c = min.map((m, a) => (m + max[a]) / 2)
  const size = Math.max(...max.map((m, a) => m - min[a]))
  for (let i = 0; i < v.length; i++) v[i] = (v[i] - c[i % 3]) / size
}

await MeshoptSimplifier.ready
const io = new NodeIO().registerExtensions([KHRMeshQuantization])

for (const s of STRUCTURES) {
  const parts = s.fma.map((id) => readStl(path.join(STL_DIR, `${id}.stl`)))
  const merged = new Float32Array(parts.reduce((n, p) => n + p.length, 0))
  let offset = 0
  for (const p of parts) merged.set(p, offset), (offset += p.length)

  const positions = toYUp(merged)
  centreAndScale(positions)
  const triangles = positions.length / 9

  const doc = new Document().setLogger(new Logger(Logger.Verbosity.WARN))
  const buffer = doc.createBuffer()
  const attr = doc.createAccessor().setType('VEC3').setArray(positions).setBuffer(buffer)
  const prim = doc.createPrimitive().setAttribute('POSITION', attr)
  const mesh = doc.createMesh(s.id).addPrimitive(prim)
  doc.createScene().addChild(doc.createNode(s.id).setMesh(mesh))

  await doc.transform(
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: Math.min(1, TARGET_TRIANGLES / triangles), error: 0.002 }),
    quantize({ quantizePosition: 14 }),
  )

  const file = path.join(OUT_DIR, `${s.id}.glb`)
  await io.write(file, doc)
  const kb = Math.round(fs.statSync(file).size / 1024)
  console.log(`${s.id.padEnd(30)} ${String(triangles).padStart(7)} tris → ${kb} KB`)
}
