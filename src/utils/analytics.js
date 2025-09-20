/**
 * Analytics utility - placeholder implementation
 * Easy to swap with Plausible, Google Analytics, or other services
 */

export const trackEvent = (eventName, properties = {}) => {
  // Placeholder implementation - logs to console
  console.log('Analytics Event:', eventName, properties)
  
  // Example implementations for different services:
  
  // Plausible
  // if (window.plausible) {
  //   window.plausible(eventName, { props: properties })
  // }
  
  // Google Analytics 4
  // if (window.gtag) {
  //   window.gtag('event', eventName, properties)
  // }
  
  // Mixpanel
  // if (window.mixpanel) {
  //   window.mixpanel.track(eventName, properties)
  // }
}

export const trackPageView = (pageName) => {
  trackEvent('page_view', { page: pageName })
}

export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', { button: buttonName, location })
}

export const trackFormSubmit = (formName, success = true) => {
  trackEvent('form_submit', { form: formName, success })
}

export const trackProjectView = (projectId, projectTitle) => {
  trackEvent('project_view', { project_id: projectId, project_title: projectTitle })
}

export const trackContactMethod = (method) => {
  trackEvent('contact_method_click', { method })
}
