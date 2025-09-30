import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { ReviewCard } from '../components/Widgets/ReviewCard'
import { Icon } from '../components/UI/Icon'

/**
 * Testimonials section with a looping carousel
 */
export function Reviews() { // Renamed from Testimonials to Reviews to match App.jsx
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayInterval = 5000 // 5 seconds

  const reviews = [
    {
      id: 'maazouzAhmed',
      name: t('testimonials.reviews.maazouzAhmed.name'),
      role: t('testimonials.reviews.maazouzAhmed.role'),
      quote: t('testimonials.reviews.maazouzAhmed.quote'),
      avatar: './placeholders/avatars/avatar1.svg'
    },
    {
      id: 'studyInItaly',
      name: t('testimonials.reviews.studyInItaly.name'),
      role: t('testimonials.reviews.studyInItaly.role'),
      quote: t('testimonials.reviews.studyInItaly.quote'),
      avatar: './placeholders/avatars/avatar2.svg'
    },
    {
      id: 'lorem1',
      name: 'Alex Doe',
      role: 'Project Manager, Dev Solutions',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis.',
      avatar: './placeholders/avatars/avatar3.svg'
    },
    {
      id: 'lorem2',
      name: 'Samantha Bee',
      role: 'Lead Designer, Creative Co.',
      quote: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis.',
      avatar: './placeholders/avatars/avatar4.svg'
    }
  ]

  const nextReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  }

  const goToReview = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (prefersReducedMotion || !isAutoPlaying) return
    const timer = setInterval(nextReview, autoPlayInterval)
    return () => clearInterval(timer)
  }, [nextReview, isAutoPlaying, prefersReducedMotion, autoPlayInterval])

  const handleManualNavigation = (direction) => {
    setIsAutoPlaying(false);
    direction === 'prev' ? prevReview() : nextReview();
  }

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
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="overflow-hidden">
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
                      <ReviewCard review={review} noHover />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation and Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => handleManualNavigation('prev')}
                className="p-3 bg-charcoal border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={t('common.previousReviews')}
              >
                <Icon name="chevron" size={20} className="rotate-180" />
              </button>

              {/* Pagination Dots */}
              <div className="flex justify-center items-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none ${
                      index === currentIndex
                        ? 'bg-white w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleManualNavigation('next')}
                className="p-3 bg-charcoal border border-white/10 rounded-full text-white hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={t('common.nextReviews')}
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
