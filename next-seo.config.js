import LoveStoryPage from "./src/app/love-story/page";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const url = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
const img = (path = "/logo-social.jpg") => url(path);

const BRAND = "Pic Best Moments";

// Універсальний дефолт
const seoConfig = {
  defaults: {
    title: `${BRAND} — Photographer in Barcelona`,
    description:
      "Professional photo sessions in Barcelona: couples, love stories, families, portraits. Easy booking and transparent pricing.",
    openGraph: {
      url: SITE_URL,
      title: `${BRAND} — Photographer in Barcelona`,
      description:
        "Professional photo sessions in Barcelona: couples, love stories, families, portraits. Easy booking and transparent pricing.",
      type: "website",
      images: [{ url: img("/logo-social.jpg"), width: 1200, height: 628, alt: BRAND }],
    },
    canonical: SITE_URL,
    robots: "index, follow",
  },

  // Contact / Booking page
  contact: {
    title: "Contact & Booking | Pic Best Moments",
    description: "Book your photo session in Barcelona: pick date, time and duration. We reply within 24 hours.",
    openGraph: {
      url: url("/contact"),
      title: "Contact & Booking | Pic Best Moments",
      description: "Book your photo session in Barcelona: pick date, time and duration.",
      type: "website",
      images: [{ url: img("/og/contact.jpg"), width: 1200, height: 628, alt: "Contact & Booking" }],
    },
    canonical: url("/contact"),
    robots: "index, follow",
  },

  // Love Stories (портфоліо парних зйомок)
  loveStory: {
    title: "Love Stories | Pic Best Moments",
    description: "Romantic couple photo sessions in Barcelona. Explore our love story portfolio.",
    openGraph: {
      url: url("/love-stories"),
      title: "Love Stories | Pic Best Moments",
      description: "Romantic couple photo sessions in Barcelona.",
      images: [{ url: img("/og/love-stories.jpg"), width: 1200, height: 628, alt: "Love Stories" }],
    },
    canonical: url("/love-stories"),
    robots: "index, follow",
  },

  // Gallery (загальна галерея робіт)
  gallery: {
    title: "Gallery | Pic Best Moments",
    description: "A curated gallery of photo sessions captured around Barcelona.",
    openGraph: {
      url: url("/gallery"),
      title: "Gallery | Pic Best Moments",
      description: "A curated gallery of photo sessions captured around Barcelona.",
      images: [{ url: img("/og/gallery.jpg"), width: 1200, height: 628, alt: "Gallery" }],
    },
    canonical: url("/gallery"),
    robots: "index, follow",
  },

  // Favorite Spots / Gallery Locations
  favoriteSpots: {
    title: "Favorite Spots in Barcelona | Pic Best Moments",
    description: "Best photo locations in Barcelona with real session examples and tips.",
    openGraph: {
      url: url("/favorite-spots"),
      title: "Favorite Spots in Barcelona | Pic Best Moments",
      description: "Best photo locations in Barcelona with real session examples and tips.",
      images: [{ url: img("/og/favorite-spots.jpg"), width: 1200, height: 628, alt: "Favorite Spots" }],
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
