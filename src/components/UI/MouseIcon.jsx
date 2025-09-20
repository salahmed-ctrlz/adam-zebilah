import React from 'react'
import { motion } from 'framer-motion'

/**
 * Mouse icon component with animation
 */
export function MouseIcon() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-white/40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Mouse Icon */}
      <motion.div
        className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-1 h-1 bg-white/40 rounded-full mt-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}
