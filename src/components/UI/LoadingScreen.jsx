import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlurText from './BlurText'

/**
 * Loading screen component with BlurText animation and spinning loader
 */
export function LoadingScreen({ onComplete }) {
  const [showLoader, setShowLoader] = useState(true)
  const [contentLoaded, setContentLoaded] = useState(false)

  useEffect(() => {
    // Check if critical content is loaded
    const checkContentLoaded = () => {
      // Check if Home section and other critical elements are in DOM
      const homeSection = document.getElementById('home')
      const navbar = document.querySelector('nav')
      
      // Don't require liquidChrome to be loaded for initial display
      // const liquidChrome = document.querySelector('.liquid-chrome-container')
      
      // Check if critical images are loaded (Home section images)
      const homeImages = document.querySelectorAll('#home img')
      const homeImagesLoaded = homeImages.length === 0 || Array.from(homeImages).every(img => img.complete)
      
      return homeSection && navbar && homeImagesLoaded
    }

    // Minimum loading time - reduced for mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const minLoadingTime = isMobile ? 800 : 1500
    const startTime = Date.now()

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      
      if (checkContentLoaded() && elapsed >= minLoadingTime) {
        setContentLoaded(true)
        clearInterval(checkInterval)
        
        // Add a small delay for smooth transition
        setTimeout(() => {
          setShowLoader(false)
          setTimeout(() => {
            onComplete()
          }, 500) // Match the exit animation duration
        }, 300)
      }
    }, 100) // Check every 100ms

    // Fallback: maximum loading time - reduced for mobile
    const maxTimer = setTimeout(() => {
      if (!contentLoaded) {
        console.log('Loading screen timeout - forcing completion')
        setContentLoaded(true)
        clearInterval(checkInterval)
        setShowLoader(false)
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }, isMobile ? 2000 : 3000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(maxTimer)
    }
  }, [onComplete, contentLoaded])

  const handleTextAnimationComplete = () => {
    console.log('BlurText animation completed!')
  }

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
        >
          {/* BlurText Animation */}
          <div className="mb-12">
            <BlurText
              text="Adam Zebilah"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleTextAnimationComplete}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center"
            />
          </div>

          {/* Spinning Loader */}
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
