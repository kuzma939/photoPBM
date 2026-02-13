import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // Redirect old GalleryLocationsPage URLs to new favorite-spots URLs
  if (pathname === '/GalleryLocationsPage') {
    const location = searchParams.get('location');
    
    // Build new URL
    let newPath = '/favorite-spots';
    
    if (location && location !== 'all') {
      // Convert location to slug
      const slug = location
        .toLowerCase()
        .trim()
        .replace(/ñ/g, 'n')
        .replace(/í/g, 'i')
        .replace(/à/g, 'a')
        .replace(/è/g, 'e')
        .replace(/ó/g, 'o')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      newPath = `/favorite-spots/${slug}`;
    }
    
    // 301 Permanent Redirect for SEO
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    url.search = ''; // Remove query parameters
    
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/GalleryLocationsPage'],
};
