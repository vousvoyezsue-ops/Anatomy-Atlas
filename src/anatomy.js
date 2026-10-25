import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { PART_KIND, WALL_PARTS } from './data/structures.js'

// Quiet, desaturated palette — one colour per tissue type.
const TINT = {
  bone: '#e6dfd1',
  tooth: '#eee8dc',
  cartilage: '#cdd6d3',
  muscle: '#c49a91',
  organ: '#d2ab9b',
  lung: '#dcbcb6',
  artery: '#bd7a72',
  vein: '#8392a6',
  valve: '#c79b7e',
  nerve: '#b08528',
}

const solid = {}
const soft = {}
for (const [kind, color] of Object.entries(TINT)) {
  solid[kind] = new THREE.MeshStandardMaterial({ color, roughness: 0.78, side: THREE.DoubleSide })
  soft[kind] = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    transparent: true,
    opacity: kind === 'artery' || kind === 'vein' ? 0.16 : 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
}

// A backdrop of the same tissue as the answer (a cartilage among cartilages)
// would hide it, so that backdrop goes neutral instead of tinted.
const softNeutral = new THREE.MeshStandardMaterial({
  color: '#c4bdb2',
  roughness: 0.9,
  transparent: true,
  opacity: 0.22,
  depthWrite: false,
  side: THREE.DoubleSide,
})

// Surroundings share one soft neutral so the answer is the only colour.
const ghost = new THREE.MeshStandardMaterial({
  color: '#b9b3aa',
  roughness: 1,
  transparent: true,
  opacity: 0.11,
  depthWrite: false,
  side: THREE.DoubleSide,
})

// The whole body as one scene. Parts sit where they are in the body (metres).
// A ".txt" URL holds the same GLB as base64, for hosts that won't serve .glb.
export async function loadAnatomy(url) {
  const res = await fetch(url)
  let data = await res.arrayBuffer()
  if (url.endsWith('.txt')) {
    const bin = atob(new TextDecoder().decode(data))
    data = Uint8Array.from(bin, (c) => c.charCodeAt(0)).buffer
  }
  const gltf = await new GLTFLoader().parseAsync(data, '')
  const root = gltf.scene
  root.updateMatrixWorld(true)

  const parts = {}
  root.traverse((o) => {
    if (!o.isMesh) return
    o.geometry.computeVertexNormals()
    const id = o.parent?.name && PART_KIND[o.parent.name] ? o.parent.name : o.name
    o.userData.kind = PART_KIND[id]
    parts[id] = { mesh: o, box: new THREE.Box3().setFromObject(o) }
  })
  return { root, parts }
}

// Draws the card's parts solid and its backdrop (e.g. the heart) in soft colour,
// ghosts what lies around them unless the card is isolated, hides the rest.
// Returns the centre and the size of the region to frame.
export function stage({ parts }, card) {
  const target = new Set(card.fma)
  const backdrop = new Set(card.backdrop)
  const targetKinds = new Set(card.fma.map((id) => parts[id].mesh.userData.kind))
  // Frame the backdrop too, so a single branch is seen on the whole heart.
  const box = new THREE.Box3()
  for (const id of [...target, ...backdrop]) box.union(parts[id].box)
  const centre = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3()).length()
  // Isolated cards have no surroundings to leave room for, so frame them tighter.
  const view = card.isolated ? Math.max(size, 0.03) : Math.max(size * 1.5, 0.08)

  for (const [id, { mesh, box: b }] of Object.entries(parts)) {
    const kind = mesh.userData.kind
    if (target.has(id)) {
      mesh.visible = true
      mesh.material = solid[kind]
      mesh.renderOrder = 0
    } else if (backdrop.has(id)) {
      mesh.visible = true
      mesh.material = targetKinds.has(kind) ? softNeutral : soft[kind]
      mesh.renderOrder = 1
    } else {
      // Parts used only by note figures (no kind) stay out of the quiz.
      mesh.visible = !!kind && !card.isolated && !WALL_PARTS.has(id) && b.distanceToPoint(centre) < view * 0.4
      mesh.material = ghost
      mesh.renderOrder = 2
    }
  }
  return { centre, view }
}
