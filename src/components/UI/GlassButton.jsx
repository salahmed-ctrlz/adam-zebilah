import React from 'react'
import { motion } from 'framer-motion'

export function GlassButton({ children, onClick, className = '', showArrow = false, ...props }) {
  return (
    <motion.button
      className={`relative inline-flex items-center gap-2 px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(16.5px)',
        WebkitBackdropFilter: 'blur(16.5px)',
        border: '1px solid rgba(255, 255, 255, 0.87)'
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      )}
    </motion.button>
  )
}
