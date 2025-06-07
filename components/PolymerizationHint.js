import { useState, useEffect } from 'react'

export default function PolymerizationHint() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [hintPosition, setHintPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Check if desktop
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isLargeScreen = window.innerWidth > 768
      setIsVisible(!hasTouch && isLargeScreen)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)

    // Calculate hint position
    const updatePosition = () => {
      setHintPosition({
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.5
      })
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)

    // Hide hint only when cursor is close to it
    const handleMouseMove = (e) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - hintPosition.x, 2) + 
        Math.pow(e.clientY - hintPosition.y, 2)
      )
      // Disappear when cursor is within 50 pixels
      if (distance < 100) {
        setHasInteracted(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [hintPosition.x, hintPosition.y])

  if (!isVisible || hasInteracted) return null

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.9;
          }
        }
        .pulsing-hint {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
      <div
        className="pulsing-hint"
        style={{
          position: 'fixed',
          left: '75%',
          top: '47.5%',
          transform: 'translate(-50%, -50%)',
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.55)',
          letterSpacing: '0.5px',
          pointerEvents: 'none',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        try me {/*hover here→*/}
      </div>
    </>
  )
}