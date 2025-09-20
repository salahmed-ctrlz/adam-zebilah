import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Animated CTA button with auto-animation every 5 seconds
 */
export function AnimatedButton({ children, onClick, className = '', ...props }) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimated(true)
      setTimeout(() => setIsAnimated(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="relative group">
        <motion.button
          className={`relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${className}`}
          onClick={onClick}
          animate={isAnimated ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          {...props}
        >
          <motion.span
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-white to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            animate={isAnimated ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
            <div className="relative z-10 flex items-center space-x-2">
              <motion.span 
                className="transition-all duration-500 group-hover:translate-x-1"
                animate={isAnimated ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.span>
              <motion.svg
                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                animate={isAnimated ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <path
                  clipRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  fillRule="evenodd"
                />
              </motion.svg>
            </div>
          </span>
        </motion.button>
      </div>
    </div>
  )
}
