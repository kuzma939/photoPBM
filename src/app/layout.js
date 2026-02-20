
import Script from "next/script";
import { siteJsonLd, organizationJsonLd } from "./seo/loyout-jsonld"; 
import { faqJsonLd } from "./seo/faq-jsonld";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";
import ErrorBoundary from "../app/components/ErrorBoundary/ErrorBoundary";

// База для абсолютних URL з ENV
const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

// ---------- Metadata (App Router) ----------
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Professional Photographer in Barcelona | Pic Best Moments",
    template: "%s | Pic Best Moments",
  },
  description:
    "Professional photographer in Barcelona specializing in love story, family, wedding, and portrait photography. Book your photo session at iconic Barcelona locations: Gothic Quarter, Sagrada Família, Barceloneta. Multilingual service in English, Spanish, French & Ukrainian.",

  verification: {
    google: "Ym-lDSsvY4ph2BQ0M7nKfXEBTvyBK2GtZVov3YvwnsU",
  },

  applicationName: "Pic Best Moments",
  keywords: [
    // Barcelona & brand
    "Barcelona photographer",
    "photographer in Barcelona",
    "Barcelona photography",
    "Pic Best Moments",
    "fotógrafo Barcelona",
    "photographe Barcelone",
    "professional photographer Barcelona",
    "best photographer Barcelona",
    "photo session Barcelona",
    "Barcelona photo tour",
    // Love story & couples
    "love story photoshoot Barcelona",
    "love story photography Barcelona",
    "couple photographer Barcelona",
    "couple photoshoot Barcelona",
    "engagement photos Barcelona",
    "engagement photographer Barcelona",
    "proposal photography Barcelona",
    "proposal photos Barcelona",
    "romantic photoshoot Barcelona",
    // Family & wedding
    "family photos Barcelona",
    "family photographer Barcelona",
    "wedding photographer Barcelona",
    "wedding photos Barcelona",
    "portrait photographer Barcelona",
    // Locations
    "Gothic Quarter photoshoot",
    "Gothic Quarter photography",
    "Sagrada Família photography",
    "Sagrada Família photoshoot",
    "Barceloneta beach photos",
    "Barceloneta photographer",
    "Parc Ciutadella photoshoot",
    "Parc de la Ciutadella proposal",
    "Ciutadella Park photos",
    "Park Güell photographer",
    "Park Güell photoshoot",
    "Montjuïc photography Barcelona",
    // Intent
    "book photographer Barcelona",
    "hire photographer Barcelona",
    "Barcelona photoshoot locations",
    "best photo spots Barcelona",
  ],
  authors: [{ name: "Pic Best Moments", url: SITE_URL }],
  creator: "Pic Best Moments",
  publisher: "Pic Best Moments",

  // Geographic targeting
  other: {
    "geo.region": "ES-CT",
    "geo.placename": "Barcelona",
    "geo.position": "41.3851;2.1734",
    "ICBM": "41.3851, 2.1734",
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
      fr: `${SITE_URL}/fr`,
      uk: `${SITE_URL}/uk`,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Pic Best Moments",
    title: "Professional Photographer in Barcelona | Pic Best Moments",
    description:
      "Professional photo sessions in Barcelona: love stories, families, weddings, portraits at iconic locations. Book your Barcelona photography experience today!",
    images: [
      { 
        url: "/Logo.webp", 
        width: 1200, 
        height: 628, 
        alt: "Pic Best Moments - Professional Photographer in Barcelona",
        type: "image/webp",
      }
    ],
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR", "uk_UA"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Professional Photographer in Barcelona | Pic Best Moments",
    description:
      "Professional photo sessions in Barcelona: love stories, families, weddings, portraits at iconic locations.",
    images: ["/Logo.webp"],
    creator: "@picbestmoments",
  },

  robots: { 
    index: true, 
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/Logo.webp", sizes: "32x32", type: "image/webp" },
      { url: "/Logo.webp", sizes: "16x16", type: "image/webp" },
    ],
    apple: [
      { url: "/Logo.webp", sizes: "180x180", type: "image/webp" },
    ],
  },

  // Category for better indexing
  category: "Photography Services",
};

// ---------- Root layout ----------
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-screen transition-colors">
        {/* ✅ JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ✅ Google Analytics — підстав свій ID або забери блок якщо не потрібен */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-KGLK5J3JEE"
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KGLK5J3JEE');
              `}
            </Script>
          </>
        )}

        {/* Client providers/Boundary можна підключати всередині тіла */}
        <ThemeProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
