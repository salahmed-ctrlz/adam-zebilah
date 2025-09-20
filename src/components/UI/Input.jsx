import React from 'react'

/**
 * Custom input component with floating label
 */
export function Input({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required = false,
  className = '',
  ...props 
}) {
  return (
    <div className={`container ${className}`}>
      <input 
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
        {...props}
      />
      <label className="label">{label}</label>
    </div>
  )
}
