import React from 'react'

/**
 * Custom textarea component with floating label
 */
export function Textarea({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false,
  rows = 4,
  className = '',
  ...props 
}) {
  return (
    <div className={`container ${className}`}>
      <textarea 
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="input resize-none"
        {...props}
      />
      <label className="label">{label}</label>
    </div>
  )
}
