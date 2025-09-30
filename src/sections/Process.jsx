import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { Button } from '../components/UI/Button'
import { Icon } from '../components/UI/Icon'

/**
 * Process section showing design workflow
 */
export function Process() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()

  const processSteps = [
    {
      id: 1,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      icon: "lightbulb"
    },
    {
      id: 2,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      icon: "list"
    },
    {
      id: 3,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      icon: "box"
    }
  ]

  const scrollToContact = () => {
    window.open('https://wa.me/213670758620', '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="process" data-section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading font-bold text-white mb-6 font-heading">
              {t('process.title')}
            </h2>
            <p className="text-body text-white/80">
              {t('process.subtitle')}
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div 
            variants={staggerItemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={staggerItemVariants}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  {step.id}
                </div>

                {/* Step Card */}
                <div className="bg-charcoal rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="mb-4">
                    <Icon name={step.icon} size={32} className="text-white mb-4" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
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
              {t('process.bookCall')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
