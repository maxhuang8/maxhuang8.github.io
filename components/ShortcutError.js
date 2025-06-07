import { useState, useEffect } from 'react'
import { ButtonPrimary } from '../components/ButtonPrimary'

export default function ShortcutError() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    if (isMobile) {
      return (
        <ButtonPrimary as="a" href="/">
          Tap to go home →
        </ButtonPrimary>
      )
    }

    return (
      <ButtonPrimary as="a" href="/">
        Tap to go home →
      </ButtonPrimary>
    )
  }

  return <div />
}
