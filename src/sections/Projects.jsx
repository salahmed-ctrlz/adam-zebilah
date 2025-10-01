import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { GlassButton } from '../components/UI/GlassButton'
import { Button } from '../components/UI/Button'

export const projectsData = [
  { 
    id: 'creact',
    title: 'Creact Dxb Production',
    subtitleKey: 'projectSubtitles.socialMedia',
    src: './placeholders/projects/project-a.webp', 
    href: 'https://www.behance.net/gallery/215744503/Creact-Dxb-Production-Company-Social-Media'
  },
  { 
    id: 'andaloussia-school', 
    title: 'Andaloussia School',
    subtitleKey: 'projectSubtitles.socialMedia',
    src: './placeholders/projects/project-h.webp', 
    href: 'https://www.behance.net/gallery/235668739/Andaloussia-School-Social-Media' 
  },
  { 
    id: 'astral', 
    title: 'Astral Advertising DXB',
    subtitleKey: 'projectSubtitles.brandingDesign',
    src: './placeholders/projects/project-c.webp', 
    href: 'https://www.behance.net/gallery/191986619/Astral-Advertising-DXB-Branding-Design' 
  },
  { 
    id: 'fiat', 
    title: 'Fiat',
    subtitleKey: 'projectSubtitles.socialMedia',
    src: './placeholders/projects/project-f.webp', 
    href: 'https://www.behance.net/gallery/214086825/Fiat-Social-Media' 
  },
  { 
    id: 'rfitnex', 
    title: 'Rfitnex',
    subtitleKey: 'projectSubtitles.brandIdentity',
    src: './placeholders/projects/project-e.webp', 
    href: 'https://www.behance.net/adamzebilah' 
  },
    { 
    id: 'disttraqt', 
    title: 'DISTTRAQT CLOTHING',
    subtitleKey: 'projectSubtitles.visualIdentity',
    src: './placeholders/projects/project-d.webp', 
    href: 'https://www.behance.net/gallery/185731389/DISTTRAQT-CLOTHING-Visual-Brand-Identity' 
  },
  { 
    id: 'travel-agency', 
    title: 'Travel Agency',
    subtitleKey: 'projectSubtitles.socialMedia',
    src: './placeholders/projects/project-g.webp', 
    href: 'https://www.behance.net/gallery/214760947/Social-Media-posts-for-travel-agency?share=1' 
  },
    { 
    id: 'piccolo',
    title: 'Piccolo Coffee & ColdBrew',
    subtitleKey: 'projectSubtitles.brandIdentity',
    src: './placeholders/projects/project-b.webp', 
    href: 'https://www.behance.net/gallery/235022549/Piccolo-Coffee-ColdBrew-Brand-Visual-Identity'
  }
]



/**
 * Projects section with portrait in center and 5 project cards around it
 */
export function Projects() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024) // lg breakpoint
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToContact = () => {
    window.open('https://wa.me/213670758620', '_blank', 'noopener,noreferrer')
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

  const portraitData = {
    src: './placeholders/portrait.webp',
    alt: 'Portrait Photography'
  }
  return (
    <section id="projects" data-section className="py-12 bg-black scroll-mt-[var(--nav-h,88px)]">
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
              onClick={() => window.open(projectsData[0].href, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={projectsData[0].src}
                alt={projectsData[0].title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div 
                  className="pointer-events-auto"
                >
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
              onMouseMove={!isMobile ? handlePortraitMouseMove : undefined}
              onMouseEnter={!isMobile ? handlePortraitMouseEnter : undefined}
              onMouseLeave={!isMobile ? handlePortraitMouseLeave : undefined}
            >
              <img
                src={portraitData.src}
                alt={portraitData.alt}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 will-change-[filter]"
              />

              {/* Cursor-following About Me button */}
              <AnimatePresence>
                {!isMobile && (
                  <motion.div
                    style={{
                      x: x,
                      y: y,
                      left: 0,
                      top: 0
                    }}
                    className="absolute opacity-70 transition-opacity duration-200 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
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
                )}
              </AnimatePresence>
            </motion.div>

            {/* Project 2 - Right Top (div15) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-4 md:col-start-9 md:row-start-2 order-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(projectsData[1].href, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={projectsData[1].src}
                alt={projectsData[1].title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div 
                  className="pointer-events-auto"
                >
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Project 3 - Left Bottom (div14) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-5 md:col-start-1 md:row-start-6 order-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(projectsData[2].href, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={projectsData[2].src}
                alt={projectsData[2].title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div 
                  className="pointer-events-auto"
                >
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Project 4 - Center Bottom (div12) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-4 md:row-span-5 md:col-start-5 md:row-start-6 order-5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(projectsData[3].href, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={projectsData[3].src}
                alt={projectsData[3].title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div 
                  className="pointer-events-auto"
                >
                  <GlassButton showArrow>{t('projects.viewCase')}</GlassButton>
                </div>
              </div>
            </motion.div>

            {/* Project 5 - Right Bottom (div16) */}
            <motion.div
              className="relative aspect-[4/3] md:aspect-[4/4] rounded-2xl overflow-hidden group cursor-pointer md:col-span-5 md:row-span-5 md:col-start-9 md:row-start-6 order-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(projectsData[4].href, '_blank', 'noopener,noreferrer')}
            >
              <img
                src={projectsData[4].src}
                alt={projectsData[4].title}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              {/* Always visible Case Study Button */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 opacity-100 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div 
                  className="pointer-events-auto"
                >
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
              onClick={() => window.open('https://www.behance.net/adamzebilah', '_blank', 'noopener,noreferrer')}
              className="btn-shine"
            >
              {t('projects.allProjects')}
            </button>
            <Button 
              variant="clean"
              onClick={scrollToContact}
            >
              {t('common.bookCall')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
