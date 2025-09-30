import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { ReviewCard } from '../components/Widgets/ReviewCard'
import { Icon } from '../components/UI/Icon'
import { reviews as reviewData } from '../utils/data.js'

/**
 * Testimonials section with a looping carousel
 */
export function Testimonials() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = reviewData.map((review, index) => ({
    ...review, // The original data from data.js is not used for text
    name: t(`testimonials.reviews.${index === 0 ? 'maazouzAhmed' : 'studyInItaly'}.name`),
    role: t(`testimonials.reviews.${index === 0 ? 'maazouzAhmed' : 'studyInItaly'}.role`),
    quote: t(`testimonials.reviews.${index === 0 ? 'maazouzAhmed' : 'studyInItaly'}.quote`),
  }))

  const nextReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="testimonials" data-section className="py-24 bg-black scroll-mt-[var(--nav-h,88px)]">
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
              {t('testimonials.title')}
            </h2>
            <p className="text-body text-white/80">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            variants={staggerItemVariants}
            className="relative overflow-hidden"
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-2 flex justify-center"
                >
                  <div className="w-full max-w-2xl">
                    <ReviewCard review={review} />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Navigation */}
            <div className="absolute inset-0 flex items-center justify-between px-0 md:-px-8">
              <button
                onClick={prevReview}
                className="p-3 bg-charcoal/50 border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={t('common.previousReviews')}
              >
                <Icon name="chevron" size={20} className="rotate-180" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 bg-charcoal/50 border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={t('common.nextReviews')}
              >
                <Icon name="chevron" size={20} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}