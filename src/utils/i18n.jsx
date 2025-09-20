import { createContext, useContext, useState, useEffect } from 'react'
import en from './i18n/en.json'
import de from './i18n/de.json'

const I18nContext = createContext()

const translations = { en, de }

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Always start in English, ignore saved preference
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
  }, [language])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const switchLanguage = (newLang) => {
    setLanguage(newLang)
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, switchLanguage }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
