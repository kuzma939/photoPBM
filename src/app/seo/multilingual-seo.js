// src/app/seo/multilingual-seo.js
// Language-specific SEO metadata for Barcelona Photography

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * Multilingual SEO Configuration
 * Provides optimized metadata for each language version
 */

export const multilingualSEO = {
  // English (Default)
  en: {
    siteName: "Pic Best Moments",
    tagline: "Professional Photographer in Barcelona",
    description: "Professional photographer in Barcelona specializing in love story, family, wedding, and portrait photography. Book your photo session at iconic Barcelona locations.",
    keywords: [
      "Barcelona photographer",
      "photographer in Barcelona",
      "love story photography Barcelona",
      "family photographer Barcelona",
      "wedding photographer Barcelona",
      "Gothic Quarter photoshoot",
      "Sagrada Família photography",
      "Barceloneta beach photos",
    ],
    pages: {
      home: {
        title: "Professional Photographer in Barcelona | Pic Best Moments",
        description: "Professional photographer in Barcelona specializing in love story, family, wedding, and portrait photography. Book your photo session at iconic Barcelona locations: Gothic Quarter, Sagrada Família, Barceloneta.",
      },
      gallery: {
        title: "Photography Portfolio Barcelona | Photo Gallery",
        description: "Explore our photography portfolio featuring love stories, family sessions, weddings and portraits captured at Barcelona's most beautiful locations.",
      },
      contact: {
        title: "Book Your Barcelona Photo Session | Contact",
        description: "Book your professional photo session in Barcelona. Choose your preferred date, time, duration and location. Quick response within 24 hours.",
      },
      loveStory: {
        title: "Love Story Photography Barcelona | Romantic Couple Photoshoots",
        description: "Romantic love story and couple photography in Barcelona. Capture your love at iconic Barcelona locations: Gothic Quarter, Park Güell, Barceloneta beach.",
      },
      locations: {
        title: "Best Photo Locations in Barcelona | Photoshoot Spots Guide",
        description: "Discover the best photography locations in Barcelona: Gothic Quarter, Sagrada Família, Barceloneta Beach, Ciutadella Park, Park Güell, Montjuïc.",
      },
    },
  },

  // Spanish
  es: {
    siteName: "Pic Best Moments",
    tagline: "Fotógrafo Profesional en Barcelona",
    description: "Fotógrafo profesional en Barcelona especializado en historias de amor, familia, bodas y fotografía de retrato. Reserva tu sesión de fotos en lugares emblemáticos de Barcelona.",
    keywords: [
      "fotógrafo Barcelona",
      "fotógrafo en Barcelona",
      "fotografía de historias de amor Barcelona",
      "fotógrafo familiar Barcelona",
      "fotógrafo de bodas Barcelona",
      "sesión de fotos Barrio Gótico",
      "fotografía Sagrada Família",
      "fotos playa Barceloneta",
    ],
    pages: {
      home: {
        title: "Fotógrafo Profesional en Barcelona | Pic Best Moments",
        description: "Fotógrafo profesional en Barcelona especializado en historias de amor, familia, bodas y retratos. Reserva tu sesión de fotos en lugares icónicos de Barcelona: Barrio Gótico, Sagrada Família, Barceloneta.",
      },
      gallery: {
        title: "Portafolio de Fotografía Barcelona | Galería de Fotos",
        description: "Explora nuestro portafolio de fotografía con historias de amor, sesiones familiares, bodas y retratos capturados en los lugares más hermosos de Barcelona.",
      },
      contact: {
        title: "Reserva tu Sesión de Fotos en Barcelona | Contacto",
        description: "Reserva tu sesión de fotos profesional en Barcelona. Elige tu fecha, hora, duración y ubicación preferidas. Respuesta rápida en 24 horas.",
      },
      loveStory: {
        title: "Fotografía de Historias de Amor Barcelona | Sesiones Románticas de Parejas",
        description: "Fotografía romántica de historias de amor y parejas en Barcelona. Captura tu amor en lugares emblemáticos de Barcelona: Barrio Gótico, Park Güell, playa Barceloneta.",
      },
      locations: {
        title: "Mejores Lugares para Fotos en Barcelona | Guía de Lugares para Sesiones",
        description: "Descubre los mejores lugares de fotografía en Barcelona: Barrio Gótico, Sagrada Família, Playa Barceloneta, Parque de la Ciutadella, Park Güell, Montjuïc.",
      },
    },
  },

  // French
  fr: {
    siteName: "Pic Best Moments",
    tagline: "Photographe Professionnel à Barcelone",
    description: "Photographe professionnel à Barcelone spécialisé dans les histoires d'amour, la famille, les mariages et la photographie de portrait. Réservez votre séance photo dans des lieux emblématiques de Barcelone.",
    keywords: [
      "photographe Barcelone",
      "photographe à Barcelone",
      "photographie histoires d'amour Barcelone",
      "photographe de famille Barcelone",
      "photographe de mariage Barcelone",
      "séance photo Quartier Gothique",
      "photographie Sagrada Família",
      "photos plage Barceloneta",
    ],
    pages: {
      home: {
        title: "Photographe Professionnel à Barcelone | Pic Best Moments",
        description: "Photographe professionnel à Barcelone spécialisé dans les histoires d'amour, la famille, les mariages et les portraits. Réservez votre séance photo dans des lieux emblématiques de Barcelone: Quartier Gothique, Sagrada Família, Barceloneta.",
      },
      gallery: {
        title: "Portfolio de Photographie Barcelone | Galerie Photos",
        description: "Explorez notre portfolio de photographie avec des histoires d'amour, des séances familiales, des mariages et des portraits capturés dans les plus beaux endroits de Barcelone.",
      },
      contact: {
        title: "Réservez Votre Séance Photo à Barcelone | Contact",
        description: "Réservez votre séance photo professionnelle à Barcelone. Choisissez votre date, heure, durée et lieu préférés. Réponse rapide sous 24 heures.",
      },
      loveStory: {
        title: "Photographie d'Histoires d'Amour Barcelone | Séances Romantiques de Couples",
        description: "Photographie romantique d'histoires d'amour et de couples à Barcelone. Capturez votre amour dans des lieux emblématiques de Barcelone: Quartier Gothique, Park Güell, plage Barceloneta.",
      },
      locations: {
        title: "Meilleurs Lieux Photo à Barcelone | Guide des Lieux de Séance",
        description: "Découvrez les meilleurs lieux de photographie à Barcelone: Quartier Gothique, Sagrada Família, Plage Barceloneta, Parc de la Ciutadella, Park Güell, Montjuïc.",
      },
    },
  },

  // Ukrainian
  uk: {
    siteName: "Pic Best Moments",
    tagline: "Професійний Фотограф у Барселоні",
    description: "Професійний фотограф у Барселоні, який спеціалізується на історіях кохання, сімейних, весільних та портретних фотосесіях. Забронюйте свою фотосесію в культових місцях Барселони.",
    keywords: [
      "фотограф Барселона",
      "фотограф у Барселоні",
      "фотографія історій кохання Барселона",
      "сімейний фотограф Барселона",
      "весільний фотограф Барселона",
      "фотосесія Готичний квартал",
      "фотографія Саграда Фамілія",
      "фото пляж Барселонета",
    ],
    pages: {
      home: {
        title: "Професійний Фотограф у Барселоні | Pic Best Moments",
        description: "Професійний фотограф у Барселоні, спеціалізується на історіях кохання, сім'ї, весіллях та портретах. Забронюйте свою фотосесію в культових місцях Барселони: Готичний квартал, Саграда Фамілія, Барселонета.",
      },
      gallery: {
        title: "Портфоліо Фотографії Барселона | Фотогалерея",
        description: "Перегляньте наше портфоліо фотографії з історіями кохання, сімейними сесіями, весіллями та портретами, зробленими в найкрасивіших місцях Барселони.",
      },
      contact: {
        title: "Забронюйте Свою Фотосесію в Барселоні | Контакт",
        description: "Забронюйте свою професійну фотосесію в Барселоні. Оберіть бажану дату, час, тривалість та місце. Швидка відповідь протягом 24 годин.",
      },
      loveStory: {
        title: "Фотографія Історій Кохання Барселона | Романтичні Сесії для Пар",
        description: "Романтична фотографія історій кохання та пар у Барселоні. Зафіксуйте своє кохання в культових місцях Барселони: Готичний квартал, Парк Гуель, пляж Барселонета.",
      },
      locations: {
        title: "Найкращі Місця для Фото в Барселоні | Гід по Місцях для Фотосесій",
        description: "Відкрийте найкращі місця для фотографії в Барселоні: Готичний квартал, Саграда Фамілія, Пляж Барселонета, Парк Сіутаделла, Парк Гуель, Монжуїк.",
      },
    },
  },
};

