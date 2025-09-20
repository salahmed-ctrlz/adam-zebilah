import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor component - Performance optimized
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 })
  const rafRef = useRef()

  const updateMousePosition = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    rafRef.current = requestAnimationFrame(() => {
      mouseX.set(e.clientX - 10)
      mouseY.set(e.clientY - 10)
    })
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave])

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        x: springX,
        y: springY,
        willChange: 'transform'
      }}
    />
  )
}
