"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import ImageCarousel from "@/components/listing-card/ImageCarousel"
import SimpleCarousel from "@/components/listing-card/SimpleCarousel"

// Define the Listing interface
interface Listing {
  id: number
  title: string
  description: string
  age: number
  location: string
  price: number
  image: string
  images?: string[]
  photoCount: number
  isTop: boolean
  state: string
  city: string
  services: string[]
  ethnicity: string
  nationality: string
  bodyType: string
  breastType: string
  hairColor: string
  catersTo: string[]
  placeOfService: string[]
}

// Sample data for demonstration
const sampleListings: Listing[] = [
  {
    id: 1,
    title: "GENUINE Cash in hand payment HIGH PROFILE SERVICE AVAILABLE IN LA",
    description:
      "Call me for HAND PAYMENT ONLY genuine Escorts Services Safe & Secure High Class Services Affordable Rate 100% satisfaction guaranteed",
    age: 21,
    location: "Los Angeles / Beverly Hills",
    price: 150,
    image: "/elegant-gaze.png",
    images: ["/elegant-gaze.png", "/sophisticated-evening.png", "/confident-professional.png"],
    photoCount: 5,
    isTop: true,
    state: "CA",
    city: "los-angeles",
    services: ["Girlfriend experience", "Massage", "Outcall"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Incall", "Outcall"],
  },
  {
    id: 2,
    title: "Elite Companion Services in LA - Cash Payment Only",
    description:
      "High-end companionship service providing elegant, educated escorts for social events and private moments. Genuine photos and professional service guaranteed.",
    age: 24,
    location: "Los Angeles / Santa Monica",
    price: 250,
    image: "/confident-professional.png",
    images: ["/confident-professional.png", "/sapphire-serenity.png", "/sophisticated-evening.png"],
    photoCount: 5,
    isTop: true,
    state: "CA",
    city: "los-angeles",
    services: ["Girlfriend experience", "Dinner dates", "Travel companion", "Events"],
    ethnicity: "Caucasian",
    nationality: "American",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Brown Hair",
    catersTo: ["Men", "Couples"],
    placeOfService: ["Hotel / Motel", "Events and parties"],
  },
  {
    id: 3,
    title: "African Escort - Premium Service",
    description:
      "Exclusive premium service with a beautiful African escort. Discreet and professional service guaranteed.",
    age: 26,
    location: "Los Angeles / Hollywood",
    price: 180,
    image: "/confident-african-professional.png",
    images: ["/confident-african-professional.png", "/sophisticated-evening.png", "/elegant-gaze.png"],
    photoCount: 4,
    isTop: false,
    state: "CA",
    city: "los-angeles",
    services: ["Massage", "Incall", "Outcall"],
    ethnicity: "Ebony",
    nationality: "South African",
    bodyType: "Athletic",
    breastType: "Busty",
    hairColor: "Black Hair",
    catersTo: ["Men", "Women"],
    placeOfService: ["Incall", "Outcall"],
  },
  {
    id: 4,
    title: "High Profile College Girl Available",
    description: "Young, educated college girl available for companionship and more. Genuine service with real photos.",
    age: 22,
    location: "Beverly Hills",
    price: 200,
    image: "/sapphire-serenity.png",
    images: ["/sapphire-serenity.png", "/confident-professional.png", "/elegant-gaze.png"],
    photoCount: 3,
    isTop: false,
    state: "CA",
    city: "los-angeles",
    services: ["Role play", "Girlfriend experience", "Incall"],
    ethnicity: "Asian",
    nationality: "Japanese",
    bodyType: "Slender",
    breastType: "Natural Boobs",
    hairColor: "Black Hair",
    catersTo: ["Men"],
    placeOfService: ["At home", "Incall"],
  },
  {
    id: 5,
    title: "VIP Escort Service in Miami",
    description: "Luxury escort service in Miami. Available for high-end clients and events.",
    age: 25,
    location: "Miami / South Beach",
    price: 300,
    image: "/miami-chic.png",
    images: ["/miami-chic.png", "/sapphire-serenity.png", "/confident-professional.png"],
    photoCount: 6,
    isTop: true,
    state: "FL",
    city: "miami",
    services: ["Travel companion", "Events", "Dinner dates"],
    ethnicity: "Latin",
    nationality: "Brazilian",
    bodyType: "Curvy",
    breastType: "Busty",
    hairColor: "Brown Hair",
    catersTo: ["Men", "Couples"],
    placeOfService: ["Hotel / Motel", "Events and parties"],
  },
  {
    id: 6,
    title: "New York Elite Model Escort",
    description: "Professional model offering exclusive escort services in Manhattan and surrounding areas.",
    age: 27,
    location: "New York / Manhattan",
    price: 350,
    image: "/city-chic-portrait.png",
    images: ["/city-chic-portrait.png", "/elegant-gaze.png", "/confident-professional.png"],
    photoCount: 7,
    isTop: true,
    state: "NY",
    city: "new-york",
    services: ["Events", "Travel companion", "Girlfriend experience"],
    ethnicity: "Caucasian",
    nationality: "Russian",
    bodyType: "Athletic",
    breastType: "Natural Boobs",
    hairColor: "Blond Hair",
    catersTo: ["Men"],
    placeOfService: ["Hotel / Motel", "Outcall"],
  },
]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const state = searchParams.get("state") || ""
  const city = searchParams.get("city") || ""
  const ethnicityParam = searchParams.get("ethnicity") || ""
  const nationalityParam = searchParams.get("nationality") || ""
  const bodyTypeParam = searchParams.get("bodyType") || ""
  const breastTypeParam = searchParams.get("breastType") || ""
  const hairColorParam = searchParams.get("hairColor") || ""
  const ageRangeParam = searchParams.get("ageRange") || ""
  const servicesParam = searchParams.get("services") || ""
  const catersToParam = searchParams.get("catersTo") || ""
  const placeOfServiceParam = searchParams.get("placeOfService") || ""

  const [filteredListings, setFilteredListings] = useState<Listing[]>(sampleListings)

  useEffect(() => {
    // Filter listings based on search parameters
    let results = sampleListings

    // Apply text search filter
    if (query) {
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query.toLowerCase()) ||
          listing.description.toLowerCase().includes(query.toLowerCase()) ||
          listing.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply state filter
    if (state) {
      results = results.filter((listing) => listing.state === state)
    }

    // Apply city filter
    if (city) {
      results = results.filter((listing) => listing.city === city)
    }

    // Apply ethnicity filter
    if (ethnicityParam) {
      const ethnicities = ethnicityParam.split(",")
      results = results.filter((listing) => ethnicities.includes(listing.ethnicity))
    }

    // Apply nationality filter
    if (nationalityParam) {
      const nationalities = nationalityParam.split(",")
      results = results.filter((listing) => nationalities.includes(listing.nationality))
    }

    // Apply body type filter
    if (bodyTypeParam) {
      const bodyTypes = bodyTypeParam.split(",")
      results = results.filter((listing) => bodyTypes.includes(listing.bodyType))
    }

    // Apply breast type filter
    if (breastTypeParam) {
      const breastTypes = breastTypeParam.split(",")
      results = results.filter((listing) => breastTypes.includes(listing.breastType))
    }

    // Apply hair color filter
    if (hairColorParam) {
      const hairColors = hairColorParam.split(",")
      results = results.filter((listing) => hairColors.includes(listing.hairColor))
    }

    // Apply age range filter
    if (ageRangeParam) {
      const ageRanges = ageRangeParam.split(",")
      // This is a simplified implementation - in a real app, you'd need to parse the age ranges
      // and check if the listing's age falls within any of the selected ranges
      if (ageRanges.includes("18-19")) {
        results = results.filter((listing) => listing.age >= 18 && listing.age <= 19)
      } else if (ageRanges.includes("20s")) {
        results = results.filter((listing) => listing.age >= 20 && listing.age <= 29)
      } else if (ageRanges.includes("30s")) {
        results = results.filter((listing) => listing.age >= 30 && listing.age <= 39)
      } else if (ageRanges.includes("40s")) {
        results = results.filter((listing) => listing.age >= 40 && listing.age <= 49)
      } else if (ageRanges.includes("50s")) {
        results = results.filter((listing) => listing.age >= 50 && listing.age <= 59)
      } else if (ageRanges.includes("60+")) {
        results = results.filter((listing) => listing.age >= 60)
      }
    }

    // Apply services filter
    if (servicesParam) {
      const services = servicesParam.split(",")
      results = results.filter((listing) => services.some((service) => listing.services.includes(service)))
    }

    // Apply caters to filter
    if (catersToParam) {
      const catersTo = catersToParam.split(",")
      results = results.filter((listing) => catersTo.some((caterTo) => listing.catersTo.includes(caterTo)))
    }

    // Apply place of service filter
    if (placeOfServiceParam) {
      const placesOfService = placeOfServiceParam.split(",")
      results = results.filter((listing) => placesOfService.some((place) => listing.placeOfService.includes(place)))
    }

    setFilteredListings(results)
  }, [
    query,
    state,
    city,
    ethnicityParam,
    nationalityParam,
    bodyTypeParam,
    breastTypeParam,
    hairColorParam,
    ageRangeParam,
    servicesParam,
    catersToParam,
    placeOfServiceParam,
  ])

  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb text-sm mb-4">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Skluva United States
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <Link href="#" className="text-gray-600 hover:text-primary">
            California Escorts
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <span className="text-accent-blue font-medium">Los Angeles Escorts</span>
        </div>

        {/* Location Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
          {query ? `Search Results for "${query}"` : "Los Angeles Escorts"}
        </h1>

        {/* Search Results Date */}
        <div className="text-sm text-gray-600 mb-4 font-medium">
          {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "long" }).toUpperCase()}
        </div>

        {/* Search Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          {filteredListings.length} {filteredListings.length === 1 ? "result" : "results"} found
        </div>

        {/* Search Results Listings */}
        {filteredListings.length > 0 ? (
          <div className="flex flex-col gap-4 mb-8">
            {filteredListings.map((listing, index) => (
              <Link href={`/listing/${listing.id}`} key={listing.id} className="block no-underline text-black">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex hover:shadow-md transition-shadow">
                  <ImageCarousel 
                    images={listing.images || [listing.image]} 
                    photoCount={listing.photoCount}
                  />
                  <div className="p-4 flex-1">
                    <div className="text-accent-blue font-bold text-base mb-2">{listing.title}</div>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="mr-2 text-gray-400 h-4 w-4" />
                      <span>{listing.age} years</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 text-gray-400 h-4 w-4" />
                      <span>{listing.location}</span>
                      {listing.isTop && (
                        <span className="ml-2 bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[11px] font-semibold">
                          Top
                        </span>
                      )}
                    </div>
                    <div className="text-green-600 font-semibold text-lg mt-2">${listing.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredListings.length > 0 && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center">
              <div className="flex">
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-accent-blue text-white font-bold rounded-md mr-2"
                >
                  1
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-white text-accent-blue border border-gray-200 rounded-md hover:border-accent-blue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
