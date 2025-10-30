"use client";
import React from "react";
import { useLanguage } from "../../Functions/useLanguage";

const Conditions = () => {
  const { translateList } = useLanguage();
  const menuItems = translateList("BookingTerms", "hero");

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 dark:text-white font-sans">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4 border-gray-300 dark:border-gray-600">
        {menuItems[0]}
      </h1>

      {/* Розділ 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-pink-600 dark:text-pink-400">
          {menuItems[1]}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>{menuItems[2]}</li>
          <li>{menuItems[3]}</li>
          <li>{menuItems[4]}</li>
          <li>{menuItems[5]}</li>
        </ul>
      </section>

      {/* Розділ 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
          {menuItems[6]}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>{menuItems[7]}</li>
          <li>{menuItems[8]}</li>
          <li>{menuItems[9]}</li>
        </ul>
      </section>

      {/* Розділ 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
          {menuItems[10]}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>{menuItems[11]}</li>
          <li>{menuItems[12]}</li>
        </ul>
      </section>
    </main>
  );
};

export default Conditions;
