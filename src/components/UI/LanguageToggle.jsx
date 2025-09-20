import React, { useState, useEffect } from 'react'
import { useI18n } from '../../utils/i18n.jsx'

/**
 * Language toggle with flag colors
 */
export function LanguageToggle() {
  const { language, setLanguage } = useI18n()
  const [isEN, setIsEN] = useState(language === 'en')

  useEffect(() => {
    setIsEN(language === 'en')
  }, [language])

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    setIsEN(newLanguage === 'en')
  }

  return (
    <div className="radio-input">
      <label>
        <input 
          type="radio" 
          id="value-en" 
          name="value-radio" 
          value="en"
          checked={isEN}
          onChange={handleLanguageChange}
        />
        <span>EN</span>
      </label>
      <label>
        <input 
          type="radio" 
          id="value-de" 
          name="value-radio" 
          value="de"
          checked={!isEN}
          onChange={handleLanguageChange}
        />
        <span>DE</span>
      </label>
      <span className="selection"></span>
    </div>
  )
}
