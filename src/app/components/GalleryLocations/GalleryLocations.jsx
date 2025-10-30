"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";

import locationData from "../../data/location";
import { useLanguage } from "../../Functions/useLanguage";
import generateGalleryLocationsJsonLd from "../../seo/gallery-locations-jsonld";

export default function AllProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { translateList, language } = useLanguage();
  const headerTexts = translateList("home", "header");

  // read location from query (?location=...)
  const locationParam = searchParams.get("location") || "all";
  const [selectedLocation, setSelectedLocation] = useState(locationParam);

  // keep state in sync with URL
  useEffect(() => {
    setSelectedLocation(locationParam);
  }, [locationParam]);

  // update URL when user changes select
  const onChangeLocation = (value) => {
    setSelectedLocation(value);
    const q = value === "all" ? "" : `?location=${encodeURIComponent(value)}`;
    router.push(`/GalleryLocationsPage${q}`);
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
    current?.banner || "/Gothic/9DAF9EC6-F105-4A2B-AA15-0C7A7A34A9D6-2.avif";

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
      image: (loc.images && loc.images[0]) || "/logo-social.jpg",
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
          <Image src={currentBanner} alt="Banner" fill priority className="object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black/15 flex items-center justify-center rounded-lg">
            <h1 className="text-white text-2xl sm:text-4xl font-bold text-center px-4 drop-shadow-lg">
              {selectedLocation === "all"
                ? "Gallery of All Locations"
                : getTranslatedName(selectedLocation)}
            </h1>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 w-full max-w-md">
          <label className="block mb-1 font-medium text-lg">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => onChangeLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white"
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              {getTranslatedName(selectedLocation)}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-8">
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
                alt={`Photo ${i + 1}`}
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
          <button className="absolute top-4 right-4 text-3xl text-white" onClick={closeModal} aria-label="Close">
            &times;
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            onClick={goPrev}
            aria-label="Previous"
          >
            &#10094;
          </button>
          <Image
            src={currentImages[modalImageIndex]}
            alt={`Photo ${modalImageIndex + 1}`}
            width={1000}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
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
