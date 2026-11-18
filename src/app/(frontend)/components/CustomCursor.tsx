'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable completely on mobile / touch devices and reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || prefersReducedMotion) {
      return
    }

    setEnabled(true)

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isHovered = false
    let isClicked = false
    let isVisible = false
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        ringX = mouseX
        ringY = mouseY
      }
    }

    const onMouseDown = () => {
      isClicked = true
    }

    const onMouseUp = () => {
      isClicked = false
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest(
        'a, button, .button, input, select, textarea, [role="button"], .profile-card, .feature-card, .domain-card, .prize-card, .faq-item, .accordion-item, .nav-logo'
      )
      isHovered = !!interactive
    }

    const onMouseLeave = () => {
      isVisible = false
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.opacity = '0'
        ringRef.current.style.opacity = '0'
      }
    }

    const onMouseEnter = () => {
      isVisible = true
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.opacity = '1'
        ringRef.current.style.opacity = '1'
      }
    }

    // Smooth animation loop using lerp for the outer ring
    const render = () => {
      if (isVisible) {
        // Dot tracks mouse directly with 0 lag
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 0.75 : isHovered ? 1.3 : 1
          })`
          dotRef.current.style.opacity = '1'
        }

        // Ring follows smoothly with damping
        const lerpFactor = 0.22
        ringX += (mouseX - ringX) * lerpFactor
        ringY += (mouseY - ringY) * lerpFactor

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 0.8 : isHovered ? 1.45 : 1
          })`
          ringRef.current.style.opacity = isHovered ? '0.95' : '0.75'
          ringRef.current.style.borderColor = isHovered ? '#FFD600' : 'rgba(255, 214, 0, 0.65)'
          ringRef.current.style.boxShadow = isHovered
            ? '0 0 18px rgba(255, 214, 0, 0.45), inset 0 0 10px rgba(255, 214, 0, 0.12)'
            : '0 0 10px rgba(255, 214, 0, 0.2)'
        }
      }

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Outer subtle transparent yellow ring matching Screenshot 2 */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 214, 0, 0.65)',
          backgroundColor: 'rgba(255, 214, 0, 0.04)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
          opacity: 0,
        }}
      />
      {/* Center sharp yellow dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#FFD600',
          boxShadow: '0 0 6px rgba(255, 214, 0, 0.8)',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
          transition: 'transform 0.15s ease, opacity 0.2s ease',
          opacity: 0,
        }}
      />
    </div>
  )
}
