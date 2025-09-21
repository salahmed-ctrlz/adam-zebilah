import React, { useState, useEffect } from 'react'
import { useI18n } from '../../utils/i18n.jsx'

/**
 * Animation Toggle Component for Hero Section
 * Allows users to pause/resume background animations and auto-disables when scrolled past hero
 */
export function AnimationToggle() {
  const { t } = useI18n()
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isInHero, setIsInHero] = useState(true)
  const [userManuallyPaused, setUserManuallyPaused] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Check if user is in hero section and if scrolled past 50%
    const checkHeroSection = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const heroHeight = heroSection.offsetHeight
        const scrollProgress = Math.abs(rect.top) / heroHeight
        
        // Hide button when scrolled past 50% of hero section
        const isInHeroSection = rect.bottom > 0 && rect.top < window.innerHeight
        const shouldShow = isInHeroSection && scrollProgress < 0.5
        
        setIsInHero(shouldShow)
        
        // Auto-disable animation when scrolled past 50% of hero
        if (scrollProgress >= 0.5 && !isPaused) {
          setIsPaused(true)
          window.dispatchEvent(new CustomEvent('animationToggle', { 
            detail: { isPaused: true } 
          }))
        }
        // Auto-resume animation when back in first 50% of hero section (only if not manually paused)
        else if (scrollProgress < 0.5 && isPaused && !userManuallyPaused) {
          setIsPaused(false)
          window.dispatchEvent(new CustomEvent('animationToggle', { 
            detail: { isPaused: false } 
          }))
        }
      }
    }

    // Initial check
    checkHeroSection()
    
    // Listen for scroll events
    window.addEventListener('scroll', checkHeroSection, { passive: true })
    return () => window.removeEventListener('scroll', checkHeroSection)
  }, [isPaused])

  const handleToggle = () => {
    const newState = !isPaused
    setIsPaused(newState)
    
    // Track if user manually paused (for auto-resume logic)
    if (newState) {
      setUserManuallyPaused(true)
    } else {
      setUserManuallyPaused(false)
    }
    
    // Dispatch custom event for other components to listen
    console.log('AnimationToggle: Button clicked! Dispatching event', { isPaused: newState })
    window.dispatchEvent(new CustomEvent('animationToggle', { 
      detail: { isPaused: newState } 
    }))
    
    // Also try dispatching to document for broader compatibility
    document.dispatchEvent(new CustomEvent('animationToggle', { 
      detail: { isPaused: newState } 
    }))
  }

  // Don't show on mobile or when not in hero section
  if (isMobile || !isInHero) return null

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 animation-toggle-wrapper">
      <div className="flex flex-col items-center gap-3">
        {/* Toggle Button */}
        <label className="animation-toggle-container">
          <input 
            type="checkbox" 
            checked={!isPaused} 
            onChange={handleToggle}
            aria-label={isPaused ? "Resume animation" : "Pause animation"}
          />
          <svg
            className="play"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
            />
          </svg>
          <svg
            className="pause"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path
              d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
            />
          </svg>
        </label>
        
        {/* Label under button */}
        <div className="text-center mt-4">
          <span className="text-xs text-white/60 font-medium">
            {isPaused ? t('services.playAnimation') : t('services.pauseAnimation')}
          </span>
        </div>
      </div>
    </div>
  )
}
