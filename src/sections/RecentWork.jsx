import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { projectsData as projects } from './Projects'
import { Button } from '../components/UI/Button'
import { Icon } from '../components/UI/Icon'

/**
 * Recent Work section with horizontal slideshow
 */
export function RecentWork() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const recentProjects = projects

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % recentProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + recentProjects.length) % recentProjects.length)
  }

  // Touch/swipe functionality
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextProject()
    } else if (isRightSwipe) {
      prevProject()
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentProjects.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [recentProjects.length, prefersReducedMotion])

  return (
    <section id="recent-work" data-section className="py-24 bg-black scroll-mt-[var(--nav-h,88px)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={staggerItemVariants} className="text-center">
            <h2 className="text-heading font-bold text-white mb-6">
              {t('recentWork.title')}
            </h2>
            <p className="text-body text-white/60 max-w-2xl mx-auto">
              {t('recentWork.subtitle')}
            </p>
          </motion.div>

          {/* Projects Slideshow */}
          <motion.div 
            variants={staggerItemVariants}
            className="relative"
          >
            {/* Project Display */}
            <div 
              ref={containerRef}
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.div
                className="flex"
                animate={{ x: -currentIndex * 100 + '%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {recentProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-12 items-center group">
                      {/* Project Image */}
                      <div className="relative aspect-square lg:max-w-md xl:max-w-lg mx-auto w-full rounded-2xl overflow-hidden bg-charcoal">
                        <img
                          src={project.src}
                          alt={project.title}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 will-change-[filter]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      {/* Project Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl xl:text-3xl font-bold text-white">
                            {project.title}
                          </h3>
                          <p className="text-lg text-white/60 mt-2">
                            {t(project.subtitleKey)}
                          </p>
                        </div>

                        <Button 
                          variant="glass" 
                          onClick={() => window.open(project.href, '_blank', 'noopener,noreferrer')}
                          className="inline-flex items-center gap-2"
                        >
                          <span>{t('projects.viewCase')}</span>
                          <Icon name="external" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows - Below the cards */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevProject}
                className="p-3 bg-charcoal border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                aria-label={t('common.previousProject')}
              >
                <Icon name="chevron" size={20} className="rotate-180" />
              </button>

              {/* Pagination Dots */}
              <div className="flex gap-2">
                {recentProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none ${
                      index === currentIndex
                        ? 'bg-white w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextProject}
                className="p-3 bg-charcoal border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                aria-label={t('common.nextProject')}
              >
                <Icon name="chevron" size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
