import React from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { Icon } from '../UI/Icon'

/**
 * Review card component for testimonials
 * @param {Object} review - Review data
 */
export function ReviewCard({ review }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const motionProps = prefersReducedMotion ? {} : {
    whileHover: { 
      scale: 1.02,
      boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.15), 0 0 30px rgba(255, 255, 255, 0.1)'
    },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'starFilled' : 'star'}
        size={16}
        className={index < rating ? 'text-yellow-400' : 'text-gray-600'}
      />
    ))
  }

  return (
    <motion.div
      className="bg-charcoal rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
      {...motionProps}
    >
      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white font-semibold text-lg">5.0</span>
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-white/90 text-base leading-relaxed mb-6">
        "{review.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          <img
            src={review.avatar}
            alt={`${review.name} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-semibold text-base">
            {review.name}
          </h4>
          <p className="text-white/60 text-sm">
            {review.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
