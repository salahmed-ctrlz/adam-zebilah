import { useState, useEffect } from 'react'

/**
 * Hook to detect device performance capabilities
 * Returns performance settings based on device capabilities
 */
export function usePerformanceDetection() {
  const [performanceSettings, setPerformanceSettings] = useState({
    isLowEnd: false,
    reduceAnimations: false,
    lowerFPS: false,
    disableWebGL: false
  })

  useEffect(() => {
    const detectPerformance = () => {
      // Check for mobile devices
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4
      
      // Check memory (if available)
      const memory = navigator.deviceMemory || 4
      
      // Check connection speed
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Determine if device is low-end (less aggressive detection)
      const isLowEnd = (
        (isMobile && (cores <= 2 || memory <= 2 || isSlowConnection)) ||
        (!isMobile && cores <= 1) ||
        prefersReducedMotion
      )
      
      setPerformanceSettings({
        isLowEnd,
        reduceAnimations: isLowEnd || prefersReducedMotion,
        lowerFPS: isLowEnd,
        disableWebGL: isLowEnd // Disable WebGL on all low-end devices, not just mobile
      })
    }

    detectPerformance()
    
    // Listen for connection changes
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      connection.addEventListener('change', detectPerformance)
      return () => connection.removeEventListener('change', detectPerformance)
    }
  }, [])

  return performanceSettings
}
