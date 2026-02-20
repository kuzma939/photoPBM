"use client";
import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";
import { use, useEffect, useState } from "react";
import generateGalleryLocationsJsonLd from "../../seo/gallery-locations-jsonld";
import seoConfig from "../../../../next-seo.config";
import locationData from "../../data/location";
import { locationToSlug } from "../../utils/slugs";

const Layout = dynamic(() => import("../../components/Layout"), { ssr: false });
const GalleryLocations = dynamic(() => import("../../components/GalleryLocations/GalleryLocations"), { ssr: false });

// Helper function to find location by slug
const findLocationBySlug = (slug) => {
  return locationData.find(loc => locationToSlug(loc.location) === slug);
};

export default function LocationPage({ params }) {
  // Unwrap params Promise with React.use()
  const resolvedParams = use(params);
  const { location: locationSlug } = resolvedParams;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const foundLocation = findLocationBySlug(locationSlug);
    setLocation(foundLocation);
  }, [locationSlug]);

  // Show loading state
  if (!location) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  const jsonLd = generateGalleryLocationsJsonLd([{
    id: location.id,
    slug: locationSlug,
    title: location.translations?.EN?.name || location.location,
    description: `Professional photography at ${location.location}, Barcelona`,
    image: location.banner || location.images?.[0] || "/logo.jpg",
    location: location.location,
  }]);

  const seo = seoConfig.favoriteSpots;
  const pageTitle = `${location.location} Photography Barcelona | Photo Location Guide`;
  const pageDescription = `Professional photoshoot location guide for ${location.location} in Barcelona. View real photo examples, tips, and recommendations for your Barcelona photography session.`;

  return (
    <div className="transition-colors">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${seo.openGraph.url}/${locationSlug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={location.banner || seo.openGraph.images[0].url} />
        <link rel="canonical" href={`${seo.canonical}/${locationSlug}`} />
        <meta name="robots" content={seo.robots} />
      </Head>

      <Script
        id="location-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Layout>
        <GalleryLocations locationSlug={locationSlug} />
      </Layout>
    </div>
  );
}
