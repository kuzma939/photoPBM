import React, { useMemo, useState } from "react";
import { validateForm } from "../../utils/validationContactForm";

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
      ? "fixed package"
      : hours > 0
      ? `€${BASE_RATE}/hour (custom)`
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
              placeholder="First name"
              value={formValues.firstName}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formValues.lastName}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
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
            placeholder="Phone number"
            value={formValues.phone}
            onChange={onInputChange}
            className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
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
            placeholder="Email"
            value={formValues.email}
            onChange={onInputChange}
            className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
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
              placeholder="Date"
              value={formValues.bookingDate}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white focus:outline-none focus:border-lime-500"
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
              placeholder="Time"
              value={formValues.bookingTime}
              onChange={onInputChange}
              className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white focus:outline-none focus:border-lime-500"
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
              className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white focus:outline-none focus:border-lime-500"
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
                placeholder="How many hours?"
                value={formValues.customHours}
                onChange={onInputChange}
                className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white focus:outline-none focus:border-lime-500"
              />
            </div>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={formValues.message}
            onChange={onInputChange}
            className="w-full p-3 bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
          />
        </div>

        {/* Price summary */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Total:{" "}
            <span className="text-lime-600 font-bold">€{totalPrice}</span>{" "}
            <span className="text-black dark:text-white">
              ({pluralHours(hours)}{priceNote ? ` — ${priceNote}` : ""})
            </span>
          </p>

          <button
            type="submit"
            className="dark:bg-lime-500 text-white bg-[#3a2719] hover:bg-[#3a271970] font-semibold py-2 px-8 rounded-lg dark:hover:bg-lime-600"
          >
            Send
          </button>
        </div>

        {!formSubmitted && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Thanks for submitting!
          </p>
        )}
      </form>

      {successMessageVisible && (
        <p className="mt-4 text-green-500 font-bold">
          Your request was sent successfully.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
