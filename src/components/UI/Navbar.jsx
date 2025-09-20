import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../../utils/i18n.jsx'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { useHashNavigation } from '../../hooks/useHashNavigation'
import { Button } from './Button'
import { LanguageToggle } from './LanguageToggle'
import { BurgerMenu } from './BurgerMenu'
import { FullScreenMenu } from './FullScreenMenu'
import { Icon } from './Icon'

/**
 * Navbar component with scroll-based shrinking and active section detection
 */
export function Navbar() {
  const { t } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { currentHash, navigateToSection, navigateToTop } = useHashNavigation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { scrollY } = useScroll()
  const navbarHeight = useTransform(scrollY, [0, 100], [88, 72])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.1, 0.8])
  const backdropBlur = useTransform(scrollY, [0, 100], [4, 10])

  const navItems = [
    { id: 'home', label: '', icon: true },
    { id: 'projects', label: t('nav.projects') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') }
  ]

  // Use currentHash as activeSection
  const activeSection = currentHash || 'home'

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      navigateToTop()
    } else {
      navigateToSection(sectionId, { offset: 88 })
    }
    setIsMobileMenuOpen(false)
  }

  const motionProps = prefersReducedMotion ? {} : {
    style: {
      height: navbarHeight,
      backgroundOpacity: backgroundOpacity,
      backdropFilter: `blur(${backdropBlur}px)`
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{
        background: `rgba(0, 0, 0, ${backgroundOpacity})`,
        backdropFilter: `blur(${backdropBlur}px)`
      }}
      {...motionProps}
    >
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-2">
        <div className="grid grid-cols-12 items-center h-full gap-4">
          {/* Logo - Left edge, takes 3 columns on desktop, 5 on mobile */}
          <motion.button
            onClick={navigateToTop}
            className="col-span-5 md:col-span-3 flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 focus:outline-none rounded-lg justify-start"
            style={prefersReducedMotion ? {} : { scale: logoScale }}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">AZ</span>
            </div>
            <span className="text-white font-semibold text-base">Adam Zebilah</span>
          </motion.button>

          {/* Desktop Navigation - Center, takes 6 columns */}
          <div className="hidden lg:flex col-span-6 items-center justify-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none rounded-lg ${item.icon ? 'min-w-[40px]' : 'min-w-[65px]'} text-center flex items-center justify-center gap-1 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.icon && (
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                )}
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                    layoutId="activeSection"
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side actions - Right edge, takes 7 columns on mobile, 3 on desktop */}
          <div className="col-span-7 lg:col-span-3 flex items-center justify-end gap-4">
            <div className="hidden md:block flex-shrink-0">
              <Button variant="ghost" size="sm" className="text-xs px-3 py-2 whitespace-nowrap">
                {t('common.bookCall')}
              </Button>
            </div>
            <div className="flex-shrink-0">
              <LanguageToggle />
            </div>
            
            {/* Mobile menu button - only visible on mobile */}
            <div className="md:hidden flex-shrink-0">
              <BurgerMenu 
                isOpen={isMobileMenuOpen} 
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
          </div>
        </div>

      </div>
      
      {/* Full Screen Mobile Menu */}
      <FullScreenMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </motion.nav>
  )
}


