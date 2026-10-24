import { useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { stage } from './anatomy.js'

// How much of the screen the framed region fills.
const FRAME = 1.25

function Body({ anatomy, ids }) {
  const pivot = useRef()
  const [framing, setFraming] = useState(null)

  useLayoutEffect(() => {
    setFraming(stage(anatomy, ids))
    pivot.current.rotation.y = 0
  }, [anatomy, ids])

  useFrame((_, dt) => {
    pivot.current.rotation.y += dt * 0.3
  })

  const scale = framing ? FRAME / framing.view : 1
  const offset = framing ? framing.centre.clone().multiplyScalar(-1) : undefined

  return (
    <group ref={pivot} scale={scale}>
      <group position={offset}>
        <primitive object={anatomy.root} />
      </group>
    </group>
  )
}

export default function Specimen({ anatomy, ids }) {
  return (
    <Canvas camera={{ position: [0, 0.1, 2.4], fov: 32 }} dpr={[1, 2]}>
      <hemisphereLight args={['#ffffff', '#b9b2a6', 1.1]} />
      <directionalLight position={[2.5, 3, 2]} intensity={1.6} />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} />
      <Body anatomy={anatomy} ids={ids} />
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.6} />
    </Canvas>
  )
}
