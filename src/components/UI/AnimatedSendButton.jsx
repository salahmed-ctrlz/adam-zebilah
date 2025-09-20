import React from 'react'

export function AnimatedSendButton({ children, onClick, className = '', disabled = false, ...props }) {
  return (
    <button
      className={`w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </div>
    </button>
  )
}
