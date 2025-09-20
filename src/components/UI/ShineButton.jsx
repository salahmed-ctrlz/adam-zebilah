import React from 'react'

/**
 * Button with shine effect
 */
export function ShineButton({ children, onClick, className = '', ...props }) {
  return (
    <button
      className={`btn-shine ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
