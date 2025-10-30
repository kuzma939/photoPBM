// src/app/seo/love-jsonld.js

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * JSON-LD для сторінки Love Stories (портфоліо фотосесій)
 */
const loveJsonLd = (stories = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Love Stories — Pic Best Moments",
  description:
    "Romantic and emotional love story photo sessions captured in Barcelona by Pic Best Moments photographer.",
  url: `${SITE_URL}/love-stories`,
  numberOfItems: stories.length,
  itemListElement: stories.map((story, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/love-stories/${story.slug || story.id || index}`,
    item: {
      "@type": "CreativeWork", // описує творчі проекти (фотосесії)
      name: story.title || story.translations?.EN?.name || "Untitled Love Story",
      description:
        story.description ||
        story.translations?.EN?.description ||
        "Romantic couple photo session in Barcelona.",
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}${story.image || "/logo-social.jpg"}`,
        width: 1200,
        height: 800,
        caption:
          story.caption ||
          story.translations?.EN?.name ||
          "Love Story photo session in Barcelona",
      },
      author: {
        "@type": "Person",
        name: "Pic Best Moments Photographer",
      },
      locationCreated: {
        "@type": "Place",
        name: story.location || "Barcelona",
      },
      datePublished: story.date || "2025-01-01",
      genre: "Photography",
      inLanguage: "en",
    },
  })),
});

export default loveJsonLd;
