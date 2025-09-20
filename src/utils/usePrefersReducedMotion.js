import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if user prefers reduced motion
 * @returns {boolean} - true if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Get animation variants that respect reduced motion preference
 * @param {Object} normalVariants - Normal animation variants
 * @param {Object} reducedVariants - Reduced motion variants (optional)
 * @param {boolean} prefersReducedMotion - Whether user prefers reduced motion
 * @returns {Object} - Appropriate animation variants
 */
export function getMotionVariants(normalVariants, reducedVariants = null, prefersReducedMotion = false) {
  if (prefersReducedMotion) {
    return reducedVariants || {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.3 }
      }
    }
  }
  
  return normalVariants
}
