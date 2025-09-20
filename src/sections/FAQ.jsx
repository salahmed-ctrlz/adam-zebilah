import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { Icon } from '../components/UI/Icon'

/**
 * FAQ section with collapsible questions
 */
export function FAQ() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer')
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer')
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer')
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer')
    },
    {
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer')
    },
    {
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer')
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {t('faq.title')}
            </h2>
            <p className="text-body text-white/60 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div 
            variants={staggerItemVariants}
            className="space-y-2"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                className="bg-charcoal/50 rounded-lg border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200 focus:outline-none"
                >
                  <h3 className="text-base font-medium text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="chevron" size={16} className="text-white/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-white/70 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
