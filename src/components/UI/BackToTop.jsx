import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../../utils/i18n.jsx'

export function BackToTop() {
  const { t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            onClick={scrollToTop}
            className="back-to-top-button"
            aria-label={t('common.backToTop')}
          >
            <div className="text">
              <span>{t('common.backToTop').split(' ')[0]}</span>
              <span>{t('common.backToTop').split(' ')[1]}</span>
              <span>{t('common.backToTop').split(' ')[2]}</span>
            </div>
            <div className="clone">
              <span>{t('common.backToTop').split(' ')[0]}</span>
              <span>{t('common.backToTop').split(' ')[1]}</span>
              <span>{t('common.backToTop').split(' ')[2]}</span>
            </div>
            <svg
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
