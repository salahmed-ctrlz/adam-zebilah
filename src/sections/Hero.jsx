import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { MouseIcon } from '../components/UI/MouseIcon'
import { LiquidChrome } from '../components/UI/LiquidChrome'

/**
 * Hero section with animated background and content
 */
export function Hero() {
  const { t } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()

  // Logo data for the carousel
  const logos = [
    { name: 'Creative Minds', src: '/placeholders/logos/CreativeMindsWhite.svg', alt: 'Creative Minds' },
    { name: 'Digital Bridge', src: '/placeholders/logos/DigitalBridgeWhite.svg', alt: 'Digital Bridge' },
    { name: 'Global Vision', src: '/placeholders/logos/GlobalVisionWhite.svg', alt: 'Global Vision' },
    { name: 'Tariq Logo', src: '/placeholders/logos/TariqLogoWhite.svg', alt: 'Tariq Logo' },
    { name: 'Urban Design', src: '/placeholders/logos/UrbanDesignWhite.svg', alt: 'Urban Design' },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
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

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section id="home" data-section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* LiquidChrome Background */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className="liquid-chrome-container"
        style={{ top: '88px' }}
      >
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.17}
          amplitude={0.18}
          interactive={true}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6 sm:space-y-8 lg:space-y-10 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex-1 flex flex-col justify-center -mt-8"
        >
          {/* Status Pill */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-white/80 text-sm font-medium mt-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-slow-ping" />
              {t('hero.status')}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={headingVariants}
            className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight font-heading whitespace-pre-line"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed"
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
          className="flex items-center justify-center text-sm font-medium mb-2.5 w-full max-w-4xl mx-auto scroll-text-optimized -mt-2"
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

        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full mt-2.5"
        >
          <div
            className="wrapper logo-carousel-optimized"
            style={{
              width: '90%',
              maxWidth: '1536px',
              maxHeight: '100px',
              marginInline: 'auto',
              position: 'relative',
              height: '100px',
              overflow: 'hidden',
              marginTop: '0px',
              marginBottom: '0px',
              maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))'
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="item logo-item-optimized"
                style={{
                  width: '200px',
                  height: '120px',
                  position: 'absolute',
                  left: `max(calc(200px * ${logos.length}), 100%)`,
                  animationName: 'scrollLeft',
                  animationDuration: '30s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `calc(30s / ${logos.length} * (${logos.length} - ${index + 1}) * -1)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px'
                }}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-16 w-auto opacity-80 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                {/* Fallback text for when images don't load */}
                <span 
                  className="text-white/80 text-lg font-semibold hidden px-4 py-2 bg-white/10 rounded-lg"
                  style={{ display: 'none' }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}
