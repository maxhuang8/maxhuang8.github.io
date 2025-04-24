import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { styled } from '../stitches.config'

/* —— shaders —— */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 gridUV = floor(vUv * 20.0) / 20.0;
    vec2 center = gridUV + vec2(0.05);
    vec2 mouseDir = u_mouse - u_prevMouse;

    float dist = length(center - u_mouse);
    float strength = smoothstep(0.3, 0.0, dist);

    vec2 uvOffset = strength * -mouseDir * 0.2;
    vec2 uv = vUv - uvOffset;

    vec4 cR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 cG = texture2D(u_texture, uv);
    vec4 cB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(cR.r, cG.g, cB.b, 1.0);
  }
`

/* —— styled wrapper —— */
const Wrapper = styled('div', {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '8px',
  '& canvas': {
    position: 'absolute',
    inset: 0,
    width: '100% !important',
    height: '100% !important',
    display: 'block',
  },
})

function HeadshotAberration({ src = '/static/images/avatar.jpg', size = 336 }) {
  const boxRef = useRef(null)
  const ease = useRef(0.02)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const target = useRef({ x: 0.5, y: 0.5 })
  const prev = useRef({ x: 0.5, y: 0.5 })
  const aberr = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const box = boxRef.current
    if (!box) return

    /* scene, camera, texture */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(80, 1, 0.01, 10)
    camera.position.z = 1

    const texture = new THREE.TextureLoader().load(src)
    const uniforms = {
      u_mouse: { value: new THREE.Vector2() },
      u_prevMouse: { value: new THREE.Vector2() },
      u_aberrationIntensity: { value: 0 },
      u_texture: { value: texture },
    }

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    )
    scene.add(plane)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    box.appendChild(renderer.domElement)

    /* animation loop */
    const tick = () => {
      requestAnimationFrame(tick)

      mouse.current.x += (target.current.x - mouse.current.x) * ease.current
      mouse.current.y += (target.current.y - mouse.current.y) * ease.current

      uniforms.u_mouse.value.set(mouse.current.x, 1 - mouse.current.y)
      uniforms.u_prevMouse.value.set(prev.current.x, 1 - prev.current.y)

      aberr.current = Math.max(0, aberr.current - 0.05)
      uniforms.u_aberrationIntensity.value = aberr.current

      renderer.render(scene, camera)
    }
    tick()

    /* handlers */
    const move = (e) => {
      const r = box.getBoundingClientRect()
      ease.current = 0.02
      prev.current = { ...target.current }
      target.current.x = (e.clientX - r.left) / r.width
      target.current.y = (e.clientY - r.top) / r.height
      aberr.current = 1
    }

    const enter = (e) => {
      const r = box.getBoundingClientRect()
      ease.current = 0.02
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      mouse.current = target.current = { x: px, y: py }
    }

    const leave = () => {
      ease.current = 0.05
      target.current = { ...prev.current }
    }

    box.addEventListener('mousemove', move)
    box.addEventListener('mouseenter', enter)
    box.addEventListener('mouseleave', leave)

    return () => {
      box.removeEventListener('mousemove', move)
      box.removeEventListener('mouseenter', enter)
      box.removeEventListener('mouseleave', leave)
      renderer.dispose()
      scene.clear()
    }
  }, [src, size])

  return <Wrapper ref={boxRef} style={{ width: size, height: size }} />
}

export default HeadshotAberration