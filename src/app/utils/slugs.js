/**
 * Utility functions for converting location names to SEO-friendly slugs
 */

/**
 * Convert location name to URL-friendly slug
 * @param {string} location - Location name (e.g., "Gothic Quarter")
 * @returns {string} URL slug (e.g., "gothic-quarter")
 */
export const locationToSlug = (location) => {
  if (!location) return '';
  
  return location
    .toLowerCase()
    .trim()
    // Replace Spanish/Catalan characters
    .replace(/ñ/g, 'n')
    .replace(/í/g, 'i')
    .replace(/à/g, 'a')
    .replace(/è/g, 'e')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ï/g, 'i')
    .replace(/ü/g, 'u')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters
    .replace(/[^a-z0-9-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
};

/**
 * Convert slug back to location name (for lookup)
 * @param {string} slug - URL slug
 * @param {Array} locations - Array of location objects
 * @returns {Object|null} Location object or null if not found
 */
export const slugToLocation = (slug, locations) => {
  if (!slug || !locations) return null;
  
  return locations.find(loc => locationToSlug(loc.location) === slug);
};

/**
 * Get all location slugs (useful for static generation)
 * @param {Array} locations - Array of location objects
 * @returns {Array} Array of slug strings
 */
export const getAllLocationSlugs = (locations) => {
  if (!locations) return [];
  
  return locations.map(loc => locationToSlug(loc.location));
};

/**
 * Generate location URL path
 * @param {string} location - Location name
 * @returns {string} Full URL path
 */
export const getLocationUrl = (location) => {
  if (!location || location === 'all') {
    return '/favorite-spots';
  }
  
  const slug = locationToSlug(location);
  return `/favorite-spots/${slug}`;
};

export default {
  locationToSlug,
  slugToLocation,
  getAllLocationSlugs,
  getLocationUrl,
};
