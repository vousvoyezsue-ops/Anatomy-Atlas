// Downloads the published model into public/, for working on the site or the
// figures without building it from BodyParts3D (`npm run sources && npm run models`).
import fs from 'node:fs'

const URL = 'https://vousvoyezsue-ops.github.io/Anatomy-Atlas/anatomy.glb'
const OUT = new globalThis.URL('../public/anatomy.glb', import.meta.url)

const res = await fetch(URL)
if (!res.ok) throw new Error(`${URL}: ${res.status}`)
fs.mkdirSync(new globalThis.URL('.', OUT), { recursive: true })
fs.writeFileSync(OUT, Buffer.from(await res.arrayBuffer()))
console.log(`public/anatomy.glb ← ${URL} (${(fs.statSync(OUT).size / 1e6).toFixed(1)} MB)`)
