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
import { Ad } from "@/lib/ad-utils"
import Pagination from "@/components/pagination"
import { 
  getStateUrl,
  getCityUrl,
  getAdUrl
} from "@/lib/route-utils"
import { LocationPageContent } from "@/lib/location-content-server"

interface StatePageClientProps {
  params: { state: string }
  initialPageContent: LocationPageContent | null
  initialStateName: string
  initialCities: { name: string; slug: string }[]
  initialListings: Ad[]
}

export default function StatePageClient({ 
  params, 
  initialPageContent,
  initialStateName,
  initialCities,
  initialListings
}: StatePageClientProps) {
  // Use the pre-fetched data as initial state
  const [listings, setListings] = useState<Ad[]>(initialListings)
  const [stateName, setStateName] = useState(initialStateName)
  const [cities, setCities] = useState<{ name: string; slug: string }[]>(initialCities)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialListings.length / 10))
  const [pageContent, setPageContent] = useState<LocationPageContent | null>(initialPageContent)
  const itemsPerPage = 10
  
  useEffect(() => {
    // Update document title and meta description
    if (pageContent && typeof document !== 'undefined') {
      document.title = pageContent.title
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', pageContent.metaDescription)
      }
    }
  }, [pageContent])
  
  // Handle pagination
  useEffect(() => {
    // Calculate total pages
    setTotalPages(Math.ceil(listings.length / itemsPerPage))
  }, [listings])
  
  // Get current page listings
  const getCurrentListings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return listings.slice(startIndex, endIndex)
  }
  
  const currentListings = getCurrentListings()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <LocationHeader />
      
      <div className="max-w-5xl mx-auto pt-8 px-1 sm:px-4">
        {/* Breadcrumbs */}
        <div className="text-sm mb-4 px-2 sm:px-0">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="font-medium">{stateName} Escorts</span>
        </div>
        
        {/* Search Form */}
        <div className="mb-6">
          <SearchForm />
        </div>
        
        {/* Location Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 px-2 sm:px-0">
          {pageContent?.h1Title || ''}
        </h1>

        {/* Listings */}
        <div className="mb-8">
          {cities.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-3">Cities in {stateName}</h2>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <Link 
                    key={city.slug}
                    href={getCityUrl(params.state, city.slug)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {currentListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {currentListings.map(listing => (
                <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link href={getAdUrl(listing.id)}>
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                        <ImageCarousel 
                          images={listing.images || []} 
                          alt={`${listing.title} - Escort in ${listing.city}, ${listing.state}`}
                        />
                        {listing.isVerified && (
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Crown size={12} className="mr-1" />
                            Verified
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="w-full sm:w-2/3 p-4">
                        <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                        
                        <div className="flex flex-wrap text-sm text-gray-600 mb-3 gap-y-1">
                          <div className="w-full sm:w-1/2 flex items-center">
                            <MapPin size={16} className="mr-1 flex-shrink-0" />
                            <span className="truncate">{listing.city}, {listing.state}</span>
                          </div>
                          
                          <div className="w-full sm:w-1/2 flex items-center">
                            <Calendar size={16} className="mr-1 flex-shrink-0" />
                            <span>
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {listing.website && (
                            <div className="w-full sm:w-1/2 flex items-center">
                              <Globe size={16} className="mr-1 flex-shrink-0" />
                              <span className="truncate">{listing.website}</span>
                            </div>
                          )}
                          
                          <div className="w-full sm:w-1/2 flex items-center font-semibold text-green-600">
                            {(() => {
                              // Collect all rates
                              const allRates: number[] = [];
                              
                              // Add incall rates if available
                              if (listing.incallRates && Object.keys(listing.incallRates).length > 0) {
                                Object.values(listing.incallRates).forEach(rate => {
                                  const numRate = parseInt(rate.toString().replace(/[^0-9]/g, ''));
                                  if (!isNaN(numRate)) allRates.push(numRate);
                                });
                              }
                              
                              // Add outcall rates if available
                              if (listing.outcallRates && Object.keys(listing.outcallRates).length > 0) {
                                Object.values(listing.outcallRates).forEach(rate => {
                                  const numRate = parseInt(rate.toString().replace(/[^0-9]/g, ''));
                                  if (!isNaN(numRate)) allRates.push(numRate);
                                });
                              }
                              
                              // Return the minimum rate if available
                              return allRates.length > 0 ? `$${Math.min(...allRates)}` : '';
                            })()}
                          </div>
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
        {pageContent && (
          <div className="max-w-5xl mx-auto px-1 sm:px-4 mb-8 w-full">
            <SEOContent 
              title={pageContent.title || ''}
              content={pageContent.content || ''}
              initialHeight={80}
            />
          </div>
        )}
        
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
