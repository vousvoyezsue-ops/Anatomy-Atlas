import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { loadAnatomy } from './anatomy.js'
import { COLOURS } from './data/views.js'

const MODEL_URL = `${import.meta.env.BASE_URL}${import.meta.env.VITE_MODEL_FILE ?? 'anatomy.glb'}`
const FRAME = 1.3
const RESUME_AFTER = 3 // seconds of stillness before auto-rotation resumes
const deg = (d) => ((d ?? 0) * Math.PI) / 180

const solid = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, side: THREE.DoubleSide })
const faint = (color, opacity) =>
  new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide })

const BACKDROP = faint('#bdb6ab', 0.14)

// Colours each group, fades the others while one is in focus, shows the soft
// parts faintly and hides everything else. Returns centre and size to frame.
function paint({ parts }, view, focus, materials) {
  const owner = {}
  view.groups.forEach((g, i) => g.parts.forEach((id) => (owner[id] = i)))
  const soft = new Set(view.soft)

  for (const [id, { mesh }] of Object.entries(parts)) {
    const g = owner[id]
    mesh.visible = g !== undefined || soft.has(id)
    if (g !== undefined) {
      const dim = focus !== null && focus !== g
      mesh.material = dim ? materials[g].faint : materials[g].solid
      mesh.renderOrder = dim ? 1 : 0
    } else {
      mesh.material = BACKDROP
      mesh.renderOrder = 2
    }
  }

  const box = new THREE.Box3()
  const framed = view.frame ?? view.groups.flatMap((g) => g.parts)
  for (const id of framed) if (parts[id]) box.union(parts[id].box)
  return { centre: box.getCenter(new THREE.Vector3()), size: box.getSize(new THREE.Vector3()).length() }
}

function Model({ anatomy, view, focus, idle, resetKey }) {
  const spin = useRef()
  const materials = useMemo(
    () =>
      view.groups.map((g) => ({
        solid: solid(COLOURS[g.colour]),
        faint: faint(COLOURS[g.colour], 0.16),
      })),
    [view],
  )
  const framing = useMemo(() => paint(anatomy, view, null, materials), [anatomy, view, materials])

  useLayoutEffect(() => {
    paint(anatomy, view, focus, materials)
  }, [anatomy, view, focus, materials])

  useLayoutEffect(() => {
    spin.current.rotation.y = deg(view.turn)
  }, [view, resetKey])

  useFrame((_, dt) => {
    if (view.spin && idle.current > RESUME_AFTER) spin.current.rotation.y += dt * 0.25
    idle.current += dt
  })

  return (
    <group rotation-x={deg(view.tilt)} scale={(FRAME * (view.zoom ?? 1)) / framing.size}>
      <group ref={spin}>
        <group position={framing.centre.clone().multiplyScalar(-1)}>
          <primitive object={anatomy.root} />
        </group>
      </group>
    </group>
  )
}

// Centres the model in the part of the frame the legend leaves free, and
// applies the vertical shift from a right-button drag. Both are screen-space
// shifts of the camera's view window, so rotation is untouched.
function ViewWindow({ room, pan, resetKey }) {
  const { camera, size } = useThree()
  useLayoutEffect(() => {
    const { width: W, height: H } = size
    let dx = 0
    let dy = 0
    let zoom = 1
    if (room && W && H) {
      const pad = 10
      const right = { w: W - room.right - pad, h: H } // beside the legend
      const above = { w: W, h: room.top - pad } // above the legend
      const fit = (r) => Math.min(r.w / W, r.h / H)
      if (fit(right) >= fit(above)) {
        dx = (W - right.w) / 2
        zoom = fit(right)
      } else {
        dy = -(H - above.h) / 2
        zoom = fit(above)
      }
      zoom = Math.min(1, Math.max(0.68, zoom + 0.12))
    }
    camera.setViewOffset(W, H, -dx, -(dy + pan), W, H)
    camera.zoom = zoom
    camera.updateProjectionMatrix()
  }, [camera, size, room, pan, resetKey])
  return null
}

