const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  .replace(/\/$/, "");

/**
 * Schema.org ItemList for your “Gallery / Favorite Spots”
 * @param {Array} locations
 */
const galleryJsonLd = (locations = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Photo Gallery — Pic Best Moments",
  description:
    "Explore beautiful photo spots and sessions captured in Barcelona by Pic Best Moments photographer.",
  url: `${SITE_URL}/gallery`,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: locations.length,
  itemListElement: locations.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/gallery/${item?.slug ?? index}`,
    item: {
      "@type": "ImageObject",
      name: item?.title || "Beautiful photo location",
      description: item?.description || "Captured moment in Barcelona.",
      contentUrl: `${SITE_URL}${item?.image || "/placeholder.jpg"}`,
      width: 1200,
      height: 800,
      author: { "@type": "Person", name: "Pic Best Moments Photographer" },
      locationCreated: { "@type": "Place", name: item?.location || "Barcelona" },
      datePublished: item?.date || "2025-01-01",
    },
  })),
});

export default galleryJsonLd;
