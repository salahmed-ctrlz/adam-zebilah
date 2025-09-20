import React from 'react'
import { motion } from 'framer-motion'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'

/**
 * Infinite logo carousel with blurred entry/exit effects
 */
export function Logos() {
  const { ref, controls } = useInViewStagger()

  const logos = [
    { name: "Artisan", file: "artisan.svg" },
    { name: "Astral", file: "astral.svg" },
    { name: "Band", file: "band.svg" },
    { name: "Disttraqt", file: "disttraqt.svg" },
    { name: "Dune", file: "dune.svg" },
    { name: "Ecolux", file: "ecolux.svg" },
    { name: "Greenroots", file: "greenroots.svg" },
    { name: "Innovatelab", file: "innovatelab.svg" },
    { name: "Oasis", file: "oasis.svg" },
    { name: "Piccolo", file: "piccolo.svg" },
    { name: "Techflow", file: "techflow.svg" },
    { name: "Urbanfit", file: "urbanfit.svg" }
  ]

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="relative"
        >

          {/* Logo Carousel */}
          <motion.div 
            variants={staggerItemVariants}
            className="relative h-32 flex items-center"
          >
            <div className="carousel-container">
              <div className="logos-track">
                {[...logos, ...logos].map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="logo-item"
                  >
                    <img 
                      src={`/placeholders/logos/${logo.file}`}
                      alt={logo.name}
                      className="h-8 w-auto opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              <div className="carousel-mask"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
