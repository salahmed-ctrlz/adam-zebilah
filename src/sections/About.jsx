import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { Button } from '../components/UI/Button'

/**
 * About section with bio and skills
 */
export function About() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const prefersReducedMotion = usePrefersReducedMotion()

  const skills = [
    t('about.skills.productDesign'),
    t('about.skills.brandIdentity'),
    t('about.skills.uxDesign'),
    t('about.skills.branding'),
    t('about.skills.packagingDesign'),
    t('about.skills.figma'),
    t('about.skills.photoshop')
  ]

  const experience = [
    {
      role: t('about.experience.freelance'),
      company: t('about.experience.greenLeaf'),
      period: t('about.experience.currently')
    },
    {
      role: t('about.experience.brandDesigner'),
      company: t('about.experience.urbanFit'),
      period: t('about.experience.period2023')
    },
    {
      role: t('about.experience.packageDesigner'),
      company: t('about.experience.greenK'),
      period: t('about.experience.period2020')
    }
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

  return (
    <section id="about" data-section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={staggerItemVariants} className="space-y-8">
            <div>
              <h2 className="text-heading font-bold text-white mb-6 font-heading">
                {t('about.title')}
              </h2>
              <p className="text-body text-white/80 leading-relaxed">
                {t('about.bio')}
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('about.skillsTitle')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-charcoal border border-white/10 rounded-xl text-white/80 text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('about.experience.title')}
              </h3>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div>
                      <h4 className="text-white font-medium">{exp.role}</h4>
                      <p className="text-white/60 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-white/60 text-sm font-medium">
                      {exp.period}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Button variant="sparkleClean" onClick={scrollToContact}>
                {t('about.bookCall')}
              </Button>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
                  aria-label={t('common.behance')}
                >
                  <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zM6.466 20.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                  </svg>
                </a>
                
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
                  aria-label={t('common.linkedin')}
                >
                  <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            variants={staggerItemVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/placeholders/portrait.jpg"
                alt="Adam Zebilah - Graphic Designer"
                className="w-full h-auto object-cover filter grayscale"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
