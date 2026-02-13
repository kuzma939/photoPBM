// pages/api/sendEmail.js
import nodemailer from "nodemailer";
import { escape } from "lodash-es";

const BRAND_NAME = "Pic Best Moments";
const BRAND_FROM = `"${BRAND_NAME}" <${process.env.EMAIL_USER}>`;
const ADMIN_EMAIL = "photographbusiness01@gmail.com";

// Package pricing (EUR)
const PRICE_TABLE = {
  "0.5": 75,
  "1": 150,
  "1.5": 200,
  "2": 250,
  "3": 350,
};
const BASE_RATE = 150; // for "custom" or non-standard durations

function getTotalPrice(hours) {
  if (!hours || hours <= 0) return 0;
  const key = String(hours);
  if (PRICE_TABLE[key] != null) return PRICE_TABLE[key];
  return Math.round(hours * BASE_RATE);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // --- 1) FORM DATA ---
  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    bookingDate,     // YYYY-MM-DD
    bookingTime,     // HH:MM
    durationOption,  // "0.5", "1", "1.5", "2", "3", or "custom"
    customHours,     // if "custom"
  } = req.body || {};

  // --- 2) SAFE VALUES FOR HTML ---
  const safeFirstName = escape(firstName || "Client");
  const safeLastName  = escape(lastName || "");
  const safeEmail     = escape(email || "unknown");
  const safePhone     = escape(phone || "Not provided");
  const safeMessage   = escape(message || "No message provided");
  const safeDate      = escape(bookingDate || "Not specified");
  const safeTime      = escape(bookingTime || "Not specified");

  // --- 3) DURATION & PRICE CALC (EUR) ---
  const rawHours =
    durationOption === "custom" ? (customHours ?? "") : (durationOption ?? "");
  const hours = Math.max(0, parseFloat(rawHours) || 0);
  const totalPrice = getTotalPrice(hours);

  const safeDuration =
    durationOption === "custom"
      ? escape(`${customHours || "?"} h`)
      : escape(`${durationOption || "?"} h`);

  // Якщо стандартний пакет — показуємо «fixed package», інакше — €/hour
  const priceNote =
    PRICE_TABLE[String(hours)] != null
      ? "fixed package"
      : hours > 0
      ? `€${BASE_RATE}/hour (custom)`
      : "";

  const safeTotal =
    hours > 0 ? escape(`€${totalPrice}${priceNote ? ` — ${priceNote}` : ""}`) : "to be calculated";

  // --- 4) EMAIL STYLES ---
  const styles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; padding: 16px; color: #333; }
      img { max-width: 300px; border-radius: 8px; }
      .highlight { font-weight: bold; color: #4caf50; }
      .details-list { list-style: none; padding: 0; }
      .details-list li { margin-bottom: 8px; }
      hr { border: none; border-top: 1px solid #e5e7eb; margin: 16px 0; }
    </style>
  `;

  // --- 5) BOOKING INFO BLOCK ---
  const bookingBlock = `
    <hr />
    <h3>Booking Details</h3>
    <ul class="details-list">
      <li><strong>Date:</strong> ${safeDate}</li>
      <li><strong>Time:</strong> ${safeTime}</li>
      <li><strong>Duration:</strong> ${safeDuration}</li>
      <li><strong>Estimated total:</strong> ${safeTotal}</li>
    </ul>
  `;

  // --- 6) TRANSPORT (Gmail SMTP) ---
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
    tls: {
      // only for local dev; remove on production
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();

    // --- 7) EMAIL TO ADMIN ---
    await transporter.sendMail({
      from: BRAND_FROM,
      to: ADMIN_EMAIL,
      replyTo: email || undefined,
      subject: `New Booking — ${bookingDate || "Date?"} ${bookingTime || ""} — ${firstName || ""} ${lastName || ""}`,
      html: `
        <!DOCTYPE html><html lang="en"><head>
          <meta charset="UTF-8" />
          ${styles}
        </head><body>
          <h2>New booking from <span class="highlight">${safeFirstName} ${safeLastName}</span></h2>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Message:</strong> ${safeMessage}</p>
          ${bookingBlock}
          <hr />
          <p>This is an automatic notification from the ${BRAND_NAME} website.</p>
        </body></html>
      `,
    });

    // --- 8) EMAIL TO CLIENT ---
    await transporter.sendMail({
      from: BRAND_FROM,
      to: email || "no-reply@example.com",
      subject: "Your booking request has been received!",
      html: `
        <!DOCTYPE html><html lang="en"><head>
          <meta charset="UTF-8" />
          ${styles}
        </head><body>
          <h2>Hello <span class="highlight">${safeFirstName} ${safeLastName}</span>,</h2>
          <p>Thank you for your booking request at <strong>${BRAND_NAME}</strong>.</p>
          ${bookingBlock}
          <p>Our manager will contact you soon at the phone number you provided: <strong>${safePhone}</strong>.</p>
          <p>If you have any questions, simply reply to this email.</p>
          <hr />
          <p>Best regards,<br />${BRAND_NAME} — Barcelona</p>
        </body></html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent to admin and client!",
    });
  } catch (error) {
    console.error("SENDMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Error sending email",
      code: error?.code,
    });
  }
}
