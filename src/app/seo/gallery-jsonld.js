const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  .replace(/\/$/, "");

/**
 * Schema.org ItemList for your “Gallery / Favorite Spots”
 * @param {Array} locations
 */
const galleryJsonLd = (locations = []) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Barcelona Photography Portfolio — Pic Best Moments",
  description:
    "Professional photography portfolio featuring love story, family, wedding and portrait sessions in Barcelona. Explore our work at iconic Barcelona locations including Gothic Quarter, Sagrada Família, Barceloneta, and more.",
  url: `${SITE_URL}/gallery`,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: locations.length,
  author: {
    "@type": "Person",
    name: "Pic Best Moments",
    url: SITE_URL,
    jobTitle: "Professional Photographer",
  },
  itemListElement: locations.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/gallery/${item?.slug ?? index}`,
    item: {
      "@type": "Photograph",
      name: item?.title || `Barcelona Photography Session ${index + 1}`,
      description: item?.description || `Professional ${item?.type || "photography"} session in ${item?.location || "Barcelona"}.`,
      contentUrl: `${SITE_URL}${item?.image || "/placeholder.jpg"}`,
      thumbnailUrl: `${SITE_URL}${item?.image || "/placeholder.jpg"}`,
      width: 1200,
      height: 800,
      author: { 
        "@type": "Person", 
        name: "Pic Best Moments",
        url: SITE_URL 
      },
      locationCreated: { 
        "@type": "Place", 
        name: item?.location || "Barcelona, Spain",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressRegion: "Catalonia",
          addressCountry: "ES"
        }
      },
      datePublished: item?.date || new Date().toISOString().split('T')[0],
      keywords: `Barcelona photographer, ${item?.location || "Barcelona"} photography, ${item?.type || "professional"} photography Barcelona`,
    },
  })),
});

export default galleryJsonLd;
