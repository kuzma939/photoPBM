import React from "react";
import Image from "next/image";

const ProductCard = ({ product, onClick }) => {
  return (
    <article
      className="bg-gray-100 dark:bg-[#0f172a] p-3 sm:p-4 rounded-lg group cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      aria-label={`View image of ${product.name}`}
    >
      {/* Зображення продукту */}
      <figure className="w-full overflow-hidden rounded relative aspect-[3/4]">
        <Image
          src={product.image || `https://via.placeholder.com/300x220?text=${product.name}`}
          alt={product.name || "Product Image"}
          width={300}
          height={400}
          className="w-full h-full object-cover rounded transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <figcaption
          className="absolute inset-0 bg-black dark:bg-[#0f172a] opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded"
          aria-hidden="true"
        ></figcaption>
      </figure>

      {/* Локація під фото */}
      {product.location && (
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 mt-2 text-center sm:text-left">
          {product.location}
        </p>
      
      )}
        {product.type && (
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 text-center sm:text-left">
            {product.type}
          </p>
        )}
    </article>
  );
};

export default ProductCard;
