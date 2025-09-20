import { useRef, useEffect } from 'react'
import { useInView, useAnimation } from 'framer-motion'

/**
 * Custom hook for staggered animations when elements come into view
 * @param {number} delay - Delay between each item animation in seconds
 * @param {number} threshold - Intersection observer threshold (0-1)
 * @returns {Object} - { ref, controls, inView }
 */
export function useInViewStagger(delay = 0.1, threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    threshold,
    once: true // Only trigger once
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return { ref, controls, inView: isInView }
}

/**
 * Animation variants for staggered children
 */
export const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export const slideUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}
