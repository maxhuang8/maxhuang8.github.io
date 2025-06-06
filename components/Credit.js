import { styled } from '../stitches.config'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export default function MessagePopup({ 
  isOpen, 
  onClose, 
  title, 
  message,
  showCloseButton = true,
  autoCloseDelay = null 
}) {
  useEffect(() => {
    if (isOpen && autoCloseDelay) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [isOpen, autoCloseDelay, onClose])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={jetbrainsMono.className}>
    <Overlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        {title && <PopupTitle>{title}</PopupTitle>}
        <PopupMessage>{message}</PopupMessage>
        {showCloseButton && (
          <CloseButton onClick={onClose}>
            Close
          </CloseButton>
        )}
      </PopupContainer>
    </Overlay>
    </div>,
    document.body
  )
}

const Overlay = styled('div', {
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '16px', 
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
  zIndex: 9999,
  animation: 'fadeIn 200ms ease-out',
  
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
})

const PopupContainer = styled('div', {
  backgroundColor: '#1a1c1e',
  maxWidth: '600px',
  width: '100%',
  color: '$primary',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: '24px',
  animation: 'slideIn 200ms ease-out',
  
  '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
    backgroundColor: '$command',
    WebkitBackdropFilter: 'saturate(300%) blur(25px)',
    backdropFilter: 'saturate(300%) blur(25px)',
  },
  
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(-20px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
})

const PopupTitle = styled('h2', {
  margin: '0 0 16px 0',
  fontSize: '20px',
  fontWeight: '600',
  color: '$primary',
})

const PopupMessage = styled('p', {
  margin: '0 0 20px 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '$secondary',
})

const CloseButton = styled('button', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$primary',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 200ms ease',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, .15)',
    transform: 'translateY(-1px)',
  },
  
  '&:active': {
    transform: 'translateY(0)',
  },
})