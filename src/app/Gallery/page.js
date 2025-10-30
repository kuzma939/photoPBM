"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

import seoConfig from "../../../next-seo.config";
import products from "../data/products";
import galleryJsonLd from "../seo/gallery-jsonld";

// dynamic imports
const Layout = dynamic(() => import("../components/Layout"), { ssr: false });
const GalleryInfo = dynamic(
  () => import("../components/GalleryInfo/GalleryInfo"),
  { ssr: false, loading: () => <div>Loading gallery...</div> }
);

export default function GalleryPage() {
  // вибираємо, що показувати в галереї
  const gallery = products.filter((p) => p.isTop);

  // JSON-LD
  const jsonLd = galleryJsonLd(gallery);

  // SEO з дефолтами, щоб не було "reading 'title' of undefined"
  const fallbackSeo = {
    title: "Gallery | Pic Best Moments",
    description:
      "Explore beautiful photo spots and sessions captured in Barcelona by Pic Best Moments.",
    openGraph: {
      title: "Gallery | Pic Best Moments",
      description:
        "Explore beautiful photo spots and sessions captured in Barcelona by Pic Best Moments.",
      url: "/gallery",
      type: "website",
      images: [{ url: "/logo-social.jpg" }],
    },
    canonical: "/gallery",
    robots: "index, follow",
  };

  const seo = seoConfig?.gallery ?? fallbackSeo;
  const og = seo.openGraph ?? fallbackSeo.openGraph;
  const ogImage = og.images?.[0]?.url ?? fallbackSeo.openGraph.images[0].url;

  return (
    <div className="transition-colors">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        <meta property="og:image" content={ogImage} />
        <link rel="canonical" href={seo.canonical} />
        <meta name="robots" content={seo.robots} />
      </Head>

      <Script
        id="gallery-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Layout>
        <GalleryInfo />
      </Layout>
    </div>
  );
}
