"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import locationData from "../../data/location";
import { useLanguage } from "../../Functions/useLanguage";
import generateGalleryLocationsJsonLd from "../../seo/gallery-locations-jsonld";
import { locationToSlug, slugToLocation, getLocationUrl } from "../../utils/slugs";

export default function AllProducts({ locationSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { translateList, language } = useLanguage();
  const headerTexts = translateList("home", "header");

  // Determine initial location from slug or query parameter
  const getInitialLocation = () => {
    // If locationSlug is provided (from dynamic route), use it
    if (locationSlug) {
      const location = slugToLocation(locationSlug, locationData);
      return location?.location || "all";
    }
    
    // Fallback to old query parameter for backward compatibility
    const locationParam = searchParams.get("location");
    return locationParam || "all";
  };

  const [selectedLocation, setSelectedLocation] = useState(getInitialLocation());

  // Update state when slug changes
  useEffect(() => {
    const newLocation = getInitialLocation();
    setSelectedLocation(newLocation);
  }, [locationSlug, searchParams]);

  // Update URL when user changes select - use new SEO-friendly URLs
  const onChangeLocation = (value) => {
    setSelectedLocation(value);
    
    // Use new SEO-friendly URL structure
    const newUrl = getLocationUrl(value);
    router.push(newUrl);
  };

  // helpers
  const getTranslatedName = (location) => {
    const loc = locationData.find((l) => l.location === location);
    return loc?.translations?.[language]?.name || location;
  };

  const current = selectedLocation !== "all"
    ? locationData.find((loc) => loc.location === selectedLocation)
    : null;

  const currentBanner =
    current?.banner || "/Parc cuitadella/Propose/1.avif";

  const currentImages = useMemo(
    () =>
      selectedLocation === "all"
        ? locationData.flatMap((loc) => loc.images || [])
        : current?.images || [],
    [selectedLocation, current]
  );

  // modal
  const [modalImageIndex, setModalImageIndex] = useState(null);
  const openModal = (i) => {
    setModalImageIndex(i);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalImageIndex(null);
    document.body.style.overflow = "auto";
  };
  const goNext = () =>
    setModalImageIndex((prev) => (prev + 1) % currentImages.length);
  const goPrev = () =>
    setModalImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);

  // JSON-LD payload (build from what you actually render)
  const jsonLdPayload = useMemo(() => {
    const list = (selectedLocation === "all"
      ? locationData
      : current
      ? [current]
      : []
    ).map((loc) => ({
      id: loc.id,
      slug: loc.location,
      title: loc.translations?.EN?.name || loc.location,
      description: loc.translations?.EN?.description || "",
      image: (loc.images && loc.images[0]) || "/logo.jpg",
      location: loc.location,
      date: loc.date,
    }));

    return generateGalleryLocationsJsonLd(list);
  }, [selectedLocation, current]);

  return (
    <section className="bg-gray-100 text-black dark:text-white min-h-screen dark:bg-black">
      {/* JSON-LD */}
      <Script
        id="gallery-locations-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }}
      />

      <div className="px-4 py-6 w-full max-w-7xl mx-auto">
        {/* Banner */}
        <div className="w-full h-72 sm:h-[500px] relative mb-6 overflow-hidden fade-in">
          <Image 
            src={currentBanner} 
            alt={`Professional photography ${selectedLocation !== "all" ? `at ${getTranslatedName(selectedLocation)}` : "Barcelona"} - Love story and couple photoshoot locations`} 
            fill 
            priority 
            className="object-cover rounded-lg" 
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
            <h1 className="text-white text-2xl sm:text-4xl font-extrabold text-center px-4 drop-shadow-2xl tracking-tight">
              {selectedLocation === "all"
                ? "Gallery of All Locations"
                : getTranslatedName(selectedLocation)}
            </h1>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 w-full max-w-md">
          <label className="block mb-2 font-bold text-lg">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => onChangeLocation(e.target.value)}
            className="w-full p-3 border-2 border-gray-400 dark:border-gray-600 rounded bg-white text-black font-semibold dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            {locationData.map((loc) => (
              <option key={loc.id} value={loc.location}>
                {loc.translations?.[language]?.name || loc.location}
              </option>
            ))}
          </select>
        </div>

        {/* Heading */}
        {selectedLocation !== "all" && (
          <>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
              {getTranslatedName(selectedLocation)}
            </h2>
            <p className="text-gray-800 dark:text-gray-300 font-semibold mb-8 text-lg">
              {currentImages.length} {currentImages.length === 1 ? "photo" : "photos"}
            </p>
          </>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {currentImages.map((src, i) => (
            <button
              key={i}
              type="button"
              className="rounded shadow overflow-hidden cursor-pointer"
              onClick={() => openModal(i)}
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Professional photography ${selectedLocation !== "all" ? `at ${getTranslatedName(selectedLocation)}` : "Barcelona locations"} - Couple photoshoot ${i + 1}`}
                width={300}
                height={400}
                className="object-cover w-full h-[400px]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button className="absolute top-4 right-4 text-5xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text active:text-transparent active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] active:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-125 active:scale-125" onClick={closeModal} aria-label="Close">
            &times;
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text active:text-transparent active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] active:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-150 active:scale-150"
            onClick={goPrev}
            aria-label="Previous"
          >
            &#10094;
          </button>
          <Image
            src={currentImages[modalImageIndex]}
            alt={`Professional couple photoshoot ${selectedLocation !== "all" ? `at ${getTranslatedName(selectedLocation)}` : "Barcelona"} - Portfolio ${modalImageIndex + 1}`}
            width={1000}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text active:text-transparent active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] active:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-150 active:scale-150"
            onClick={goNext}
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
}
