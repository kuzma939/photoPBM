// src/app/seo/contact-jsonld.js

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "Booking & Customer Service",
    telephone: "+34654909621",
    email: "photographbusiness01@gmail.com",
    areaServed: [
      {
        "@type": "City",
        name: "Barcelona",
        "@id": "https://www.wikidata.org/wiki/Q1492"
      },
      {
        "@type": "AdministrativeArea", 
        name: "Catalonia"
      },
      "ES",
      "EU"
    ],
    availableLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "Ukrainian", alternateName: "uk" },
    ],
    hoursAvailable: {
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
      closes: "20:00"
    },
  },
  url: `${SITE_URL}/contact`,
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-social.jpg`,
    width: 1200,
    height: 628,
    caption: "Contact Pic Best Moments — Professional Photographer in Barcelona",
  },
  name: "Contact & Booking — Professional Photographer in Barcelona",
  description:
    "Book your professional photo session in Barcelona. Choose from love story, family, wedding, and portrait photography. Multiple iconic Barcelona locations available. Quick response within 24 hours. Multilingual service in English, Spanish, French & Ukrainian.",
  dateModified: new Date().toISOString(),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact & Booking",
        item: `${SITE_URL}/contact`
      }
    ]
  }
};

export default contactJsonLd;
