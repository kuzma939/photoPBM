const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const BRAND_NAME = "Pic Best Moments";

const generateConditionsJsonLd = () => {
  const pageUrl = `${SITE_URL}/conditions`;
  // Заміни шлях на свій фактичний OG/соціальний банер, якщо інший:
  const imageUrl = `${SITE_URL}/logo-social.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",

    // Англомовні назва/опис сторінки
    name: "Terms & Conditions",
    description: "Read our Terms & Conditions and Privacy Policy.",

    // Абсолютні URL — з ENV
    url: pageUrl,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 628,
      caption: "Terms & Conditions – Pic Best Moments",
    },

    // Можна вказати k-коди мов або назви (обидва допустимі)
    inLanguage: ["en", "uk", "fr"],

    // Корисний контекст для пошуку
    isPartOf: {
      "@type": "WebSite",
      name: BRAND_NAME,
      url: SITE_URL,
    },

    // Хлібні крихти (необов’язково, але плюсик для SEO)
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: pageUrl },
      ],
    },

    dateModified: new Date().toISOString(),
  };
};

export default generateConditionsJsonLd;
