// Writes docs/parts.tsv: every part the model can be built from, with its FMA
// id, so figures can be written without opening the BodyParts3D sources.
// Run after `npm run sources`. 3.0-only parts (a few lung lobes and muscles)
// are not listed; see README.
import fs from 'node:fs'

const root = new URL('../', import.meta.url).pathname
const atlas = JSON.parse(fs.readFileSync(root + '.sources/human-atlas/dist/assets/atlas.json', 'utf8'))
const rows = new Map()
for (const p of atlas.parts) rows.set(p.concept, [p.concept, p.name, p.system, '4.0'])

// 4.3: the concept is in the mesh file name, FJ…_BP…_FMA<concept>_<name>.obj
// (its MANIFEST.csv ids are not reliable).
for (const file of fs.readdirSync(root + '.sources/body_parts_3d_api/meshes')) {
  const [, , fma, ...name] = file.replace(/\.obj$/, '').split('_')
  if (!rows.has(fma)) rows.set(fma, [fma, name.join('_'), '', '4.3'])
}

const sorted = [...rows.values()].sort((a, b) => a[1].localeCompare(b[1]))
fs.writeFileSync(root + 'docs/parts.tsv', ['fma\tname\tsystem\tsource', ...sorted.map((r) => r.join('\t'))].join('\n') + '\n')
console.log(`docs/parts.tsv: ${sorted.length} parts`)
