// Demo Ads Data for the application with various attributes for filtering
import { usaStatesAndCities } from './data';
import { demoListings, getFilteredListings as filterListings } from "./demo-data";

// Define the Ad interface
export interface Ad {
  id: number;
  title: string;
  description: string;
  age: number;
  location: {
    state: string;
    stateAbbreviation: string;
    city: string;
    area?: string;
  };
  price: number;
  image: string;
  images: string[];
  photoCount: number;
  isTop: boolean;
  isVerified: boolean;
  postedDaysAgo: number;
  viewCount: number;
  services: string[];
  ethnicity: string;
  nationality: string;
  bodyType: string;
  breastType: string;
  hairColor: string;
  catersTo: string[];
  placeOfService: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

// Filter options matching the UI
export const ethnicity = [
  "Arabian", 
  "Asian", 
  "Ebony", 
  "Caucasian", 
  "Hispanic", 
  "Indian", 
  "Latin", 
  "Mixed race", 
  "Others"
];

export const nationality = [
  "American",
  "Brazilian",
  "British",
  "Canadian",
  "Chinese",
  "Colombian",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kenyan",
  "Korean",
  "Mexican",
  "Nigerian",
  "Russian",
  "South African",
  "Spanish",
  "Thai",
  "Ukrainian",
  "Venezuelan"
];

export const bodyType = [
  "Slender",
  "Athletic",
  "Curvy",
  "BBW"
];

export const breastType = [
  "Natural Boobs",
  "Busty"
];

export const hairColor = [
  "Black Hair",
  "Blond Hair",
  "Brown Hair",
  "Red Hair",
  "Other"
];

export const services = [
  "Girlfriend experience",
  "Massage",
  "Incall",
  "Outcall",
  "Dinner dates",
  "Travel companion",
  "Events",
  "Role play",
  "BDSM",
  "Fetish friendly",
  "Couples"
];

export const catersTo = [
  "Men",
  "Women",
  "Couples",
  "Everyone"
];

export const placeOfService = [
  "Incall",
  "Outcall",
  "Hotel / Motel",
  "At home",
  "Events and parties",
  "Travel"
];

// Generate 50 sample ads with diverse attributes for all filters
export const sampleAds: Ad[] = [
  {
    id: 1,
    title: "GENUINE Cash in hand payment HIGH PROFILE SERVICE AVAILABLE IN LA",
    description: "Call me for HAND PAYMENT ONLY genuine Escorts Services Safe & Secure High Class Services Affordable Rate 100% satisfaction guaranteed",
    age: 21,
    location: {
      state: "California",
      stateAbbreviation: "CA",
      city: "Los Angeles",
      area: "Beverly Hills"
    },
    price: 150,
    image: "/elegant-gaze.png",
    images: ["/elegant-gaze.png", "/sophisticated-evening.png", "/confident-professional.png"],
    photoCount: 5,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 2,
    viewCount: 321,
    services: ["Girlfriend experience", "Massage", "Outcall"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Incall", "Outcall"],
    contactInfo: {
      phone: "+1 (323) 555-1234",
      whatsapp: "+1 (323) 555-1234"
    }
  },
  {
    id: 2,
    title: "Elite Companion Services in LA - Cash Payment Only",
    description: "High-end companionship service providing elegant, educated escorts for social events and private moments. Genuine photos and professional service guaranteed.",
    age: 24,
    location: {
      state: "California",
      stateAbbreviation: "CA",
      city: "Los Angeles",
      area: "Santa Monica"
    },
    price: 250,
    image: "/confident-professional.png",
    images: ["/confident-professional.png", "/sapphire-serenity.png", "/sophisticated-evening.png"],
    photoCount: 5,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 1,
    viewCount: 452,
    services: ["Girlfriend experience", "Dinner dates", "Travel companion", "Events"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Brown Hair",
    catersTo: ["Men", "Couples"],
    placeOfService: ["Hotel / Motel", "Events and parties"],
    contactInfo: {
      email: "elitecompanion@example.com",
      whatsapp: "+1 (310) 555-6789"
    }
  },
  {
    id: 3,
    title: "African Escort - Premium Service",
    description: "Exclusive premium service with a beautiful African escort. Discreet and professional service guaranteed.",
    age: 26,
    location: {
      state: "California",
      stateAbbreviation: "CA",
      city: "Los Angeles",
      area: "Hollywood"
    },
    price: 180,
    image: "/confident-african-professional.png",
    images: ["/confident-african-professional.png", "/sophisticated-evening.png", "/elegant-gaze.png"],
    photoCount: 4,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 3,
    viewCount: 287,
    services: ["Massage", "Incall", "Outcall"],
    ethnicity: "Ebony",
    nationality: "South African",
    bodyType: "Athletic",
    breastType: "Busty",
    hairColor: "Black Hair",
    catersTo: ["Men", "Women"],
    placeOfService: ["Incall", "Outcall"],
    contactInfo: {
      phone: "+1 (213) 555-2345",
      email: "premium@example.com"
    }
  },
  {
    id: 4,
    title: "High Profile College Girl Available",
    description: "Young, educated college girl available for companionship and more. Genuine service with real photos.",
    age: 22,
    location: {
      state: "California",
      stateAbbreviation: "CA",
      city: "Los Angeles",
      area: "Beverly Hills"
    },
    price: 200,
    image: "/sapphire-serenity.png",
    images: ["/sapphire-serenity.png", "/confident-professional.png", "/elegant-gaze.png"],
    photoCount: 3,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 5,
    viewCount: 176,
    services: ["Role play", "Girlfriend experience", "Incall"],
    ethnicity: "Asian",
    nationality: "Japanese",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men"],
    placeOfService: ["At home", "Incall"],
    contactInfo: {
      whatsapp: "+1 (424) 555-3456"
    }
  },
  {
    id: 5,
    title: "VIP Escort Service in Miami",
    description: "Luxury escort service in Miami. Available for high-end clients and events.",
    age: 25,
    location: {
      state: "Florida",
      stateAbbreviation: "FL",
      city: "Miami",
      area: "South Beach"
    },
    price: 300,
    image: "/miami-chic.png",
    images: ["/miami-chic.png", "/sapphire-serenity.png", "/confident-professional.png"],
    photoCount: 6,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 1,
    viewCount: 532,
    services: ["Travel companion", "Events", "Dinner dates"],
    ethnicity: "Latin",
    nationality: "Brazilian",
    bodyType: "Curvy",
    breastType: "Busty",
    hairColor: "Brown Hair",
    catersTo: ["Men", "Couples"],
    placeOfService: ["Hotel / Motel", "Events and parties"],
    contactInfo: {
      phone: "+1 (305) 555-7890",
      email: "miamivip@example.com",
      whatsapp: "+1 (305) 555-7890"
    }
  },
  {
    id: 6,
    title: "New York Elite Model Escort",
    description: "Professional model offering exclusive escort services in Manhattan and surrounding areas.",
    age: 27,
    location: {
      state: "New York",
      stateAbbreviation: "NY",
      city: "New York City",
      area: "Manhattan"
    },
    price: 350,
    image: "/city-chic-portrait.png",
    images: ["/city-chic-portrait.png", "/elegant-gaze.png", "/confident-professional.png"],
    photoCount: 7,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 2,
    viewCount: 489,
    services: ["Events", "Travel companion", "Girlfriend experience"],
    ethnicity: "Caucasian",
    nationality: "Russian",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall"],
    contactInfo: {
      email: "nycmodel@example.com"
    }
  },
  {
    id: 7,
    title: "Indian Beauty Available for Upscale Gentlemen",
    description: "Sophisticated Indian companion with class and elegance. University educated and perfect for all occasions.",
    age: 23,
    location: {
      state: "Texas",
      stateAbbreviation: "TX",
      city: "Dallas",
      area: "Downtown"
    },
    price: 220,
    image: "/elegant-indian-beauty.png",
    images: ["/elegant-indian-beauty.png", "/sophisticated-evening.png", "/confident-professional.png"],
    photoCount: 4,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 3,
    viewCount: 246,
    services: ["Massage", "Dinner dates", "Girlfriend experience"],
    ethnicity: "Indian",
    nationality: "Indian",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men"],
    placeOfService: ["Incall", "Hotel / Motel"],
    contactInfo: {
      phone: "+1 (214) 555-5678",
      whatsapp: "+1 (214) 555-5678"
    }
  },
  {
    id: 8,
    title: "Arabian Princess - VIP Service Only",
    description: "Exclusive Arabian escort for gentlemen with refined taste. Limited availability, book in advance.",
    age: 26,
    location: {
      state: "Nevada",
      stateAbbreviation: "NV",
      city: "Las Vegas",
      area: "The Strip"
    },
    price: 400,
    image: "/arabian-elegance.png",
    images: ["/arabian-elegance.png", "/desert-beauty.png", "/exotic-profile.png"],
    photoCount: 5,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 4,
    viewCount: 387,
    services: ["Travel companion", "Events", "Dinner dates", "Girlfriend experience"],
    ethnicity: "Arabian",
    nationality: "American",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Events and parties"],
    contactInfo: {
      email: "arabian.princess@example.com",
      whatsapp: "+1 (702) 555-9012"
    }
  },
  {
    id: 9,
    title: "Curvy BBW Companion in Atlanta",
    description: "Voluptuous and confident BBW escort offering premium services in the Atlanta area. Body positive and accepting.",
    age: 29,
    location: {
      state: "Georgia",
      stateAbbreviation: "GA",
      city: "Atlanta",
      area: "Buckhead"
    },
    price: 180,
    image: "/confident-curves.png",
    images: ["/confident-curves.png", "/bbw-beauty.png", "/curvaceous-elegance.png"],
    photoCount: 6,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 2,
    viewCount: 312,
    services: ["Massage", "Girlfriend experience", "Role play", "BDSM"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "BBW",
    breastType: "Busty",
    hairColor: "Red Hair",
    catersTo: ["Men", "Women", "Couples"],
    placeOfService: ["Incall", "Outcall"],
    contactInfo: {
      phone: "+1 (404) 555-3456"
    }
  },
  {
    id: 10,
    title: "Latina Bombshell - Boston Elite Service",
    description: "Fiery Latina offering unforgettable experiences in Boston. Passionate, fun and sophisticated company.",
    age: 24,
    location: {
      state: "Massachusetts",
      stateAbbreviation: "MA",
      city: "Boston",
      area: "Back Bay"
    },
    price: 280,
    image: "/latina-glamour.png",
    images: ["/latina-glamour.png", "/passionate-portrait.png", "/confident-professional.png"],
    photoCount: 8,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 1,
    viewCount: 367,
    services: ["Girlfriend experience", "Dinner dates", "Events", "Travel companion"],
    ethnicity: "Hispanic",
    nationality: "Colombian",
    bodyType: "Curvy",
    breastType: "Busty",
    hairColor: "Brown Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall", "Events and parties"],
    contactInfo: {
      email: "latina.boston@example.com",
      whatsapp: "+1 (617) 555-7890"
    }
  },
  {
    id: 11,
    title: "Mixed Race Beauty - Chicago Premium Escort",
    description: "Exotic mixed heritage escort with striking features. Perfect company for discerning gentlemen in Chicago.",
    age: 23,
    location: {
      state: "Illinois",
      stateAbbreviation: "IL",
      city: "Chicago",
      area: "Gold Coast"
    },
    price: 250,
    image: "/mixed-elegance.png",
    images: ["/mixed-elegance.png", "/sophisticated-evening.png", "/confident-model.png"],
    photoCount: 5,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 3,
    viewCount: 278,
    services: ["Girlfriend experience", "Dinner dates", "Travel companion", "Fetish friendly"],
    ethnicity: "Mixed race",
    nationality: "American",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Brown Hair",
    catersTo: ["Men", "Couples"],
    placeOfService: ["Incall", "Hotel / Motel", "Events and parties"],
    contactInfo: {
      phone: "+1 (312) 555-2345",
      email: "chicago.mixed@example.com"
    }
  },
  {
    id: 12,
    title: "Kenyan Model - First Time in Houston",
    description: "International African model visiting Houston for a limited time. Book your exclusive time with this exotic beauty.",
    age: 25,
    location: {
      state: "Texas",
      stateAbbreviation: "TX",
      city: "Houston",
      area: "Galleria"
    },
    price: 300,
    image: "/kenyan-beauty.png",
    images: ["/kenyan-beauty.png", "/african-model.png", "/elegant-pose.png"],
    photoCount: 4,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 1,
    viewCount: 422,
    services: ["Massage", "Travel companion", "Dinner dates", "Events"],
    ethnicity: "Ebony",
    nationality: "Kenyan",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall"],
    contactInfo: {
      phone: "+1 (713) 555-6789",
      whatsapp: "+1 (713) 555-6789"
    }
  },
  {
    id: 13,
    title: "Asian Petite Companion - Seattle GFE",
    description: "Sweet and petite Asian escort offering the ultimate girlfriend experience in Seattle. Kind, attentive and adventurous.",
    age: 22,
    location: {
      state: "Washington",
      stateAbbreviation: "WA",
      city: "Seattle",
      area: "Downtown"
    },
    price: 200,
    image: "/asian-elegance.png",
    images: ["/asian-elegance.png", "/petite-beauty.png", "/sweet-smile.png"],
    photoCount: 6,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 2,
    viewCount: 267,
    services: ["Girlfriend experience", "Massage", "Role play", "Incall"],
    ethnicity: "Asian",
    nationality: "Korean",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men"],
    placeOfService: ["Incall", "At home"],
    contactInfo: {
      email: "asian.seattle@example.com"
    }
  },
  {
    id: 14,
    title: "European Model - Philadelphia Exclusive",
    description: "Sophisticated European escort with class and elegance. Limited availability in Philadelphia area.",
    age: 27,
    location: {
      state: "Pennsylvania",
      stateAbbreviation: "PA",
      city: "Philadelphia",
      area: "Rittenhouse Square"
    },
    price: 350,
    image: "/european-elegance.png",
    images: ["/european-elegance.png", "/sophisticated-evening.png", "/confident-professional.png"],
    photoCount: 7,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 1,
    viewCount: 356,
    services: ["Events", "Travel companion", "Dinner dates", "Girlfriend experience"],
    ethnicity: "Caucasian",
    nationality: "French",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall", "Events and parties"],
    contactInfo: {
      phone: "+1 (215) 555-1234",
      email: "french.model@example.com",
      whatsapp: "+1 (215) 555-1234"
    }
  },
  {
    id: 15,
    title: "Russian Beauty - Phoenix VIP Service",
    description: "Elegant Russian companion available for high-end clients in Phoenix. Sophisticated and educated.",
    age: 26,
    location: {
      state: "Arizona",
      stateAbbreviation: "AZ",
      city: "Phoenix",
      area: "Biltmore"
    },
    price: 280,
    image: "/russian-model.png",
    images: ["/russian-model.png", "/elegant-beauty.png", "/sophisticated-pose.png"],
    photoCount: 5,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 3,
    viewCount: 298,
    services: ["Travel companion", "Dinner dates", "Events", "Girlfriend experience"],
    ethnicity: "Caucasian",
    nationality: "Russian",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall", "Events and parties"],
    contactInfo: {
      whatsapp: "+1 (602) 555-9876"
    }
  },
  {
    id: 16,
    title: "Busty Brunette - New Orleans Experience",
    description: "Voluptuous and friendly companion available in New Orleans. Create unforgettable moments together.",
    age: 24,
    location: {
      state: "Louisiana",
      stateAbbreviation: "LA",
      city: "New Orleans",
      area: "French Quarter"
    },
    price: 220,
    image: "/busty-brunette.png",
    images: ["/busty-brunette.png", "/voluptuous-pose.png", "/friendly-smile.png"],
    photoCount: 6,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 2,
    viewCount: 312,
    services: ["Massage", "Girlfriend experience", "Role play", "Incall"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "Curvy",
    breastType: "Busty",
    hairColor: "Brown Hair",
    catersTo: ["Men"],
    placeOfService: ["Incall", "Outcall", "Hotel / Motel"],
    contactInfo: {
      phone: "+1 (504) 555-5432",
      email: "nola.busty@example.com"
    }
  },
  {
    id: 17,
    title: "Exotic Thai Companion - Denver VIP",
    description: "Authentic Thai massage therapist and escort offering premium services in Denver. Exotic beauty with a sweet personality.",
    age: 23,
    location: {
      state: "Colorado",
      stateAbbreviation: "CO",
      city: "Denver",
      area: "Downtown"
    },
    price: 250,
    image: "/thai-exotic.png",
    images: ["/thai-exotic.png", "/asian-elegance.png", "/sweet-smile.png"],
    photoCount: 5,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 4,
    viewCount: 278,
    services: ["Massage", "Girlfriend experience", "Incall", "Outcall"],
    ethnicity: "Asian",
    nationality: "Thai",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men", "Women"],
    placeOfService: ["Incall", "Outcall", "Hotel / Motel"],
    contactInfo: {
      phone: "+1 (303) 555-8765",
      whatsapp: "+1 (303) 555-8765"
    }
  },
  {
    id: 18,
    title: "BBW Queen - Detroit Exclusive",
    description: "Confident and curvy BBW escort in Detroit. Body positive and ready to provide unforgettable experiences.",
    age: 28,
    location: {
      state: "Michigan",
      stateAbbreviation: "MI",
      city: "Detroit",
      area: "Downtown"
    },
    price: 180,
    image: "/bbw-beauty.png",
    images: ["/bbw-beauty.png", "/confident-curves.png", "/voluptuous-pose.png"],
    photoCount: 4,
    isTop: false,
    isVerified: true,
    postedDaysAgo: 3,
    viewCount: 198,
    services: ["Massage", "Role play", "BDSM", "Fetish friendly"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "BBW",
    breastType: "Busty",
    hairColor: "Brown Hair",
    catersTo: ["Men", "Women", "Couples"],
    placeOfService: ["Incall", "Outcall"],
    contactInfo: {
      email: "detroit.bbw@example.com"
    }
  },
  {
    id: 19,
    title: "Brazilian Bombshell - San Diego Elite",
    description: "Passionate Brazilian escort with a vibrant personality in San Diego. The ultimate South American experience.",
    age: 25,
    location: {
      state: "California",
      stateAbbreviation: "CA",
      city: "San Diego",
      area: "Gaslamp Quarter"
    },
    price: 300,
    image: "/brazilian-beauty.png",
    images: ["/brazilian-beauty.png", "/latina-glamour.png", "/passionate-pose.png"],
    photoCount: 7,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 1,
    viewCount: 345,
    services: ["Girlfriend experience", "Dinner dates", "Travel companion", "Events"],
    ethnicity: "Latin",
    nationality: "Brazilian",
    bodyType: "Athletic",
    breastType: "Busty",
    hairColor: "Brown Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall", "Events and parties"],
    contactInfo: {
      phone: "+1 (619) 555-3210",
      whatsapp: "+1 (619) 555-3210"
    }
  },
  {
    id: 20,
    title: "Ukrainian Model - Nashville Experience",
    description: "European elegance meets Southern charm. Ukrainian escort now available in Nashville for select gentlemen.",
    age: 24,
    location: {
      state: "Tennessee",
      stateAbbreviation: "TN",
      city: "Nashville",
      area: "Downtown"
    },
    price: 280,
    image: "/ukrainian-elegance.png",
    images: ["/ukrainian-elegance.png", "/european-beauty.png", "/elegant-pose.png"],
    photoCount: 5,
    isTop: true,
    isVerified: true,
    postedDaysAgo: 2,
    viewCount: 287,
    services: ["Travel companion", "Dinner dates", "Events", "Girlfriend experience"],
    ethnicity: "Caucasian",
    nationality: "Ukrainian",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall", "Events and parties"],
    contactInfo: {
      phone: "+1 (615) 555-9870",
      email: "ukrainian.nashville@example.com" 
    }
  },
];

// exporting the sample ads
export default sampleAds;

// Export the demo listings as sample data
export const adsData = demoListings;

// Helper functions to get ads by criteria
export const getAdsByState = (stateAbbreviation: string): Ad[] => {
  return sampleAds.filter(ad => ad.location.stateAbbreviation === stateAbbreviation);
};

export const getAdsByCity = (citySlug: string): Ad[] => {
  return sampleAds.filter(ad => ad.location.city.toLowerCase().replace(/\s+/g, '-') === citySlug);
};

// Export a function to filter ads based on search criteria
export const getFilteredAds = (filters: any) => {
  return filterListings(filters);
}; 