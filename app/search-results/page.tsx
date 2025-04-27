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
import { getFilteredListings, EscortListing } from "@/lib/demo-data"
import { getAdUrl } from "@/lib/route-utils"

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

  const [filteredListings, setFilteredListings] = useState<EscortListing[]>([])

  useEffect(() => {
    // Parse the parameters
    const ethnicity = ethnicityParam ? ethnicityParam.split(",") : []
    const nationality = nationalityParam ? nationalityParam.split(",") : []
    const bodyType = bodyTypeParam ? bodyTypeParam.split(",") : []
    const breastType = breastTypeParam ? breastTypeParam.split(",") : []
    const hairColor = hairColorParam ? hairColorParam.split(",") : []
    const ageRanges = ageRangeParam ? ageRangeParam.split(",") : []
    const services = servicesParam ? servicesParam.split(",") : []
    const catersTo = catersToParam ? catersToParam.split(",") : []
    const placeOfService = placeOfServiceParam ? placeOfServiceParam.split(",") : []
    
    // Parse age ranges and get min/max values
    let minAge: number | undefined = undefined
    let maxAge: number | undefined = undefined
    
    if (ageRanges.length > 0) {
      ageRanges.forEach(range => {
        if (range === "18-19") {
          minAge = minAge !== undefined ? Math.min(minAge, 18) : 18
          maxAge = maxAge !== undefined ? Math.max(maxAge, 19) : 19
        } else if (range === "20s") {
          minAge = minAge !== undefined ? Math.min(minAge, 20) : 20
          maxAge = maxAge !== undefined ? Math.max(maxAge, 29) : 29
        } else if (range === "30s") {
          minAge = minAge !== undefined ? Math.min(minAge, 30) : 30
          maxAge = maxAge !== undefined ? Math.max(maxAge, 39) : 39
        } else if (range === "40s") {
          minAge = minAge !== undefined ? Math.min(minAge, 40) : 40
          maxAge = maxAge !== undefined ? Math.max(maxAge, 49) : 49
        } else if (range === "50s") {
          minAge = minAge !== undefined ? Math.min(minAge, 50) : 50
          maxAge = maxAge !== undefined ? Math.max(maxAge, 59) : 59
        } else if (range === "60+") {
          minAge = minAge !== undefined ? Math.min(minAge, 60) : 60
          maxAge = maxAge !== undefined ? Math.max(maxAge, 100) : 100
        }
      })
    }
    
    // Use the getFilteredListings function
    const results = getFilteredListings({
      query,
      state,
      city,
      ethnicity,
      nationality,
      bodyType,
      breastType,
      hairColor,
      minAge,
      maxAge,
      services,
      catersTo,
      placeOfService
    })
    
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
        <div className="breadcrumb text-sm mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Skluva United States
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <Link href="#" className="text-gray-600 hover:text-primary">
            {state ? `${state} Escorts` : "All States"}
          </Link>
          {city && (
            <>
              <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
              <span className="text-accent-blue font-medium">{city} Escorts</span>
            </>
          )}
        </div>

        {/* Location Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
          {query ? `Search Results for "${query}"` : (city ? `${city} Escorts` : (state ? `${state} Escorts` : "All Escorts"))}
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
          <div className="flex flex-col gap-4 mb-8 overflow-hidden">
            {filteredListings.map((listing) => (
              <Link href={getAdUrl(listing.title, listing.id)} key={listing.id} className="block no-underline text-black">
                <div className="bg-white rounded-xl border-2 border-accent-blue/50 shadow-sm overflow-hidden flex flex-row hover:shadow-md transition-shadow h-[220px]">
                  <ImageCarousel 
                    images={listing.images || [listing.image]} 
                    photoCount={listing.photoCount}
                  />
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-accent-blue font-bold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-3 leading-tight">{listing.title}</div>
                      <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-4 leading-tight sm:leading-normal">{listing.description}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                        <Calendar className="mr-1 sm:mr-2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{listing.age} years</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <MapPin className="mr-1 sm:mr-2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="text-green-600 font-semibold text-base sm:text-lg mt-1 sm:mt-3">${listing.price}</div>
                    </div>
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

        {/* SEO Content Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Discover Exclusive Escort Services</h2>
          
          <div className="relative">
            <div className={`text-gray-700 overflow-hidden transition-all duration-300`} 
                 id="seoContent" 
                 style={{ maxHeight: "200px" }}>
              <p className="mb-3">
                Welcome to Skluva's premium escort directory. Our platform connects you with sophisticated, verified companions who provide exceptional experiences tailored to your preferences and desires.
              </p>
              
              <p className="mb-3">
                Our verified escorts are the perfect companions for various occasions, from business events to private encounters.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Choose Skluva for Your Escort Needs</h3>
              
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li className="mb-2">Verified profiles with authentic photos and accurate descriptions</li>
                <li className="mb-2">Diverse selection of companions from various ethnicities and backgrounds</li>
                <li className="mb-2">Detailed filtering options to find your perfect match</li>
                <li className="mb-2">Private and discreet service connecting you directly with companions</li>
                <li className="mb-2">Regular updates with new listings and verified reviews</li>
              </ul>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
          
          <button
            className="text-primary font-medium hover:underline mt-2 focus:outline-none"
            id="seoToggle"
            onClick={() => {
              const seoContent = document.getElementById('seoContent')
              if (seoContent) {
                if (seoContent.style.maxHeight === '200px') {
                  seoContent.style.maxHeight = 'none'
                  document.getElementById('seoToggle')!.textContent = 'Read Less'
                } else {
                  seoContent.style.maxHeight = '200px'
                  document.getElementById('seoToggle')!.textContent = 'Read More'
                }
              }
            }}
          >
            Read More
          </button>
        </div>

        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
