import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../../utils/i18n.jsx'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

/**
 * Language toggle component with smooth animation
 */
export function LangToggle() {
  const { language, switchLanguage } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleToggle = () => {
    switchLanguage(language === 'en' ? 'de' : 'en')
  }

  const motionProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <button
      onClick={handleToggle}
      className="relative px-3 py-1 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
      aria-label={`Switch to ${language === 'en' ? 'German' : 'English'}`}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            className="block"
            {...motionProps}
          >
            {language.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  )
}
