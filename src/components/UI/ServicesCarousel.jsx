import React, { useEffect, useRef, useMemo, useCallback } from 'react'

/**
 * High-performance Services carousel with optimized animations
 * Reduced complexity and improved rendering performance
 */
export function ServicesCarousel({ services }) {
  const topRowRef = useRef(null)
  const bottomRowRef = useRef(null)

  // Optimized cloning with performance improvements
  const cloneRow = useCallback((ref) => {
    if (ref.current) {
      const ul = ref.current
      const clone = ul.cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      clone.style.willChange = 'transform'
      clone.style.transform = 'translateZ(0)'
      clone.style.backfaceVisibility = 'hidden'
      ul.parentNode.appendChild(clone)
    }
  }, [])

  useEffect(() => {
    cloneRow(topRowRef)
    cloneRow(bottomRowRef)
  }, [cloneRow, services])

  return (
    <div className="w-full space-y-4">
      {/* Top Row - Scrolling Left */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
        <ul 
          ref={topRowRef}
          className="services-carousel-list flex items-center justify-center md:justify-start [&_li]:mx-3 [&_li]:flex-shrink-0"
          style={{
            width: 'max-content',
            animation: 'infinite-scroll 25s linear infinite',
            minHeight: '50px',
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {services.map((service, index) => (
            <li key={index} className="logo-item-optimized">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 backdrop-blur-sm filter grayscale">
                <span className="text-base">{service.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{service.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Row - Scrolling Right */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
        <ul 
          ref={bottomRowRef}
          className="services-carousel-list flex items-center justify-center md:justify-start [&_li]:mx-3 [&_li]:flex-shrink-0"
          style={{
            width: 'max-content',
            animation: 'infinite-scroll-reverse 25s linear infinite',
            minHeight: '50px',
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {services.map((service, index) => (
            <li key={index} className="logo-item-optimized">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 backdrop-blur-sm filter grayscale">
                <span className="text-base">{service.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{service.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
