import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../../utils/i18n.jsx'
import { LanguageToggle } from './LanguageToggle'
import { Icon } from './Icon'

/**
 * Full-screen glass mobile menu
 */
export function MobileMenu() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' }
  ]

  const socialLinks = [
    { name: 'Behance', href: 'https://www.behance.net/adamzebilah', icon: 'behance' },
    { name: 'WhatsApp', href: 'https://wa.me/213670758620', icon: 'whatsapp' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      const offset = 88; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-white hover:text-white/80 transition-colors duration-200"
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
            className="fixed inset-0 z-[999] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="absolute right-0 top-0 h-full w-full max-w-xs bg-charcoal/80 backdrop-blur-xl border-l border-white/10"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white">{t('common.menu')}</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/70 hover:text-white transition-colors duration-200"
                    aria-label={t('common.closeMenu')}
                  >
                    <Icon name="close" size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-6">
                  <nav className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.08 }}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left text-xl font-medium text-white/90 hover:text-white transition-colors duration-200 py-2"
                      >
                        {item.name}
                      </motion.button>
                    ))}
                  </nav>

                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                      {socialLinks.map((social) => (
                        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label={social.name}>
                          <Icon name={social.icon} size={20} />
                        </a>
                      ))}
                    </div>
                    <div className="flex items-center justify-center">
                      <LanguageToggle />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
