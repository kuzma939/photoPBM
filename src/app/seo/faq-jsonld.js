// src/app/seo/faq-jsonld.js

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * 🔹 FAQ Schema for Homepage
 * Helps with rich snippets in Google search results
 */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where are the best photo locations in Barcelona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best photography locations in Barcelona include the Gothic Quarter for historic architecture, Sagrada Família for iconic backdrops, Barceloneta Beach for romantic seaside shots, Ciutadella Park for natural greenery, Park Güell for colorful mosaics, and Montjuïc for panoramic city views. Each location offers unique characteristics perfect for different photography styles.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a photo session in Barcelona cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional photo session prices in Barcelona vary based on duration, location, and session type. We offer transparent pricing for love story sessions, family photography, wedding coverage, and portrait photography. Contact us for detailed pricing and package information tailored to your needs.",
      },
    },
    {
      "@type": "Question",
      name: "What should I wear for a photoshoot in Barcelona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Barcelona photoshoots, choose comfortable, coordinated outfits that match the location's vibe. For Gothic Quarter sessions, elegant or casual-chic works well. For beach sessions at Barceloneta, light, flowing fabrics are ideal. Avoid busy patterns and logos. We provide styling tips based on your chosen location and session type.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a photo session in Barcelona take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical photo sessions in Barcelona last 1-3 hours depending on the package. This includes time for multiple locations if desired, outfit changes, and capturing various poses and moments. We recommend at least 2 hours for comprehensive coverage of iconic Barcelona locations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer photography services in multiple languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We provide professional photography services in English, Spanish, French, and Ukrainian. This makes communication easy and ensures you're comfortable throughout your Barcelona photo session experience.",
      },
    },
    {
      "@type": "Question",
      name: "When will I receive my photos after the session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll receive your professionally edited photos within 7-14 days after your Barcelona photo session. All images are carefully retouched and color-corrected to ensure the highest quality. Rush delivery is available upon request.",
      },
    },
    {
      "@type": "Question",
      name: "Can you recommend the best time of day for outdoor photography in Barcelona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The golden hour (early morning or late afternoon) provides the best natural lighting for Barcelona outdoor photography. We typically recommend sessions starting 1-2 hours before sunset for warm, flattering light. Morning sessions work well for locations like Sagrada Família and Park Güell to avoid crowds.",
      },
    },
    {
      "@type": "Question",
      name: "Do you photograph weddings in Barcelona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer comprehensive wedding photography services in Barcelona, including engagement sessions, wedding day coverage, and destination wedding photography. We're experienced with Barcelona's most popular wedding venues and can capture your special day at any location throughout the city.",
      },
    },
  ],
};

/**
 * 🔹 BreadcrumbList Schema for better navigation understanding
 */
export const breadcrumbJsonLd = (pageName, pageUrl) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: pageName,
      item: pageUrl,
    },
  ],
});

/**
 * 🔹 ImageObject Schema for Gallery Images
 */
export const imageGalleryJsonLd = (images) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Barcelona Photography Portfolio",
  description: "Professional photography portfolio showcasing love stories, families, weddings and portraits in Barcelona",
  image: images.map((img, index) => ({
    "@type": "ImageObject",
    contentUrl: `${SITE_URL}${img}`,
    description: `Professional photography in Barcelona - Image ${index + 1}`,
    author: {
      "@type": "Person",
      name: "Pic Best Moments",
    },
  })),
});

export default faqJsonLd;
