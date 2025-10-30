const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  .replace(/\/$/, "");

/**
 * Schema.org ItemList for “Favorite Spots / Gallery Locations”
 * @param {Array} locations  [{ slug?, id?, title?, description?, image?, location?, date? }]
 */
const generateGalleryLocationsJsonLd = (locations = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Favorite Photo Spots — Pic Best Moments",
  description:
    "A curated list of the best photo spots and sessions in Barcelona by Pic Best Moments.",
  url: `${SITE_URL}/favorite-spots`,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: locations.length,
  itemListElement: locations.map((item, index) => {
    const slugOrId = item?.slug || item?.id || index;
    const pageUrl = `${SITE_URL}/favorite-spots/${slugOrId}`;

    return {
      "@type": "ListItem",
      position: index + 1,
      url: pageUrl,
      item: {
        "@type": "ImageObject",
        name: item?.title || "Photo location",
        description: item?.description || "Beautiful photo location in Barcelona.",
        contentUrl: `${SITE_URL}${item?.image || "/logo-social.jpg"}`,
        width: 1200,
        height: 800,
        author: { "@type": "Person", name: "Pic Best Moments Photographer" },
        locationCreated: { "@type": "Place", name: item?.location || "Barcelona" },
        datePublished: item?.date || "2025-01-01",
      },
    };
  }),
});

export default generateGalleryLocationsJsonLd;
