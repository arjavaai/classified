"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import ImageCarousel from "@/components/listing-card/ImageCarousel"
import { getAdsByState } from "@/lib/ads-data"
import { usaStatesAndCitiesData } from "@/lib/demo-data"
import { Ad } from "@/lib/ads-data"
import { 
  getStateNameFromSlug, 
  getStateAbbreviationFromSlug, 
  getStateUrl,
  getCityUrl,
  getAdUrl
} from "@/lib/route-utils"

export default function StatePage({ params }: { params: { state: string } }) {
  const [listings, setListings] = useState<Ad[]>([])
  const [stateName, setStateName] = useState("")
  const [cities, setCities] = useState<{ name: string; slug: string }[]>([])
  
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
      }
    }
  }, [params.state])

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
          <span className="text-accent-blue font-medium">{stateName} Escorts</span>
        </div>

        {/* Location Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
          {stateName} Escorts
        </h1>

        {/* Search Results Date */}
        <div className="text-sm text-gray-600 mb-4 font-medium">
          {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "long" }).toUpperCase()}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          {listings.length} {listings.length === 1 ? "escort" : "escorts"} in {stateName}
        </div>

        {/* Listings */}
        {listings.length > 0 ? (
          <div className="flex flex-col gap-4 mb-8 overflow-hidden">
            {listings.map((listing) => (
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
                        <span>{listing.location.city}, {listing.location.area}</span>
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
            <h3 className="text-xl font-semibold mb-2">No escorts found in {stateName}</h3>
            <p className="text-gray-600">
              Try browsing other states or check back later for new listings.
            </p>
          </div>
        )}

        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
