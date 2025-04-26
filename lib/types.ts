// User types
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: Date
  profileImage?: string
}

// Listing types
export interface Listing {
  id: string
  title: string
  description: string
  price: number
  location: string
  images: string[]
  services: string[]
  age?: number
  height?: string
  nationality?: string
  languages?: string[]
  catersTo?: string[]
  availability?: string
  contactInfo: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  verified: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

// Search types
export interface SearchFilters {
  query?: string
  location?: string
  services?: string[]
  age?: {
    min?: number
    max?: number
  }
  nationality?: string[]
  ethnicity?: string[]
  bodyType?: string[]
  hairColor?: string[]
  breastType?: string[]
  catersTo?: string[]
  placeOfService?: string[]
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 