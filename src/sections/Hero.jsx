import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { MouseIcon } from '../components/UI/MouseIcon'

/**
 * Hero section with animated background and content
 */
export function Hero() {
  const { t } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  const scrollToRecentWork = () => {
    const recentWorkSection = document.getElementById('recent-work')
    if (recentWorkSection) {
      recentWorkSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="home" data-section className="relative min-h-screen overflow-hidden bg-black pt-[88px] scroll-mt-[var(--nav-h,88px)]">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-12 pb-32 md:pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4 md:space-y-6 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto"
        >
          {/* Status Pill */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-white/80 text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-slow-ping" />
              {t('hero.status')}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={headingVariants}
            className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl [@media(max-height:700px)]:text-5xl font-bold text-white leading-tight font-heading whitespace-pre-line"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8"
          >
            <button
              onClick={scrollToContact}
              className="realism-button"
            >
              <div className="realism-blob1"></div>
              <div className="realism-inner">
                {t('hero.getStarted')}
              </div>
            </button>
            <button
              onClick={scrollToRecentWork}
              className="btn-shine"
            >
              {t('hero.seeProjects')}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Down Text and Mouse Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 pb-8 flex items-center justify-center text-sm font-medium w-full max-w-4xl mx-auto scroll-text-optimized text-balance"
          style={{
            color: 'rgba(255, 255, 255, 0.3)',
            mixBlendMode: 'difference'
          }}
        >
          <span>{t('hero.scrollDown')}</span>
          <div className="scroll-line mx-4"></div>
          <div style={{ color: 'rgba(255, 255, 255, 0.06)', mixBlendMode: 'difference', transform: 'scale(0.7)' }}>
            <MouseIcon />
          </div>
          <div className="scroll-line mx-4"></div>
          <span>{t('hero.toSeeProjects')}</span>
        </motion.div>
      </div>

    </section>
  )
}
