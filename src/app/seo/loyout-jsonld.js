// src/app/seo/site-jsonld.js

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * 🔹 Основний опис сайту
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pic Best Moments — Photographer in Barcelona",
  url: SITE_URL,
  description:
    "Professional photographer in Barcelona capturing love stories, family moments, and portrait sessions with a unique style.",
  image: `${SITE_URL}/logo-social.jpg`,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/**
 * 🔹 Інформація про організацію (фотографа/студію)
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pic Best Moments",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-social.jpg`,
  description:
    "Pic Best Moments — professional photography service in Barcelona specializing in love stories, weddings, and family photo sessions.",
  sameAs: [
    "https://www.instagram.com/pic.best.moments/",
    "https://www.facebook.com/pic.best.moments",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "photographbusiness01@gmail.com",
    telephone: "+34 600 123 456",
    areaServed: "ES",
    availableLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Ukrainian" },
      { "@type": "Language", name: "Spanish" },
      { "@type": "Language", name: "French" },
    ],
  },
};
