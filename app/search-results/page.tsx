"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import SearchFilter from "@/components/search-filter"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"

// Sample data for demonstration
const sampleListings = [
  {
    id: 1,
    title: "GENUINE Cash in hand payment HIGH PROFILE SERVICE AVAILABLE IN LA",
    description:
      "Call me for HAND PAYMENT ONLY genuine Escorts Services Safe & Secure High Class Services Affordable Rate 100% satisfaction guaranteed",
    age: 21,
    location: "Los Angeles / Beverly Hills",
    price: 150,
    image: "/elegant-gaze.png",
    photoCount: 5,
    isTop: true,
    state: "CA",
    city: "los-angeles",
    services: ["Girlfriend experience", "Massage", "Outcall"],
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
    photoCount: 5,
    isTop: true,
    state: "CA",
    city: "los-angeles",
    services: ["Girlfriend experience", "Dinner dates", "Travel companion", "Events"],
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
    photoCount: 4,
    isTop: false,
    state: "CA",
    city: "los-angeles",
    services: ["Massage", "Incall", "Outcall"],
  },
  {
    id: 4,
    title: "High Profile College Girl Available",
    description: "Young, educated college girl available for companionship and more. Genuine service with real photos.",
    age: 22,
    location: "Beverly Hills",
    price: 200,
    image: "/sapphire-serenity.png",
    photoCount: 3,
    isTop: false,
    state: "CA",
    city: "los-angeles",
    services: ["Role play", "Girlfriend experience", "Incall"],
  },
  {
    id: 5,
    title: "VIP Escort Service in Miami",
    description: "Luxury escort service in Miami. Available for high-end clients and events.",
    age: 25,
    location: "Miami / South Beach",
    price: 300,
    image: "/miami-chic.png",
    photoCount: 6,
    isTop: true,
    state: "FL",
    city: "miami",
    services: ["Travel companion", "Events", "Dinner dates"],
  },
  {
    id: 6,
    title: "New York Elite Model Escort",
    description: "Professional model offering exclusive escort services in Manhattan and surrounding areas.",
    age: 27,
    location: "New York / Manhattan",
    price: 350,
    image: "/city-chic-portrait.png",
    photoCount: 7,
    isTop: true,
    state: "NY",
    city: "new-york",
    services: ["Events", "Travel companion", "Girlfriend experience"],
  },
]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [filteredListings, setFilteredListings] = useState(sampleListings)
  const [activeFilters, setActiveFilters] = useState<any>({})

  useEffect(() => {
    // Filter listings based on search query
    let results = sampleListings

    if (query) {
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query.toLowerCase()) ||
          listing.description.toLowerCase().includes(query.toLowerCase()) ||
          listing.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    setFilteredListings(results)
  }, [query])

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters)

    let results = sampleListings

    // Apply search query filter
    if (query) {
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query.toLowerCase()) ||
          listing.description.toLowerCase().includes(query.toLowerCase()) ||
          listing.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply city filter
    if (filters.city) {
      results = results.filter((listing) => listing.city === filters.city)
    }

    // Apply state filter
    if (filters.state) {
      results = results.filter((listing) => listing.state === filters.state)
    }

    // Apply age range filter
    if (filters.ageRange) {
      results = results.filter((listing) => listing.age >= filters.ageRange[0] && listing.age <= filters.ageRange[1])
    }

    // Apply price range filter
    if (filters.priceRange) {
      results = results.filter(
        (listing) => listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1],
      )
    }

    // Apply services filter
    if (filters.services && filters.services.length > 0) {
      results = results.filter((listing) =>
        filters.services.some((service: string) => listing.services.includes(service)),
      )
    }

    setFilteredListings(results)
  }

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

        {/* Search Filters */}
        <SearchFilter onApplyFilters={handleApplyFilters} />

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
            {filteredListings.map((listing) => (
              <Link href={`/listing/${listing.id}`} key={listing.id} className="block no-underline text-black">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex hover:shadow-md transition-shadow">
                  <div className="w-[120px] min-w-[120px] h-[140px] relative">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt="Escort"
                      width={634}
                      height={634}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-1.5 py-0.5 rounded text-xs font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block w-3 h-3 mr-1 text-primary"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>{" "}
                      {listing.photoCount}
                    </div>
                  </div>
                  <div className="p-3 flex-1">
                    <div className="text-accent-blue font-bold text-base mb-1">{listing.title}</div>
                    <p className="text-gray-700 text-xs mb-2">{listing.description}</p>
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <Calendar className="mr-2 text-gray-400 h-3 w-3" />
                      <span>{listing.age} years</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="mr-2 text-gray-400 h-3 w-3" />
                      <span>{listing.location}</span>
                      {listing.isTop && (
                        <span className="ml-2 bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                          Top
                        </span>
                      )}
                    </div>
                    <div className="text-green-600 font-semibold text-sm mt-1">${listing.price}</div>
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