export default function Figure({ view }) {
  const [anatomy, setAnatomy] = useState(null)
  const [failed, setFailed] = useState(false)
  const [hover, setHover] = useState(null)
  const [locked, setLocked] = useState(null)
  const [visible, setVisible] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const idle = useRef(RESUME_AFTER + 1)
  const controls = useRef()
  const shell = useRef()
  const legend = useRef()
  const [room, setRoom] = useState(null)
  const [pan, setPan] = useState(0)
  const drag = useRef(null)

  // Where the legend sits, so the model can be placed beside or above it.
  useLayoutEffect(() => {
    const measure = () => {
      if (!shell.current || !legend.current) return
      const s = shell.current.getBoundingClientRect()
      const l = legend.current.getBoundingClientRect()
      setRoom({ right: l.right - s.left, top: l.top - s.top })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(shell.current)
    ro.observe(legend.current)
    return () => ro.disconnect()
  }, [view])

  // Right-button drag: move the model up and down only, keeping its angle.
  const onPointerDown = (e) => {
    if (e.button !== 2) return
    drag.current = { y: e.clientY, pan }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const h = shell.current.clientHeight / 2
    setPan(Math.max(-h, Math.min(h, drag.current.pan + e.clientY - drag.current.y)))
  }
  const onPointerUp = () => (drag.current = null)

  useEffect(() => {
    loadAnatomy(MODEL_URL).then(setAnatomy, () => setFailed(true))
  }, [])

  // Don't draw while scrolled out of view: a note may hold several figures.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(shell.current)
    return () => io.disconnect()
  }, [])

  const reset = () => {
    controls.current?.reset()
    setLocked(null)
    setPan(0)
    idle.current = RESUME_AFTER + 1
    setResetKey((k) => k + 1)
  }

  const focus = hover ?? locked

  return (
    <div
      className="figure"
      ref={shell}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {anatomy ? (
        <Canvas
          className="canvas"
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [0, 0, 2.6], fov: 30 }}
          dpr={[1, 2]}
          onPointerDown={() => (idle.current = -Infinity)}
          onPointerUp={() => (idle.current = 0)}
          onPointerLeave={() => idle.current < 0 && (idle.current = 0)}
        >
          <hemisphereLight args={['#ffffff', '#b9b2a6', 1.1]} />
          <directionalLight position={[2.5, 3, 2]} intensity={1.5} />
          <directionalLight position={[-3, 1, -2]} intensity={0.5} />
          <Model anatomy={anatomy} view={view} focus={focus} idle={idle} resetKey={resetKey} />
          <ViewWindow room={room} pan={pan} resetKey={resetKey} />
          <OrbitControls ref={controls} enablePan={false} minDistance={1.2} maxDistance={5} rotateSpeed={0.6} />
        </Canvas>
      ) : (
        <p className="status">{failed ? '모델을 불러오지 못했어요.' : '불러오는 중…'}</p>
      )}

      <ul className="legend" ref={legend} onMouseLeave={() => setHover(null)}>
        {view.groups.map((g, i) => (
          <li key={g.label}>
            <button
              className={focus === i ? 'on' : focus !== null ? 'off' : ''}
              onMouseEnter={() => setHover(i)}
              onClick={() => setLocked((l) => (l === i ? null : i))}
              aria-pressed={locked === i}
            >
              <span className="dot" style={{ background: COLOURS[g.colour] }} />
              {g.label}
              {g.ko && <span className="ko">{g.ko}</span>}
            </button>
          </li>
        ))}
      </ul>

      <button className="reset" onClick={reset} aria-label="Reset view" title="처음 각도로">
        ↺
      </button>
      <span className="credit">BodyParts3D 4.0 & 3.0 © DBCLS · CC BY-SA 2.1 JP</span>
    </div>
  )
}
