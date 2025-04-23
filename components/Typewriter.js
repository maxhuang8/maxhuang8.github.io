import { useState, useEffect, useRef } from 'react'
import { styled, keyframes } from '../stitches.config'

const blink = keyframes({
  '0%,100%': { opacity: 1 },
  '50%'    : { opacity: 0 },
})

const Cursor = styled('span', {
  display: 'inline-block',
  width: '1ch',
  marginLeft: '2px',
  animation: `${blink} 1s step-end infinite`,
})

export default function Typewriter ({
  words,
  typingSpeed      = 120,
  deletingSpeed    = 60,
  pauseBeforeDelete = 2000,
  pauseAfterDelete  = 1000,  
}) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase,   setPhase]   = useState('typing') 
  const timeoutRef = useRef(null)

  const word = words[wordIdx]

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  useEffect(() => {
    const schedule = (cb, delay) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(cb, delay)
    }

    if (phase === 'typing') {
      if (charIdx < word.length) {
        schedule(() => setCharIdx(prev => prev + 1), typingSpeed)
      } else {
        setPhase('pausing')
        schedule(() => setPhase('deleting'), pauseBeforeDelete)
      }
    }

    else if (phase === 'deleting') {
      if (charIdx > 0) {
        schedule(() => setCharIdx(prev => prev - 1), deletingSpeed)
      } else {
        setPhase('waiting')
      }
    }

    else if (phase === 'waiting') {
      schedule(() => {
        setWordIdx(prev => (prev + 1) % words.length)
        setPhase('typing')
      }, pauseAfterDelete)
    }
  }, [
    phase, charIdx, word, words.length,
    typingSpeed, deletingSpeed,
    pauseBeforeDelete, pauseAfterDelete,
  ])

  return (
    <span>
      {word.slice(0, charIdx)}
      <Cursor>|</Cursor>
    </span>
  )
}