import { useEffect, useRef } from 'react'
import { styled } from '../stitches.config'

/* ───────── configurable bits ───────── */
const RADIUS      = 120      // spotlight size (px)
const HIDE_DELAY  = 2000     // ms after last move before fading
const IMG_PATH    = '/static/images/headshot.png'

/* ───────── styled container ───────── */
const Container = styled('div', {
  position: 'relative',
  width: 280,        // change to real img size
  height: 350,
  backgroundImage: `url("${IMG_PATH}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
  userSelect: 'none',

  /* coloured “sand” grain overlay */
  '&::after': {
    content: '',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage:
      `repeating-linear-gradient( 45deg, rgba(255,180,0,.07) 0 2px , transparent 2px 4px),
       repeating-linear-gradient(-45deg, rgba(  0,200,255,.07) 0 3px , transparent 3px 6px)`,
    mixBlendMode: 'overlay',
  },

  /* circular mask driven by CSS vars */
  maskImage:
    'radial-gradient(circle var(--r,0px) at var(--x,0px) var(--y,0px), ' +
    '#ffffff 0%, #ffffff 60%, transparent 65%)',
  WebkitMaskImage:
    'radial-gradient(circle var(--r,0px) at var(--x,0px) var(--y,0px), ' +
    '#ffffff 0%, #ffffff 60%, transparent 65%)',

  /* smooth grow / shrink */
  transition: 'mask-image .55s cubic-bezier(.25,1,.3,1), -webkit-mask-image .55s cubic-bezier(.25,1,.3,1)',
})

/* ───────── component ───────── */
export default function HeadshotReveal () {
  const ref   = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = e => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      el.style.setProperty('--x', `${x}px`)
      el.style.setProperty('--y', `${y}px`)
      el.style.setProperty('--r', `${RADIUS}px`)            // grow

      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        el.style.setProperty('--r', '0px')                  // shrink
      }, HIDE_DELAY)
    }

    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      clearTimeout(timer.current)
    }
  }, [])

  return <Container ref={ref} />
}