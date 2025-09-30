import React from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { Icon } from '../UI/Icon'

/**
 * Review card component for testimonials
 * @param {Object} review - Review data
 * @param {boolean} noHover - Disables hover effect
 */
export function ReviewCard({ review, noHover = false }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const motionProps = prefersReducedMotion || noHover
    ? {}
    : {
        whileHover: {}, // Hover effect removed
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }

  return (
    <motion.div
      className="bg-charcoal rounded-2xl p-8 border border-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[320px]"
      {...motionProps}
    >
      {/* Quote */}
      <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          <Icon name="user" size={24} className="text-white/60" />
        </div>
        <div className="space-y-1">
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
