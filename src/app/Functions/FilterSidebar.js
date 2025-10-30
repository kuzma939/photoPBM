import FilterSidebar from "./FilterSidebar";
import CategoryFilter from "./TypeFilter";
import LocationFilter from "./LocationFilter";

import { useState } from "react";

export default function GalleryPage() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="flex">
      {/* Sidebar з обома фільтрами */}
      <FilterSidebar>
        {/* Категорія */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Категорія</label>
          <CategoryFilter
            selectedCategory={category}
            onSelectCategory={setCategory}
          />
        </div>

        {/* Локація */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Локація</label>
          <LocationFilter
            selectedLocation={location}
            onSelectLocation={setLocation}
          />
        </div>
      </FilterSidebar>

      {/* Контент праворуч */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Галерея</h1>

        {/* Тут можеш використовувати category і location для фільтрації */}
        {/* Наприклад: */}
        {/* filteredItems.filter(item => (!category || item.category === category) && (!location || item.location === location)) */}
      </main>
    </div>
  );
}
