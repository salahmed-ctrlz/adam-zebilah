import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { Button } from '../components/UI/Button'
import { Icon } from '../components/UI/Icon'
import { ServicesCarousel } from '../components/UI/ServicesCarousel'

/**
 * Services section with infinite carousel
 */
export function Services() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()

  const services = [
    { name: t('services.brandIdentity'), icon: "palette" },
    { name: t('services.logoDesign'), icon: "star" },
    { name: t('services.packaging'), icon: "box" },
    { name: t('services.webDesign'), icon: "monitor" },
    { name: t('services.printDesign'), icon: "printer" },
    { name: t('services.socialMedia'), icon: "share" },
    { name: t('services.uiUxDesign'), icon: "smartphone" },
    { name: t('services.illustration'), icon: "brush" },
    { name: t('services.consulting'), icon: "users" },
    { name: t('services.ecommerce'), icon: "shopping-cart" },
    { name: t('services.photography'), icon: "camera" },
    { name: t('services.animation'), icon: "play" }
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
    <section id="services" data-section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={staggerItemVariants} className="text-center">
            <h2 className="text-heading font-bold text-white mb-6 font-heading">
              {t('services.title')}
            </h2>
            <p className="text-body text-white/60 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          {/* Services Carousel - Two Lines */}
          <motion.div 
            variants={staggerItemVariants}
            className="relative"
          >
            <ServicesCarousel />
          </motion.div>

          {/* CTA */}
          <motion.div 
            variants={staggerItemVariants}
            className="text-center flex justify-center"
          >
            <Button 
              variant="clean"
              onClick={scrollToContact}
            >
              {t('services.discussProject')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
