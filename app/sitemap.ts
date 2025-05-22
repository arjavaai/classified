import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skluva.com'

  // Basic pages
  const routes = [
    '',
    '/login',
    '/signup',
    '/create-ad',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Here you would typically also add dynamic routes from your database
  // For example, all listing pages
  // This is just a placeholder - you'd fetch these from your actual data source
  const listingRoutes = [
    { id: '1', title: 'Example Listing' },
    // ... other listings
  ].map(listing => ({
    url: `${baseUrl}/listing/${listing.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...listingRoutes]
} 