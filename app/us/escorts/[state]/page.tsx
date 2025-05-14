"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, MapPin, Globe, Crown } from "lucide-react"
import LocationHeader from "@/components/location-header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import ImageCarousel from "@/components/listing-card/ImageCarousel"
import SearchForm from "@/components/search/search-form" 
import SEOContent from "@/components/seo-content"
import { getAdsByState } from "@/lib/ads-data"
import { usaStatesAndCitiesData } from "@/lib/demo-data"
import { Ad } from "@/lib/ads-data"
import Pagination from "@/components/pagination"
import { 
  getStateNameFromSlug, 
  getStateAbbreviationFromSlug, 
  getStateUrl,
  getCityUrl,
  getAdUrl
} from "@/lib/route-utils"
import { getStateContent } from "@/lib/seo-content"

export default function StatePage({ params }: { params: { state: string } }) {
  const [listings, setListings] = useState<Ad[]>([])
  const [stateName, setStateName] = useState("")
  const [cities, setCities] = useState<{ name: string; slug: string }[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10
  
  useEffect(() => {
    // Get state name from slug
    const name = getStateNameFromSlug(params.state)
    if (name) {
      setStateName(name)
      
      // Get state abbreviation for filtering ads
      const stateAbbr = getStateAbbreviationFromSlug(params.state)
      
      // Find state data to get cities
      const stateData = usaStatesAndCitiesData.states.find(
        state => state.name === name
      )
      
      if (stateData) {
        setCities(stateData.cities)
        
        // Get ads for this state
        const stateAds = getAdsByState(stateAbbr)
        setListings(stateAds)
        
        // Calculate total pages
        setTotalPages(Math.max(1, Math.ceil(stateAds.length / itemsPerPage)))
      }
    }
  }, [params.state])
  
  // Get current page from URL on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const page = parseInt(urlParams.get('page') || '1')
      setCurrentPage(isNaN(page) || page < 1 ? 1 : page)
    }
  }, [])
  
  // Get paginated listings
  const getPaginatedListings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return listings.slice(startIndex, endIndex)
  }
  
  const paginatedListings = getPaginatedListings()

  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <div className="sticky top-0 z-50 w-full">
          <LocationHeader locationName={stateName} />
        </div>
      </div>
      
      {/* Full-width search bar with light blue background */}
      <div className="w-full bg-[#EBF3FA]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="max-w-full">
            <SearchForm />
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-1 sm:px-4 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb text-sm mb-4 overflow-x-auto whitespace-nowrap px-2 sm:px-0">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Skluva United States
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <Link href={getStateUrl(params.state)} className="text-accent-blue font-medium hover:text-primary">
            {stateName} Escorts
          </Link>
        </div>

        {/* Location Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 px-2 sm:px-0">
          {stateName} Escorts
        </h1>

        {/* Listings */}
        {listings.length > 0 ? (
          <div className="flex flex-col gap-4 mb-8 overflow-hidden">
            {paginatedListings.map((listing, index) => (
              <div key={listing.id} className="relative w-[99%] mx-auto sm:w-full mb-1 mt-3">
                {listing.isTop && (
                  <div className="absolute -top-3 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center z-20">
                    <Crown className="w-3 h-3 mr-1" />
                    TOP
                  </div>
                )}
                <Link href={getAdUrl(listing.title, listing.id)} className="block no-underline text-black">
                  <div className="bg-white rounded-xl border-2 border-accent-blue/50 shadow-sm overflow-hidden flex flex-row hover:shadow-md transition-shadow h-[253px] sm:h-[242px] md:h-[242px] relative">
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
                        {listing.nationality && (
                          <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                            <Globe className="mr-1 sm:mr-2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{listing.nationality}</span>
                          </div>
                        )}
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <MapPin className="mr-1 sm:mr-2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{listing.location.city}, {listing.location.area}</span>
                        </div>
                        <div className="text-green-600 font-semibold text-base sm:text-lg mt-1 sm:mt-3">${listing.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">No escorts found in {stateName}</h3>
            <p className="text-gray-600">
              Try browsing other states or check back later for new listings.
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {listings.length > itemsPerPage && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            baseUrl={getStateUrl(params.state)}
          />
        )}
      </div>
      
      {/* SEO Content */}
      <div className="max-w-5xl mx-auto px-1 sm:px-4 mb-8 w-full">
        <SEOContent 
          title={`About ${stateName} Escorts`}
          content={getStateContent(stateName)}
          initialHeight={80}
        />
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
