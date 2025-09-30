import React from 'react'
import { motion } from 'framer-motion'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { useI18n } from '../utils/i18n.jsx'
import CountUp from '../components/UI/CountUp'


/**
 * Stats section with animated counters
 */
export function Stats() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()

  const statsData = [
    {
      value: 96,
      suffix: '%',
      label: t('stats.satisfaction')
    },
    {
      value: 100,
      suffix: '+',
      label: t('stats.projects')
    },
    {
      value: 5,
      suffix: '+',
      label: t('stats.years')
    }
  ]

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItemVariants}
              className="text-center"
            >
              <div className="bg-charcoal rounded-2xl p-8 border border-white/10">
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CountUp
                    from={0}
                    to={stat.value}
                    duration={2}
                    delay={index * 0.2}
                    className="count-up-text"
                  />
                  <span className="text-white">{stat.suffix}</span>
                </motion.div>
                <p className="text-white/60 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Behance Button */}
        <motion.div 
          variants={staggerItemVariants}
          className="text-center mt-12"
        >
          <button 
            className="btn-shine"
            onClick={() => window.open('https://www.behance.net/adamzebilah', '_blank', 'noopener,noreferrer')}
          >
{t('stats.behanceButton')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
