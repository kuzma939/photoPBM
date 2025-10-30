"use client"; // Оголошуємо файл як Client Component

import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import loveJsonLd from "../seo/love-jsonld";
import products from "../data/products"; // Загальний масив продуктів
import seoConfig from "../../../next-seo.config";

// Динамічний імпорт компонентів
const Layout = dynamic(() => import("../components/Layout"), { ssr: false });
const LoveGallery = dynamic(() => import("../components/LoveStoryInffo/LoveStoryInffo"), {
  ssr: false,
  loading: () => <div>Loading love story...</div>, // Резервний стан
});

export default function LoveStoryPage() {
  const loveProducts = products;
  const jsonLd = loveJsonLd(loveProducts); // SEO-дані для love-story
  const seo = seoConfig.loveStory; // (додай loveStory в seo config)

  return (
    <div className="transition-colors">
      {/* SEO-метатеги */}
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <meta property="og:url" content={seo.openGraph.url} />
        <meta property="og:type" content={seo.openGraph.type} />
        <meta property="og:image" content={seo.openGraph.images[0].url} />
        <link rel="canonical" href={seo.canonical} />
        <meta name="robots" content={seo.robots} />
      </Head>

      {/* JSON-LD для SEO */}
      <Script
        id="love-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Динамічний рендеринг компонентів */}
      <Layout>
        <LoveGallery />
      </Layout>
    </div>
  );
}
