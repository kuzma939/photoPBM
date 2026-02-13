"use client";
import React, { useState } from "react";
import { useLanguage } from "../../Functions/useLanguage";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getInitialProductData } from "../../utils/productData";
import { handleFormSubmit, handleInputChange } from "../../utils/formHandlers";
import ProductDetails from "../products/ProductDetails";
import SocialLinks from "../SocialLinks/SocialLinks";
import OpeningHours from "../OpeningHours/OpeningHours";
import Map from "../Map/Map";
import ContactForm from "../ContactForm/ContactForm";
import SuccessMessage from "../../Functions/SuccessMessage";

const ContactUs = () => {
  const { translateList, language } = useLanguage();
  const menuItems = translateList("contact", "hero");
  const heroTitle = translateList("contact", "heroTitle");
  const heroSubtitle = translateList("contact", "heroSubtitle");

  const searchParams = useSearchParams();
  const initialProductData = getInitialProductData(searchParams);

  const [productData, setProductData] = useState(initialProductData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [formValues, setFormValues] = useState({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
  productImage: null,     // ← залишаємо ОДНУ

  // Бронювання
  bookingDate: "",
  bookingTime: "",
  durationOption: "1",
  customHours: "",
});

  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prevValues) => ({
        ...prevValues,
        productImage: file,
      }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = (e) =>
    handleFormSubmit({
      e,
      formValues, 
      setFormSubmitted,
      setSuccessMessageVisible,
      setFormValues,
      productData,
      setPhotoPreview,
    });

  const onInputChange = (e) => handleInputChange(e, setFormValues);

  return (
    <main className="font-sans relative">
      <SuccessMessage />

      <section className="bg-gray-100 text-black dark:bg-black dark:text-white text-center py-10 md:py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          {heroTitle[language === "FR" ? 2 : language === "ES" ? 0 : 0]}
        </h1>
        <p className="text-md md:text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          {heroSubtitle[language === "FR" ? 2 : language === "ES" ? 0 : 0]}
        </p>

        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 md:gap-16 lg:gap-28 bg-gray-200 dark:bg-[#111827] p-6 md:p-10 rounded-lg shadow-xl max-w-7xl mx-auto">
          {/* Фото фотографа */}
          <div className="w-full sm:w-1/2 lg:w-[56%] h-[450px] sm:h-[600px] dark:shadow-[0_0_20px_10px_rgba(59,130,246,0.4)]">
            <Image
              src="/photographer/photo_2025-06-15_10-51-42.jpg"
              alt="Professional photographer in Barcelona - Pic Best Moments portrait specializing in love story and family photography"
              width={400}
              height={600}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Контактна інформація + форма */}
          <article className="w-full sm:w-1/2 lg:w-1/3 space-y-6">
            <address className="not-italic text-base md:text-lg font-semibold leading-relaxed">
              Available worldwide · Based in <strong className="font-bold">Barcelona</strong>
              <br />
              📧{" "}
              <a href="mailto:photographbusiness01@gmail.com" className="text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text hover:drop-shadow-[0_0_10px_rgba(219,39,119,0.9)] font-bold transition-all duration-300">
                photographbusiness01@gmail.com
              </a>
              <br />
              📱 <a href="tel:+34654909621" className="font-bold hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text transition-all duration-300">+34 65 490 96 21</a>
            </address>

            {searchParams.get("productName") && (
              <ProductDetails productData={productData} formSubmitted={formSubmitted} />
            )}

            <ContactForm
              formValues={formValues}
              onInputChange={onInputChange}
              onFormSubmit={onFormSubmit}
              formSubmitted={formSubmitted}
              successMessageVisible={successMessageVisible}
            />

            <SocialLinks />
          </article>
        </section>
      </section>

      <section>
        <OpeningHours />
      </section>
      <section>
        <Map />
      </section>
    </main>
  );
};

export default ContactUs;
