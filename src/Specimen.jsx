import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

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
  valve: '#e0cdbf',
}

const modelUrl = (id) => `${import.meta.env.BASE_URL}models/${id}.glb`

function Model({ id, kind }) {
  const { scene } = useGLTF(modelUrl(id))
  const group = useRef()

  const object = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: TINT[kind],
      roughness: 0.78,
      metalness: 0,
      side: THREE.DoubleSide,
    })
    const clone = scene.clone(true)
    clone.traverse((o) => {
      if (!o.isMesh) return
      if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals()
      o.material = material
    })
    return clone
  }, [scene, kind])

  useFrame((_, dt) => {
    group.current.rotation.y += dt * 0.32
  })

  return (
    <group ref={group}>
      <primitive object={object} />
    </group>
  )
}

export function preload(id) {
  useGLTF.preload(modelUrl(id))
}

export default function Specimen({ id, kind }) {
  return (
    <Canvas camera={{ position: [0, 0.15, 2.4], fov: 32 }} dpr={[1, 2]}>
      <hemisphereLight args={['#ffffff', '#b9b2a6', 1.1]} />
      <directionalLight position={[2.5, 3, 2]} intensity={1.6} />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} />
      <Suspense fallback={null}>
        <Model key={id} id={id} kind={kind} />
      </Suspense>
      <ContactShadows position={[0, -0.62, 0]} opacity={0.18} scale={2.4} blur={2.8} far={1.2} />
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.6} />
    </Canvas>
  )
}
