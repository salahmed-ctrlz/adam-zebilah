import React from 'react'
import { Navbar } from '../UI/Navbar'
import { BackToTop } from '../UI/BackToTop'

/**
 * Main layout component that wraps all pages
 * Provides consistent structure with navbar and back-to-top button
 */
export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <style>{`
        :root {
          --nav-h: 88px;
        }
      `}</style>
      <Navbar />
      <main className="relative">
        {children}
      </main>
      <BackToTop />
    </div>
  )
}
