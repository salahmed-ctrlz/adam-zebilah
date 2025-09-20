import React from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { Icon } from './Icon'

/**
 * Scroll cue component with animated arrow
 */
export function ScrollCue() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const motionProps = prefersReducedMotion ? {} : {
    animate: { 
      y: [0, 8, 0],
      opacity: [0.6, 1, 0.6]
    },
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <motion.button
      onClick={scrollToProjects}
      className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
      aria-label="Scroll to projects"
      {...motionProps}
    >
      <span className="text-xs font-medium">Scroll down</span>
      <Icon name="arrow" size={16} className="rotate-90" />
      <span className="text-xs font-medium">to see projects</span>
    </motion.button>
  )
}
