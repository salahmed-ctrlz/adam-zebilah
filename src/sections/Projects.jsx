import React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { GlassButton } from '../components/UI/GlassButton'
import { Button } from '../components/UI/Button'

/**
 * Projects section with portrait in center and 5 project cards around it
 */
export function Projects() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()

  const scrollToRecentWork = () => {
    const recentWorkSection = document.getElementById('recent-work')
    if (recentWorkSection) {
      recentWorkSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Mouse-following for the portrait card
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 400, damping: 25 })
  const y = useSpring(mouseY, { stiffness: 400, damping: 25 })

  const handlePortraitMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
  }

  const handlePortraitMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(rect.width / 2)
    mouseY.set(rect.height / 2)
  }

  const handlePortraitMouseLeave = () => {
    // Reset to center when mouse leaves
    const rect = document.querySelector('#projects .col-start-3')?.getBoundingClientRect()
    if (rect) {
      mouseX.set(rect.width / 2)
      mouseY.set(rect.height / 2)
    }
  }

  const projectImages = [
    { src: '/placeholders/projects/project-a.png', alt: 'Project A' },
    { src: '/placeholders/projects/project-b.png', alt: 'Project B' },
    { src: '/placeholders/projects/project-c.png', alt: 'Project C' },
    { src: '/placeholders/projects/project-d.png', alt: 'Project D' },
    { src: '/placeholders/projects/project-e.png', alt: 'Project E' }
  ]

  return (
    <section id="projects" data-section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
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
              {t('projects.title')}
            </h2>
          </motion.div>

          {/* Projects Grid - 12x10 layout with portrait spanning multiple rows */}
        <motion.div
          variants={staggerItemVariants}
          className="relative grid grid-cols-1 md:grid-cols-12 grid-rows-auto md:grid-rows-10 gap-4 md:gap-1 w-full mx-auto md:h-[1200px]"
        >
            {/* Project 1 - Left Top (div13) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-4 md:col-start-1 md:row-start-2 order-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={projectImages[0].src}
                alt={projectImages[0].alt}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="pointer-events-auto">
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Portrait 1 - Center Top (div10) */}
            <motion.div
              className="relative aspect-[3/4] md:aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-5 md:col-start-5 order-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToAbout}
              onMouseMove={handlePortraitMouseMove}
              onMouseEnter={handlePortraitMouseEnter}
              onMouseLeave={handlePortraitMouseLeave}
            >
              <img
                src="/placeholders/portrait.jpg"
                alt="Portrait"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Cursor-following About Me button */}
              <motion.div
                style={{ 
                  x: x,
                  y: y,
                  left: 0,
                  top: 0
                }}
                className="absolute opacity-70 transition-opacity duration-200 pointer-events-none"
              >
                <div className="pointer-events-auto -translate-x-1/2 -translate-y-1/2">
                  <button
                    className="px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: 'rgba(255, 255, 255, 0)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(16.5px)',
                      WebkitBackdropFilter: 'blur(16.5px)',
                      border: '1px solid rgba(255, 255, 255, 0.87)'
                    }}
                    onClick={scrollToAbout}
                  >
                    {t('projects.aboutMe')}
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Project 2 - Right Top (div15) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-4 md:col-start-9 md:row-start-2 order-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={projectImages[1].src}
                alt={projectImages[1].alt}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="pointer-events-auto">
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Project 3 - Left Bottom (div14) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-5 md:col-start-1 md:row-start-6 order-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={projectImages[2].src}
                alt={projectImages[2].alt}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="pointer-events-auto">
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Project 4 - Center Bottom (div12) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-5 md:col-start-5 md:row-start-6 order-5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={projectImages[3].src}
                alt={projectImages[3].alt}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="pointer-events-auto">
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Project 5 - Right Bottom (div16) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-5 md:row-span-5 md:col-start-9 md:row-start-6 order-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={projectImages[4].src}
                alt={projectImages[4].alt}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="pointer-events-auto">
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Actions */}
          <motion.div 
            variants={staggerItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={scrollToRecentWork}
              className="btn-shine"
            >
              {t('projects.allProjects')}
            </button>
            <Button 
              variant="clean"
              onClick={scrollToRecentWork}
            >
              {t('common.bookCall')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
