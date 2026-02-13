const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  .replace(/\/$/, "");

/**
 * Schema.org ItemList for “Favorite Spots / Gallery Locations”
 * @param {Array} locations  [{ slug?, id?, title?, description?, image?, location?, date? }]
 */
const generateGalleryLocationsJsonLd = (locations = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Photography Locations in Barcelona — Pic Best Moments",
  description:
    "Discover the most stunning photography locations in Barcelona: Gothic Quarter, Sagrada Família, Barceloneta Beach, Ciutadella Park, Park Güell, and Montjuïc. Professional photoshoot spots with real session examples.",
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
        name: item?.title || `Barcelona Photo Location ${index + 1}`,
        description: item?.description || `Professional photography location in ${item?.location || "Barcelona"} - perfect for love stories, family sessions and portraits.`,
        contentUrl: `${SITE_URL}${item?.image || "/logo-social.jpg"}`,
        width: 1200,
        height: 800,
        author: { 
          "@type": "Person", 
          name: "Pic Best Moments",
          url: SITE_URL 
        },
        locationCreated: { 
          "@type": "Place", 
          name: item?.location || "Barcelona",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Barcelona",
            addressRegion: "Catalonia",
            addressCountry: "ES"
          }
        },
        datePublished: item?.date || new Date().toISOString().split('T')[0],
        keywords: `${item?.location || "Barcelona"} photography, Barcelona photoshoot location, ${item?.type || "couple"} photography Barcelona`,
      },
    };
  }),
});

export default generateGalleryLocationsJsonLd;
