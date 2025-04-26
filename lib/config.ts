// Application configuration
export const appConfig = {
  name: 'Skluva',
  description: 'A modern escort classified directory with verified escorts and companions',
  url: 'https://skluva.com',
  locale: 'en-US',
  themeColor: '#e91e63',
}

// Social media links
export const socialLinks = {
  facebook: 'https://facebook.com/skluva',
  twitter: 'https://twitter.com/skluva',
  instagram: 'https://instagram.com/skluva',
}

// Contact information
export const contactInfo = {
  email: 'contact@skluva.com',
  phone: '+11234567890',
  formattedPhone: '(123) 456-7890',
  whatsapp: '+11234567890',
}

// Security and verification
export const security = {
  ageVerificationRequired: true,
  cookieConsentRequired: true,
  termsUrl: '/terms',
  privacyUrl: '/privacy-policy',
  cookiePolicyUrl: '/cookie-policy',
}

// API endpoints and configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.skluva.com',
  timeout: 30000, // 30 seconds
  endpoints: {
    listings: '/api/listings',
    auth: '/api/auth',
    search: '/api/search',
    users: '/api/users',
  },
}

// Feature flags
export const features = {
  darkMode: true,
  messaging: true,
  payments: false,
  verification: true,
} 