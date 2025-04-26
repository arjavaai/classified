// Site metadata
export const SITE_NAME = "Skluva"
export const SITE_URL = "https://skluva.com"
export const SITE_DESCRIPTION = "A modern escort classified directory with verified escorts and companions"

// Navigation
export const MAIN_NAVIGATION = [
  { title: "Home", href: "/" },
  { title: "Search", href: "/search-results" },
  { title: "Create Ad", href: "/create-ad" },
  { title: "Login", href: "/login" },
  { title: "Signup", href: "/signup" },
]

// Footer Navigation
export const FOOTER_LINKS = {
  legal: [
    { title: "Terms of Service", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Cookie Policy", href: "/cookie-policy" },
  ],
  categories: [
    { title: "Escorts", href: "/search-results?category=escorts" },
    { title: "Massage", href: "/search-results?category=massage" },
    { title: "Companions", href: "/search-results?category=companions" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/faq" },
  ],
}

// Age verification
export const AGE_VERIFICATION_KEY = "skluva-age-verified"

// Cookie consent
export const COOKIE_CONSENT_KEY = "skluva-cookie-consent"

// API endpoints (if applicable)
export const API_ENDPOINTS = {
  listings: "/api/listings",
  auth: "/api/auth",
  search: "/api/search",
} 