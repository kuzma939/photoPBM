import React, { useMemo, useState } from "react";
import { validateForm } from "../../utils/validationContactForm";
import { useLanguage } from "../../Functions/useLanguage";

// Package pricing (EUR)
const PRICE_TABLE = {
  "0.5": 75,
  "1": 150,
  "1.5": 200,
  "2": 250,
  "3": 350,
};
const BASE_RATE = 150; // for custom durations

function getTotalPrice(hours) {
  if (!hours || hours <= 0) return 0;
  const key = String(hours);
  if (PRICE_TABLE[key] != null) return PRICE_TABLE[key];
  return Math.round(hours * BASE_RATE);
}

function pluralHours(h) {
  if (!h) return "0 h";
  // 0.5 -> "0.5 h", 1 -> "1 h", 2 -> "2 h"
  return `${h} h`;
}

const ContactForm = ({
  formValues,
  onInputChange,
  onFormSubmit,
  formSubmitted,
  successMessageVisible,
}) => {
  const { translateList, language } = useLanguage();
  const t = translateList("contact", "input");
  const [errors, setErrors] = useState({});

  const hours = useMemo(() => {
    if (formValues.durationOption === "custom") {
      const h = parseFloat(formValues.customHours);
      return isNaN(h) || h <= 0 ? 0 : h;
    }
    return parseFloat(formValues.durationOption || "0");
  }, [formValues.durationOption, formValues.customHours]);

  const totalPrice = useMemo(() => getTotalPrice(hours), [hours]);

  const priceNote =
    PRICE_TABLE[String(hours)] != null
      ? t[12] // "fixed package"
      : hours > 0
      ? `€${BASE_RATE}/${t[13]} (custom)` // "hour"
      : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm({
      ...formValues,
      bookingDate: formValues.bookingDate,
      bookingTime: formValues.bookingTime,
    });

    if (!formValues.bookingDate) newErrors.bookingDate = "Please select a date";
    if (!formValues.bookingTime) newErrors.bookingTime = "Please select a time";
    if (hours <= 0) newErrors.durationOption = "Please choose the duration";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onFormSubmit(e, { ...formValues, hours, totalPrice });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Name */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              name="firstName"
              placeholder={t[0]}
              value={formValues.firstName}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b-2 border-gray-700 dark:border-gray-300 text-black dark:text-white font-semibold placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-pink-600 active:border-pink-600"
              required
            />
            {errors.firstName && (
              <p className="text-red-600 dark:text-red-500 text-sm font-bold mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              name="lastName"
              placeholder={t[1]}
              value={formValues.lastName}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b-2 border-gray-700 dark:border-gray-300 text-black dark:text-white font-semibold placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-pink-600 active:border-pink-600"
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder={t[2]}
            value={formValues.phone}
            onChange={onInputChange}
            className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-pink-600 active:border-pink-600"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder={t[3]}
            value={formValues.email}
            onChange={onInputChange}
            className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-pink-600 active:border-pink-600"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Date + Time */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <input
              type="date"
              name="bookingDate"
              placeholder={t[8]}
              value={formValues.bookingDate}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b-2 border-gray-700 dark:border-gray-300 text-black dark:text-white font-semibold focus:outline-none focus:border-lime-500"
              required
            />
            {errors.bookingDate && (
              <p className="text-red-500 text-sm mt-1">{errors.bookingDate}</p>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <input
              type="time"
              name="bookingTime"
              placeholder={t[9]}
              value={formValues.bookingTime}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b-2 border-gray-700 dark:border-gray-300 text-black dark:text-white font-semibold focus:outline-none focus:border-lime-500"
              required
            />
            {errors.bookingTime && (
              <p className="text-red-500 text-sm mt-1">{errors.bookingTime}</p>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <select
              name="durationOption"
              value={formValues.durationOption}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b-2 border-gray-700 dark:border-gray-300 text-black dark:text-white font-semibold focus:outline-none focus:border-lime-500"
            >
              <option value="0.5">30 min</option>
              <option value="1">1 hour</option>
              <option value="1.5">1.5 hours</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="custom">Custom…</option>
            </select>
            {errors.durationOption && (
              <p className="text-red-500 text-sm mt-1">
                {errors.durationOption}
              </p>
            )}
          </div>

          {formValues.durationOption === "custom" && (
            <div className="w-full sm:w-1/2">
              <input
                type="number"
                step="0.5"
                min="0.5"
                name="customHours"
                placeholder={t[11]}
                value={formValues.customHours}
                onChange={onInputChange}
                className="w-full p-3 bg-transparent border-b-2 border-gray-700 dark:border-gray-300 text-black dark:text-white font-semibold focus:outline-none focus:border-lime-500"
              />
            </div>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            placeholder={t[4]}
            rows="4"
            value={formValues.message}
            onChange={onInputChange}
            className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-pink-600 active:border-pink-600"
          />
        </div>

        {/* Price summary */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            {t[10]}:{" "}
            <span className="text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text font-extrabold text-xl">€{totalPrice}</span>{" "}
            <span className="text-gray-900 dark:text-white font-semibold">
              ({pluralHours(hours)}{priceNote ? ` — ${priceNote}` : ""})
            </span>
          </p>

          <button
            type="submit"
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold py-3 px-10 rounded-lg hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:text-white hover:shadow-[0_0_40px_rgba(219,39,119,0.9)] active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:text-white active:shadow-[0_0_40px_rgba(219,39,119,0.9)] transition-all duration-500 text-base tracking-wide shadow-lg"
          >
            {t[5]}
          </button>
        </div>

        {!formSubmitted && (
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t[6]}
          </p>
        )}
      </form>

      {successMessageVisible && (
        <p className="mt-4 text-transparent bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text font-extrabold text-lg">
          {t[14]}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
