import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for handling page navigation and scroll behavior.
 * It tracks the current hash, handles smooth scrolling to sections,
 * and updates the hash based on the currently viewed section.
 */
export function usePageNavigation() {
  const [currentHash, setCurrentHash] = useState('')
  const [isNavigating, setIsNavigating] = useState(false)

  const getCurrentHash = useCallback(() => window.location.hash.slice(1), [])

  const navigateToSection = useCallback((sectionId, options = {}) => {
    const { behavior = 'smooth', block = 'start', inline = 'nearest', offset = 0 } = options
    setIsNavigating(true)
    const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId
    window.history.pushState(null, null, `#${id}`)
    setCurrentHash(id)

    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: behavior,
      })
      element.focus({ preventScroll: true })
      document.querySelectorAll('[data-section]').forEach(el => {
        el.removeAttribute('aria-current')
      })
      element.setAttribute('aria-current', 'true')
    }
    setTimeout(() => setIsNavigating(false), 1000) // Prevent scroll listener from interfering
  }, [])

  const navigateToTop = useCallback(() => {
    setIsNavigating(true)
    window.history.pushState(null, null, '#')
    setCurrentHash('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.querySelectorAll('[data-section]').forEach(el => {
      el.removeAttribute('aria-current')
    })
    setTimeout(() => setIsNavigating(false), 1000)
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(getCurrentHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [getCurrentHash])

  return { currentHash, isNavigating, navigateToSection, navigateToTop, getCurrentHash }
}