/**
 * Get SEO metadata for specific language and page
 * @param {string} lang - Language code (en, es, fr, uk)
 * @param {string} page - Page name (home, gallery, contact, etc.)
 * @returns {object} SEO metadata object
 */
export function getSEOForLanguage(lang = "en", page = "home") {
  const langData = multilingualSEO[lang] || multilingualSEO.en;
  const pageData = langData.pages[page] || langData.pages.home;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: langData.keywords,
    siteName: langData.siteName,
    locale: getLocaleCode(lang),
  };
}

/**
 * Get proper locale code for Open Graph
 * @param {string} lang - Language code
 * @returns {string} Locale code (e.g., en_US, es_ES)
 */
function getLocaleCode(lang) {
  const locales = {
    en: "en_US",
    es: "es_ES",
    fr: "fr_FR",
    uk: "uk_UA",
  };
  return locales[lang] || "en_US";
}

/**
 * Get alternate language links for current page
 * @param {string} page - Current page path
 * @returns {array} Array of alternate language objects
 */
export function getAlternateLanguages(page = "/") {
  return [
    { lang: "en", url: `${SITE_URL}/en${page}` },
    { lang: "es", url: `${SITE_URL}/es${page}` },
    { lang: "fr", url: `${SITE_URL}/fr${page}` },
    { lang: "uk", url: `${SITE_URL}/uk${page}` },
    { lang: "x-default", url: `${SITE_URL}${page}` },
  ];
}

/**
 * Generate hreflang tags for SEO
 * @param {string} page - Current page path
 * @returns {string} HTML string with hreflang tags
 */
export function generateHreflangTags(page = "/") {
  const alternates = getAlternateLanguages(page);
  return alternates
    .map(
      (alt) =>
        `<link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`
    )
    .join("\n");
}

export default multilingualSEO;
