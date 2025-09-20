import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { Icon } from '../UI/Icon'

/**
 * Project card component with hover color reveal
 * @param {Object} project - Project data
 * @param {boolean} emphasis - Whether this card should span two rows
 */
export function ProjectCard({ project, emphasis = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleClick = (e) => {
    e.preventDefault()
    if (project.href) {
      window.open(project.href, '_blank', 'noopener,noreferrer')
    }
  }

  const motionProps = prefersReducedMotion ? {} : {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl glass-card cursor-pointer ${
        emphasis ? 'md:row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      {...motionProps}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Gray Image */}
        <motion.img
          src={project.imageGray}
          alt={project.title}
          className="w-full h-full object-cover absolute inset-0"
          initial={false}
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Color Image */}
        <motion.img
          src={project.imageColor}
          alt={project.title}
          className="w-full h-full object-cover absolute inset-0"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
          >
            <h3 className="text-white font-semibold text-lg mb-2">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
          </motion.div>
          
          {/* CTA Button */}
          <motion.button
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 bg-black/20 hover:bg-black/40 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20"
            initial={{ y: 10, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 10, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
            onClick={(e) => {
              e.stopPropagation()
              handleClick(e)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">View Casestudy</span>
          </motion.button>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl shadow-glow-lg opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
