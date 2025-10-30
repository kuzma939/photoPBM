// src/app/seo/contact-jsonld.js

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "Booking & Inquiries", // Тип контакту (бронювання / запити)
    telephone: "+34654909621", // твій реальний телефон
    email: "photographbusiness01@gmail.com", // твоя пошта
    areaServed: ["ES", "EU"], // Іспанія, Європа
    availableLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Ukrainian" },
      { "@type": "Language", name: "French" },
    ],
  },
  url: `${SITE_URL}/contact`,
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-social.jpg`,
    width: 1200,
    height: 628,
    caption: "Contact Pic Best Moments — Photographer in Barcelona",
  },
  name: "Contact & Booking — Pic Best Moments",
  description:
    "Book your photo session in Barcelona or contact us for details. We respond within 24 hours.",
  dateModified: new Date().toISOString(),
};

export default contactJsonLd;
