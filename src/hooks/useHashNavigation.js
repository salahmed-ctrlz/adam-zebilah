import { useEffect, useState, useCallback } from 'react'

/**
 * Custom hook for hash-based navigation
 */
export function useHashNavigation() {
  const [currentHash, setCurrentHash] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  // Get current hash from URL
  const getCurrentHash = useCallback(() => {
    return window.location.hash.slice(1) // Remove the # symbol
  }, [])

  // Navigate to a section with smooth scrolling
  const navigateToSection = useCallback((sectionId, options = {}) => {
    const {
      behavior = 'smooth',
      block = 'start',
      inline = 'nearest',
      offset = 0
    } = options

    setIsNavigating(true)

    // Update URL hash
    const newHash = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId
    window.history.pushState(null, null, `#${newHash}`)
    setCurrentHash(newHash)

    // Find the target element
    const targetElement = document.getElementById(newHash)
    
    if (targetElement) {
      // Calculate scroll position with offset
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      // Smooth scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: behavior
      })

      // Update focus for accessibility
      targetElement.focus({ preventScroll: true })
      
      // Set aria-current for screen readers
      document.querySelectorAll('[data-section]').forEach(el => {
        el.removeAttribute('aria-current')
      })
      targetElement.setAttribute('aria-current', 'true')
    }

    // Reset navigating state after scroll completes
    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }, [])

  // Navigate to top of page
  const navigateToTop = useCallback(() => {
    setIsNavigating(true)
    window.history.pushState(null, null, '#')
    setCurrentHash('')
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    // Remove aria-current from all sections
    document.querySelectorAll('[data-section]').forEach(el => {
      el.removeAttribute('aria-current')
    })

    setTimeout(() => {
      setIsNavigating(false)
    }, 1000)
  }, [])

  // Handle browser back/forward buttons and initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = getCurrentHash()
      setCurrentHash(hash)
      
      if (hash) {
        // Wait for DOM to be ready before navigating
        const navigateToHash = () => {
          const targetElement = document.getElementById(hash)
          if (targetElement) {
            const offset = 80 // Account for fixed navbar
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - offset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }

        // Wait for loading screen to complete before navigating
        const waitForLoadingComplete = () => {
          const loadingScreen = document.querySelector('.fixed.inset-0.bg-black.z-\\[9999\\]')
          if (!loadingScreen) {
            // Loading screen is gone, safe to navigate
            setTimeout(navigateToHash, 200) // Small delay to ensure content is rendered
          } else {
            // Still loading, wait a bit more
            setTimeout(waitForLoadingComplete, 100)
          }
        }

        // Start waiting for loading to complete
        waitForLoadingComplete()
      } else {
        // Navigate to top if no hash
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    // Set initial hash but don't navigate on first load
    const initialHash = getCurrentHash()
    setCurrentHash(initialHash)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [getCurrentHash])

  // Handle scroll-based hash updates (optional)
  const updateHashOnScroll = useCallback(() => {
    if (isNavigating) return // Don't update hash while programmatically navigating

    const sections = document.querySelectorAll('[data-section]')
    const scrollPosition = window.scrollY + 100 // Offset for navbar

    let currentSection = ''
    
    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentSection = section.id
        }
      }
    })

    // Update hash if we're in a different section
    if (currentSection && currentSection !== currentHash) {
      window.history.replaceState(null, null, `#${currentSection}`)
      setCurrentHash(currentSection)
    } else if (!currentSection && currentHash) {
      // At top of page
      window.history.replaceState(null, null, '#')
      setCurrentHash('')
    }
  }, [currentHash, isNavigating])

  // Enable scroll-based hash updates
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHashOnScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Enable scroll-based hash updates
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [updateHashOnScroll])

  return {
    currentHash,
    isNavigating,
    navigateToSection,
    navigateToTop,
    getCurrentHash
  }
}
