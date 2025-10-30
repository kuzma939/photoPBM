// src/Functions/TypeFilter.jsx
"use client";

export default function TypeFilter({ selectedType, onSelectType }) {
  const types = ["Tout", "Famille", "Histoire d'amour", "Mariage", "Portrait"];

  return (
    <select
      value={selectedType}
      onChange={(e) => onSelectType(e.target.value)}
      className="w-full p-2 rounded border border-gray-400 dark:bg-gray-800 dark:text-white"
    >
      {types.map((type) => (
        <option key={type} value={type === "Tout" ? "" : type}>
          {type}
        </option>
      ))}
    </select>
  );
}
