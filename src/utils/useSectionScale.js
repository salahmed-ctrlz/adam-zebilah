import { useEffect, useRef, useState } from 'react'

/**
 * Hook to scale sections when they come into view
 * @param {number} scale - Scale factor (default 1.1)
 * @param {number} threshold - Intersection threshold (default 0.3)
 * @returns {Object} - { ref, isInView, scale }
 */
export function useSectionScale(scale = 1.1, threshold = 0.3) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay for smoother transition
        setTimeout(() => {
          setIsInView(entry.isIntersecting)
        }, 100)
      },
      {
        threshold,
        rootMargin: '-5% 0px -5% 0px' // Less aggressive margin for smoother trigger
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return {
    ref,
    isInView,
    scale: isInView ? scale : 1
  }
}
