import { useEffect, useRef } from 'react'

export default function PolymerizationCursor() {
  const LIFETIME_MS = 4000
  const ADD_INTERVAL_MS = 60
  const SPRING_K = 0.003
  const SPRING_LEN = 28
  const DAMPING = 0.96
  const DT = 16
  const BROWNIAN = 10
  const CROSSLINK_DIST = 55

  const canvasRef = useRef(null)
  const monomers = useRef([])
  const bonds = useRef([])
  const region = useRef({ left: 0, right: 0, top: 0, bottom: 0 })
  const lastAdd = useRef(0)

  const addBond = (i, j) => {
    if (i === j) return
    for (const [a, b] of bonds.current) if ((a === i && b === j) || (a === j && b === i)) return
    bonds.current.push([i, j])
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frameId
    const DPR = window.devicePixelRatio || 1

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      region.current = { left: w * 0.5, right: w, top: h * 0.1, bottom: h * 0.9 }
    }
    resize()
    window.addEventListener('resize', resize)

    const handlePointerMove = e => {
      const now = performance.now()
      if (now - lastAdd.current < ADD_INTERVAL_MS) return
      const { left, right, top, bottom } = region.current
      if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) return

      const idx = monomers.current.length
      let x = e.clientX, y = e.clientY
      if (idx > 0) {
        const prev = monomers.current[idx - 1]
        const dx = e.clientX - prev.x
        const dy = e.clientY - prev.y
        const dist = Math.hypot(dx, dy) || 1
        x = prev.x + (dx / dist) * SPRING_LEN
        y = prev.y + (dy / dist) * SPRING_LEN
      }
      monomers.current.push({ x, y, vx: 0, vy: 0, created: now, angle: Math.random() * Math.PI * 2 })
      if (idx > 0) addBond(idx - 1, idx)
      for (let j = 0; j < idx; j++) {
        const o = monomers.current[j]
        const dx = o.x - x, dy = o.y - y
        if (dx * dx + dy * dy < CROSSLINK_DIST * CROSSLINK_DIST) addBond(j, idx)
      }
      lastAdd.current = now
    }
    window.addEventListener('pointermove', handlePointerMove)

    const step = () => {
      const now = performance.now()

      // Remove expired
      for (let i = monomers.current.length - 1; i >= 0; i--) {
        if (now - monomers.current[i].created > LIFETIME_MS) {
          monomers.current.splice(i, 1)
          bonds.current = bonds.current.filter(([a, b]) => a !== i && b !== i).map(([a, b]) => [a - (a > i), b - (b > i)])
        }
      }

      // Forces
      for (const m of monomers.current) { m.fx = m.fy = 0 }
      for (const [ai, bi] of bonds.current) {
        const a = monomers.current[ai], b = monomers.current[bi]
        if (!a || !b) continue
        const dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx, dy) || 0.001
        const f = SPRING_K * (dist - SPRING_LEN)
        const fx = f * dx / dist, fy = f * dy / dist
        a.fx += fx; a.fy += fy; b.fx -= fx; b.fy -= fy
      }

      // Integrate
      for (const m of monomers.current) {
        m.fx += (Math.random() - 0.5) * BROWNIAN
        m.fy += (Math.random() - 0.5) * BROWNIAN
        m.vx = (m.vx + m.fx * DT * 0.001) * DAMPING
        m.vy = (m.vy + m.fy * DT * 0.001) * DAMPING
        m.x += m.vx; m.y += m.vy
        const { left, right, top, bottom } = region.current
        if (m.x < left) { m.x = left; m.vx *= -0.4 }
        if (m.x > right) { m.x = right; m.vx *= -0.4 }
        if (m.y < top) { m.y = top; m.vy *= -0.4 }
        if (m.y > bottom) { m.y = bottom; m.vy *= -0.4 }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Bonds
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(120,120,120,0.35)'
      ctx.beginPath()
      for (const [ai, bi] of bonds.current) {
        const a = monomers.current[ai], b = monomers.current[bi]
        if (!a || !b) continue
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
      }
      ctx.stroke()

      // Atoms
      for (const m of monomers.current) {
        const life = (now - m.created) / LIFETIME_MS
        const alpha = 1 - life
        // central darker red
        ctx.fillStyle = `rgba(189,7,7,${alpha})`
        ctx.beginPath(); ctx.arc(m.x, m.y, 4, 0, Math.PI * 2); ctx.fill()

        // satellites – darker, larger blue
        const smallR = 3, bondLen = 10, offset = Math.PI * 9 / 30
        ctx.fillStyle = `rgba(0,46,163,${alpha})`
        ctx.strokeStyle = `rgba(120,120,120,${alpha})`
        ctx.lineWidth = 1
        for (const s of [-1, 1]) {
          const ang = m.angle + s * offset
          const hx = m.x + Math.cos(ang) * bondLen
          const hy = m.y + Math.sin(ang) * bondLen
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(hx, hy); ctx.stroke()
          ctx.beginPath(); ctx.arc(hx, hy, smallR, 0, Math.PI * 2); ctx.fill()
        }
      }

      // (Tip radical highlight removed as requested)

      frameId = requestAnimationFrame(step)
    }
    frameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none' }} />
}