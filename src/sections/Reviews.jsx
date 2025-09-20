import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { reviews } from '../utils/data'
import { ReviewCard } from '../components/Widgets/ReviewCard'
import { Button } from '../components/UI/Button'
import { Icon } from '../components/UI/Icon'

/**
 * Reviews section with carousel functionality
 */
export function Reviews() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const itemsPerView = 3
  const maxIndex = Math.max(0, reviews.length - itemsPerView)

  // Auto-play functionality
  useEffect(() => {
    if (prefersReducedMotion || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [maxIndex, isAutoPlaying, prefersReducedMotion])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section id="testimonials" data-section className="py-24 bg-black">
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
            <h2 className="text-heading font-bold text-white mb-6">
              {t('testimonials.title')}
            </h2>
            <p className="text-body text-white/80">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>

          {/* Reviews Carousel */}
          <motion.div 
            variants={staggerItemVariants}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-charcoal border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
              aria-label={t('common.previousReviews')}
            >
              <Icon name="chevron" size={20} className="rotate-180" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-charcoal border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
              aria-label={t('common.nextReviews')}
            >
              <Icon name="chevron" size={20} />
            </button>

            {/* Reviews Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom Actions */}
          <motion.div 
            variants={staggerItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="clean"
            >
              {t('common.bookCall')}
            </Button>
            <button className="btn-shine">
              {t('common.seeServices')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
