/**
 * SEO utility functions for meta tags and structured data
 */

export const generateMetaTags = (pageData = {}) => {
  const defaultData = {
    title: "Adam Zebilah - Graphic Designer",
    description: "Graphic Designer specializing in brand identity, packaging design, and visual storytelling. Based in Algeria.",
    image: "./og-image.jpg",
    url: "https://adamzebilah.com",
    type: "website"
  }

  const data = { ...defaultData, ...pageData }

  return {
    title: data.title,
    description: data.description,
    canonical: data.url,
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url,
      type: data.type,
      image: data.image,
      siteName: "Adam Zebilah Portfolio"
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      image: data.image
    }
  }
}

export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adam Zebilah",
    "jobTitle": "Graphic Designer",
    "description": "Graphic Designer specializing in brand identity, packaging design, and visual storytelling",
    "url": "https://adamzebilah.com",
    "sameAs": [
      "https://behance.net/adamzebilah",
      "https://dribbble.com/adamzebilah"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DZ",
      "addressLocality": "Algeria"
    },
    "knowsAbout": [
      "Graphic Design",
      "Brand Identity",
      "Packaging Design",
      "Visual Design",
      "UI/UX Design"
    ]
  }
}

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Adam Zebilah Portfolio",
    "url": "https://adamzebilah.com",
    "description": "Portfolio website of Adam Zebilah, Graphic Designer",
    "author": {
      "@type": "Person",
      "name": "Adam Zebilah"
    }
  }
}

export const generatePortfolioSchema = (projects) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Design Portfolio",
    "description": "Collection of design projects by Adam Zebilah",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "url": project.href,
      "creator": {
        "@type": "Person",
        "name": "Adam Zebilah"
      }
    }))
  }
}
