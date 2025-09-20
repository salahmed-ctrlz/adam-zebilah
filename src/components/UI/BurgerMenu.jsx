import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Burger menu component with animation
 */
export function BurgerMenu({ isOpen, onToggle }) {
  return (
    <label className="burger" htmlFor="burger">
      <input 
        type="checkbox" 
        id="burger" 
        checked={isOpen}
        onChange={onToggle}
      />
      <span></span>
      <span></span>
      <span></span>
    </label>
  )
}
