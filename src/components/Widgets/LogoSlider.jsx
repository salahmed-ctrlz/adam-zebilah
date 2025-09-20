import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { logos } from '../../utils/data'

/**
 * Logo slider component with seamless loop and fade edges
 */
export function LogoSlider() {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const sliderRef = useRef(null)

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos]

  useEffect(() => {
    if (prefersReducedMotion) return

    const slider = sliderRef.current
    if (!slider) return

    let animationId
    let position = 0
    const speed = 0.5 // pixels per frame
    const logoWidth = 200 // approximate logo width + gap

    const animate = () => {
      if (!isHovered) {
        position -= speed
        if (position <= -logoWidth * logos.length) {
          position = 0
        }
        slider.style.transform = `translateX(${position}px)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isHovered, prefersReducedMotion])

  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges using CSS mask */}
      <div 
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        <motion.div
          ref={sliderRef}
          className="flex items-center gap-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={prefersReducedMotion ? {} : {
            x: isHovered ? 0 : [-200, -400],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
