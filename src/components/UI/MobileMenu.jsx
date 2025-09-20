import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../../utils/i18n.jsx'
import { LangToggle } from './LangToggle'
import { Icon } from './Icon'

/**
 * Full-screen glass mobile menu
 */
export function MobileMenu() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#reviews' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { name: 'Behance', href: '#', icon: 'behance' },
    { name: 'WhatsApp', href: '#', icon: 'whatsapp' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-white hover:text-white/80 transition-colors duration-200"
        aria-label={t('common.openMenu')}
      >
        <Icon name="menu" size={24} />
      </button>

      {/* Full-screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-black/80 backdrop-blur-xl border-l border-white/10"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-xl font-semibold text-white">{t('common.menu')}</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                    aria-label={t('common.closeMenu')}
                  >
                    <Icon name="close" size={24} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-6">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left text-2xl font-medium text-white hover:text-white/80 transition-colors duration-200"
                      >
                        {item.name}
                      </motion.button>
                    ))}
                  </nav>
                </div>

                {/* Bottom Section */}
                <div className="p-6 border-t border-white/10 space-y-6">
                  {/* Language Toggle */}
                  <div className="flex items-center justify-center">
                    <LangToggle />
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-6">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                        aria-label={social.name}
                      >
                        <Icon name={social.icon} size={20} />
                      </motion.a>
                    ))}
                  </div>

                  {/* Book a Call Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      scrollToSection('#contact')
                    }}
                    className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors duration-200"
                  >
                    Book a Call
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
