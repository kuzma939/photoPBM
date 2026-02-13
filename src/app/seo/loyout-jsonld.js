// src/app/seo/site-jsonld.js

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * 🔹 Enhanced Website Schema
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
  inLanguage: ["en", "es", "fr", "uk"],
};

/**
 * 🔹 Enhanced Organization & Local Business Schema
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
  name: "Pic Best Moments",
  alternateName: "PBM Photography Barcelona",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-social.jpg`,
  image: `${SITE_URL}/logo-social.jpg`,
  description:
    "Professional photography service in Barcelona specializing in love stories, weddings, family photo sessions, and portrait photography. Capturing your best moments at iconic Barcelona locations.",
  
  // Geographic & Service Area
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressRegion: "Catalonia",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.3851,
    longitude: 2.1734,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Barcelona",
      "@id": "https://www.wikidata.org/wiki/Q1492"
    },
    {
      "@type": "AdministrativeArea",
      name: "Catalonia"
    }
  ],

  // Services Offered
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Photography Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Love Story Photography",
          description: "Romantic couple photo sessions in Barcelona",
          areaServed: "Barcelona",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Family Photography",
          description: "Professional family photo sessions",
          areaServed: "Barcelona",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wedding Photography",
          description: "Wedding and engagement photography",
          areaServed: "Barcelona",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Portrait Photography",
          description: "Professional portrait sessions",
          areaServed: "Barcelona",
        },
      },
    ],
  },

  // Social Media & Contact
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
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "Ukrainian", alternateName: "uk" },
    ],
  },

  // Business Details
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
};
