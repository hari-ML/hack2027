'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          if (docHeight > 0 && barRef.current) {
            const current = Math.min(Math.max(window.scrollY / docHeight, 0), 1)
            barRef.current.style.transform = `scaleX(${current})`
          }
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: '#FFD600',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        zIndex: 99999,
        pointerEvents: 'none',
        boxShadow: '0 0 12px rgba(255, 214, 0, 0.8), 0 0 20px rgba(255, 214, 0, 0.4)',
        transition: 'transform 0.08s linear',
      }}
      aria-hidden="true"
    />
  )
}
