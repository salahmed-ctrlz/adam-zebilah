import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { I18nProvider, useI18n } from './utils/i18n.jsx'
import { generateMetaTags, generatePersonSchema, generateWebsiteSchema, generatePortfolioSchema } from './utils/seo'
import { projects } from './utils/data'
import { MainLayout } from './components/Layout/MainLayout'
import { Hero } from './sections/Hero'
import { LoadingScreen } from './components/UI/LoadingScreen'

// Import sections directly for now
import { Projects } from './sections/Projects'
import { Reviews } from './sections/Reviews'
import { Stats } from './sections/Stats'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { RecentWork } from './sections/RecentWork'
import { Process } from './sections/Process'
import { Services } from './sections/Services'
import { FAQ } from './sections/FAQ'
import { WavyBackground } from './components/UI/WavyBackground'
import { AnimationToggle } from './components/UI/AnimationToggle'
import ErrorBoundary from './components/ErrorBoundary'


/**
 * Main App component
 */
function AppContent() {
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    console.log('Loading completed, showing main content')
    setIsLoading(false)
  }

  useEffect(() => {
    // Fallback: ensure loading screen completes after 4 seconds maximum
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log('App fallback: forcing loading completion')
        setIsLoading(false)
      }
    }, 4000)

    // Set up SEO meta tags
    const metaTags = generateMetaTags()
    
    // Update document title
    document.title = metaTags.title
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', metaTags.description)
    }

    // Add structured data
    const structuredData = [
      generatePersonSchema(),
      generateWebsiteSchema(),
      generatePortfolioSchema(projects)
    ]

    structuredData.forEach(data => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    })

    // Add loading class removal
    document.body.classList.add('loaded')
    document.body.classList.remove('loading')

    return () => {
      // Cleanup structured data scripts
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      scripts.forEach(script => script.remove())
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white antialiased">
        {/* Loading Screen */}
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        
        
        {/* Animation Toggle (Desktop Only) */}
        <AnimationToggle />
        
        {/* Skip to content link for accessibility */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-white text-black rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {t('common.skipToContent')}
        </a>

        {/* Main Layout */}
        {!isLoading && (
          <ErrorBoundary>
            <MainLayout>
            {/* Hero Section */}
            <Hero />

            {/* Projects Section */}
            <Projects />

            {/* About Section */}
            <About />

            {/* Recent Work Section */}
            <RecentWork />

            {/* Process Section */}
            <Process />

            {/* Services Section */}
            <Services />

            {/* Reviews Section */}
            <Reviews />

            {/* Stats Section */}
            <Stats />

            {/* FAQ Section */}
            <FAQ />

            {/* Contact Section */}
            <Contact />
            
            {/* Footer */}
            <footer className="relative py-16 border-t border-white/10">
            
            <WavyBackground
              backgroundFill="#000000"
              colors={["#ffffff", "#f5f5f5", "#e5e5e5", "#d5d5d5", "#c5c5c5", "#b5b5b5", "#a5a5a5", "#959595"]}
              waveWidth={40}
              blur={15}
              speed="slow"
              waveOpacity={0.3}
              containerClassName="absolute inset-0"
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-white/60 text-sm">
                  © 2025 Adam Zebilah. All rights reserved.
                </div>
                <div className="text-white/60 text-sm">
                  <div className="relative group">
                    <a 
                      href="https://salahmed-ctrlz.github.io/salaheddine-medkour-portfolio/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 underline"
                    >
                      Dev.
                    </a>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none">
                      <div className="glass-tooltip w-max max-w-xs text-white rounded-lg px-4 py-4">
                        <p className="font-bold text-md mb-1">Hello there! 👋</p>
                        <p className="text-sm">
                          I'm <span className="underline">Salahuddin</span>!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="mailto:adam@example.com" 
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
                  >
                    adam@example.com
                  </a>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-slow-ping" />
                    {t('common.availableForWork')}
                  </div>
                </div>
              </div>
            </div>
          </footer>
            </MainLayout>
          </ErrorBoundary>
        )}
      </div>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}

export default App
