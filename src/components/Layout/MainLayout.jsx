import React, { useEffect } from 'react'
import { Navbar } from '../UI/Navbar'
import { BackToTop } from '../UI/BackToTop'
import { useI18n } from '../../utils/i18n'

/**
 * Main layout component that wraps all pages
 * Provides consistent structure with navbar and back-to-top button
 */
export function MainLayout({ children }) {
  const { language } = useI18n()

  useEffect(() => {
    if (document.documentElement.lang !== language) {
      document.documentElement.lang = language
    }
  }, [language])

  return (
    <div className="min-h-screen bg-black">
      <style>{`
        :root {
          --nav-h: 88px;
        }
      `}</style>
      <Navbar />
      <main className="relative overflow-x-clip">
        {children}
      </main>
      <BackToTop />
    </div>
  )
}
