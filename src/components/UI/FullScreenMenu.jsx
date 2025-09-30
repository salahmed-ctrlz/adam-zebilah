import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../../utils/i18n.jsx'
import { useHashNavigation } from '../../hooks/useHashNavigation'
import { LanguageToggle } from './LanguageToggle.jsx'



export function FullScreenMenu({ isOpen, onClose }) {
  const { t } = useI18n()
  const { navigateToSection, navigateToTop } = useHashNavigation()
  const firstFocusableRef = useRef(null)



  const menuItems = [
    { name: '', href: '#home', icon: true },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' }
  ]



  const socialLinks = [
    {
      name: 'Behance',
      url: 'https://behance.net',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zM6.466 20.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/your-number',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.051 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
        </svg>
      )
    },
    {
      name: 'Mail',
      url: 'mailto:adam@example.com',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5L4 6h16zm0 12H4V8l8 5 8-5v10z"/>
        </svg>
      )
    }
  ]



  const scrollToSection = (href) => {
    const sectionId = href.replace('#', '')
    
    if (sectionId === 'home') {
      navigateToTop()
    } else {
      navigateToSection(sectionId, { offset: 88 })
    }
    
    onClose()
  }



  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])



  useEffect(() => {
    if (!isOpen) return
    
    // Hide back to top button when menu is open
    const backToTopBtn = document.querySelector('[data-back-to-top]')
    if (backToTopBtn) {
      backToTopBtn.style.display = 'none'
    }
    
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    firstFocusableRef.current?.focus?.()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      
      // Show back to top button when menu is closed
      if (backToTopBtn) {
        backToTopBtn.style.display = 'block'
      }
    }
  }, [isOpen, onKeyDown])



  const content = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          id="mobile-menu"
          initial={{ opacity: 0, visibility: 'hidden' }}
          animate={{ opacity: 1, visibility: 'visible' }}
          exit={{ opacity: 0, visibility: 'hidden' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999999] bg-black/32 backdrop-blur-xl"
        >
          {/* Close button (Animated Burger to X) */}
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label={t('common.closeMenu')}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <label className="burger" htmlFor="burger-close">
              <input 
                type="checkbox" 
                id="burger-close" 
                checked={true}
                readOnly
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </button>



          {/* Main container */}
          <motion.div 
            className="h-screen w-full flex flex-col px-6 py-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Centered content */}
            <div className="flex-grow flex items-center justify-center min-h-0">
              <motion.div
                className="text-center w-full max-w-lg"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.28, delay: 0.05 }}
              >
              {/* Title */}
              <motion.h1
                className="text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.1 }}
              >
                Adam Zebilah
              </motion.h1>



              {/* Availability pill */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, delay: 0.15 }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-green-400 text-sm font-medium">Available for Work</span>
              </motion.div>



              {/* Nav items */}
              <motion.div
                className="space-y-4 mb-8"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.06, staggerDirection: -1 } }
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 16 } }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-xl font-semibold text-white hover:text-gray-300 transition-colors py-2 flex items-center justify-center gap-2"
                    >
                      {item.icon && (
                        <svg 
                          className="w-5 h-5" 
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
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </motion.div>



              {/* Language toggle */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.3 }}
              >
                <LanguageToggle />
              </motion.div>

              {/* Socials */}
              <motion.div
                className="flex justify-center gap-6 mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.35 }}
              >
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.4 }}
              >
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="w-full px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all"
                >
                  {t('common.bookCall') || 'Book a Free Call'}
                </button>
              </motion.div>
            </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null
}