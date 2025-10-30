
import Script from "next/script";
import { siteJsonLd, organizationJsonLd } from "./seo/loyout-jsonld"; 
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";
import ErrorBoundary from "../app/components/ErrorBoundary/ErrorBoundary";

// База для абсолютних URL з ENV
const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

// ---------- Metadata (App Router) ----------
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pic Best Moments — Photographer in Barcelona",
  description:
    "Professional photographer in Barcelona capturing love stories, family moments and portraits. Easy booking and transparent pricing.",
  applicationName: "Pic Best Moments",
  keywords: [
    "Barcelona photographer",
    "love story photoshoot",
    "family photos",
    "portrait photographer",
    "photo session Barcelona",
  ],
  authors: [{ name: "Pic Best Moments", url: SITE_URL }],
  creator: "Pic Best Moments",
  publisher: "Pic Best Moments",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Pic Best Moments",
    title: "Pic Best Moments — Photographer in Barcelona",
    description:
      "Professional photo sessions in Barcelona: couples, love stories, families, portraits.",
    images: [{ url: "/logo-social.jpg", width: 1200, height: 628, alt: "Pic Best Moments" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pic Best Moments — Photographer in Barcelona",
    description:
      "Professional photo sessions in Barcelona: couples, love stories, families, portraits.",
    images: ["/logo-social.jpg"],
  },
  robots: { index: true, follow: true },
  // Якщо треба верифікація Google:
  // verification: { google: "g_0gD_liwrkkTj-WviMVpLi56EWXTq9nEfPl-uJU72s" },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

// ---------- Root layout ----------
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-screen transition-colors">
        {/* ✅ JSON-LD (server-rendered, без хардкодів домену) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
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
