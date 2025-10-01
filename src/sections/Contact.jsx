import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../utils/i18n.jsx'
import { useInViewStagger, staggerVariants, staggerItemVariants } from '../utils/useInViewStagger'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { trackFormSubmit, trackContactMethod } from '../utils/analytics'
import { Button } from '../components/UI/Button'
import { AnimatedSendButton } from '../components/UI/AnimatedSendButton'
import { Icon } from '../components/UI/Icon'
import { Input } from '../components/UI/Input'
import { Textarea } from '../components/UI/Textarea'
import { WavyBackground } from '../components/UI/WavyBackground'

/**
 * Contact section with form and contact methods
 */
export function Contact() {
  const { t } = useI18n()
  const { ref, controls } = useInViewStagger()
  const prefersReducedMotion = usePrefersReducedMotion()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [emailCopied, setEmailCopied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      trackFormSubmit('contact', true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        privacy: false
      })
    } catch (error) {
      setSubmitStatus('error')
      trackFormSubmit('contact', false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyEmailToClipboard = () => {
    const email = 'adamzebilah@gmail.com';
    
    // Modern browsers with secure context
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }).catch(() => {
        // Fallback for browsers that fail for other reasons
        window.open(`mailto:${email}`, '_blank', 'noopener,noreferrer');
      });
    } else {
      // Fallback for older browsers or insecure contexts
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleContactMethod = (method) => {
    trackContactMethod(method)
    
    switch (method) {
      case 'whatsapp':
        window.open('https://wa.me/213670758620', '_blank', 'noopener,noreferrer')
        break
      case 'behance':
        window.open('https://www.behance.net/adamzebilah', '_blank', 'noopener,noreferrer')
        break
      case 'email':
        copyEmailToClipboard();
        break
    }
  }

  return (
    <section id="contact" data-section className="relative py-24 overflow-hidden">
      
      <WavyBackground
        backgroundFill="#000000"
        colors={["#ffffff", "#f5f5f5", "#e5e5e5", "#d5d5d5", "#c5c5c5", "#b5b5b5", "#a5a5a5", "#959595"]}
        waveWidth={50}
        blur={18}
        speed="slow"
        waveOpacity={0.35}
        containerClassName="absolute inset-0"
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={staggerItemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-heading font-bold text-white mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-body text-white/80">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <motion.div variants={staggerItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-8">
                {t('contact.sendMessage')}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    label={t('contact.form.name')}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label={t('contact.form.email')}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input
                  label={t('contact.form.subject')}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />

                <Textarea
                  label={t('contact.form.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                />

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-white bg-charcoal border-white/20 rounded focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black"
                  />
                  <label htmlFor="privacy" className="text-sm text-white/70 leading-relaxed">
                    {t('contact.privacy')}
                  </label>
                </div>

                  <AnimatedSendButton
                    type="submit"
                    disabled={isSubmitting || !formData.privacy}
                    className="w-full"
                  >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  </AnimatedSendButton>

                {/* Status Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-sm font-medium ${
                      submitStatus === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {submitStatus === 'success' 
                      ? t('contact.form.success')
                      : t('contact.form.error')
                    }
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={staggerItemVariants} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-8">
                  {t('contact.title')}
                </h3>
                <div className="space-y-6">
                  <motion.button
                    onClick={() => handleContactMethod('whatsapp')}
                    className="w-full flex items-center gap-4 p-6 contact-card hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    <Icon name="whatsapp" size={24} />
                    <div className="flex-1 text-left">
                      <span className="font-medium text-white">{t('contact.buttons.whatsapp')}</span>
                      <p className="text-sm text-white/60">{t('contact.buttons.whatsappDesc')}</p>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleContactMethod('behance')}
                    className="w-full flex items-center gap-4 p-6 contact-card hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    <Icon name="behance" size={24} />
                    <div className="flex-1 text-left">
                      <span className="font-medium text-white">{t('contact.buttons.behance')}</span>
                      <p className="text-sm text-white/60">{t('contact.buttons.behanceDesc')}</p>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleContactMethod('email')}
                    className="w-full flex items-center gap-4 p-6 contact-card hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300 relative"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    <Icon name="email" size={24} />
                    <div className="flex-1 text-left">
                      <span className="font-medium text-white">{t('contact.buttons.email')}</span>
                      <p className="text-sm text-white/60">adamzebilah@gmail.com</p>
                    </div>
                    {emailCopied && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {t('contact.buttons.emailCopied')}
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-6 contact-card">
                <h4 className="text-white font-semibold mb-3">{t('contact.quickResponse.title')}</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {t('contact.quickResponse.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
