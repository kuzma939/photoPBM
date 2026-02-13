import LoveStoryPage from "./src/app/love-story/page";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const url = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
const img = (path = "/logo-social.jpg") => url(path);

const BRAND = "Pic Best Moments";

// Default SEO Configuration
const seoConfig = {
  defaults: {
    title: `${BRAND} — Professional Photographer in Barcelona`,
    description:
      "Award-winning photographer in Barcelona specializing in love story, family, wedding & portrait photography. Capture your best moments at iconic Barcelona locations like Gothic Quarter, Sagrada Família & Barceloneta. Book now!",
    openGraph: {
      url: SITE_URL,
      title: `${BRAND} — Professional Photographer in Barcelona`,
      description:
        "Capture your best moments in Barcelona with professional photography services. Love stories, families, weddings & portraits at iconic locations.",
      type: "website",
      images: [{ 
        url: img("/logo-social.jpg"), 
        width: 1200, 
        height: 628, 
        alt: `${BRAND} - Barcelona Professional Photographer` 
      }],
    },
    canonical: SITE_URL,
    robots: "index, follow",
  },

  // Contact / Booking page
  contact: {
    title: "Book Your Barcelona Photo Session | Contact Pic Best Moments",
    description: "Book your professional photo session in Barcelona. Choose your preferred date, time, duration and location. Quick response within 24 hours. Multilingual service available in English, Spanish, French & Ukrainian.",
    openGraph: {
      url: url("/contact"),
      title: "Book Your Barcelona Photo Session | Contact Pic Best Moments",
      description: "Book your professional photo session in Barcelona. Choose date, time, duration and iconic Barcelona locations.",
      type: "website",
      images: [{ url: img("/og/contact.jpg"), width: 1200, height: 628, alt: "Book Barcelona Photo Session" }],
    },
    canonical: url("/contact"),
    robots: "index, follow",
  },

  // Love Stories (couple photoshoots portfolio)
  loveStory: {
    title: "Love Story Photography Barcelona | Romantic Couple Photoshoots",
    description: "Romantic love story and couple photography in Barcelona. Capture your love at iconic Barcelona locations: Gothic Quarter, Park Güell, Barceloneta beach. View our portfolio of engagement and couple photoshoots.",
    openGraph: {
      url: url("/love-stories"),
      title: "Love Story Photography Barcelona | Romantic Couple Photoshoots",
      description: "Professional romantic couple photography in Barcelona. Beautiful love story sessions at iconic locations.",
      images: [{ url: img("/og/love-stories.jpg"), width: 1200, height: 628, alt: "Barcelona Love Story Photography" }],
    },
    canonical: url("/love-stories"),
    robots: "index, follow",
  },

  // Gallery (main portfolio gallery)
  gallery: {
    title: "Photography Portfolio Barcelona | Photo Gallery",
    description: "Explore our photography portfolio featuring love stories, family sessions, weddings and portraits captured at Barcelona's most beautiful locations. Professional photography showcasing the best of Barcelona.",
    openGraph: {
      url: url("/gallery"),
      title: "Photography Portfolio Barcelona | Photo Gallery",
      description: "Curated gallery of professional photo sessions in Barcelona: couples, families, weddings & portraits.",
      images: [{ url: img("/og/gallery.jpg"), width: 1200, height: 628, alt: "Barcelona Photography Portfolio" }],
    },
    canonical: url("/gallery"),
    robots: "index, follow",
  },

  // Favorite Spots / Gallery Locations
  favoriteSpots: {
    title: "Best Photo Locations in Barcelona | Photoshoot Spots Guide",
    description: "Discover the best photography locations in Barcelona: Gothic Quarter, Sagrada Família, Barceloneta Beach, Ciutadella Park, Park Güell, Montjuïc. View real photoshoot examples, tips & recommendations for your Barcelona photo session.",
    openGraph: {
      url: url("/favorite-spots"),
      title: "Best Photo Locations in Barcelona | Photoshoot Spots Guide",
      description: "Complete guide to the best Barcelona photo locations with real session examples, professional tips & beautiful spots for your photoshoot.",
      images: [{ url: img("/og/favorite-spots.jpg"), width: 1200, height: 628, alt: "Best Barcelona Photo Locations" }],
    },
    canonical: url("/favorite-spots"),
    robots: "index, follow",
  },

  // Terms & Conditions
  conditions: {
    title: "Terms & Conditions | Pic Best Moments",
    description: "Read our Terms & Conditions and Privacy Policy.",
    openGraph: {
      url: url("/conditions"),
      title: "Terms & Conditions | Pic Best Moments",
      description: "Read our Terms & Conditions and Privacy Policy.",
      images: [{ url: img("/og/conditions.jpg"), width: 1200, height: 628, alt: "Terms & Conditions" }],
    },
    canonical: url("/conditions"),
    robots: "index, follow",
  },
  allProducts: {
    title: "Favorite Spots — PBM",
    description: "Best photo spots in Barcelona.",
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/favorite-spots`,
      title: "Favorite Spots — PBM",
      description: "Best photo spots in Barcelona.",
      type: "website",
      images: [
        { url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-social.jpg`, width: 1200, height: 628, alt: "PBM" }
      ]
    },
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/favorite-spots`,
    robots: "index, follow"
  },

};

export default seoConfig;
