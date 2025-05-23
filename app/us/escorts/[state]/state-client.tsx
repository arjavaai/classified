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

interface StateClientProps {
  params: { state: string }
  initialPageContent: LocationPageContent | null
  initialStateName: string
  initialCities: { name: string; slug: string }[]
  initialListings: Ad[]
}

// Helper function to create a slug from state name
function createStateSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-');
}

export default function StateClient({ 
  params, 
  initialPageContent,
  initialStateName,
  initialCities,
  initialListings
}: StateClientProps) {
  // Debug the initial data received from server
  useEffect(() => {
    console.log('[Client] StateClient received initialData:', {
      stateName: initialStateName,
      citiesCount: initialCities.length,
      listingsCount: initialListings.length,
      hasPageContent: !!initialPageContent,
      stateParam: params.state
    });
  }, [initialStateName, initialCities, initialListings, initialPageContent, params.state]);

  // Use the pre-fetched data as initial state
  const [allListings, setAllListings] = useState<Ad[]>(initialListings)
  const [stateName, setStateName] = useState(initialStateName)
  const [cities, setCities] = useState<{ name: string; slug: string }[]>(initialCities)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialListings.length / 30))
  const [pageContent] = useState<LocationPageContent | null>(initialPageContent)
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 30
  
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
  
  // Get current page from URL on client-side and update when URL changes
  useEffect(() => {
    const updatePageFromUrl = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const page = parseInt(urlParams.get('page') || '1')
        setCurrentPage(isNaN(page) || page < 1 ? 1 : page)
      }
    }
    
    // Initial page load
    updatePageFromUrl()
    
    // Listen for URL changes (back/forward navigation)
    window.addEventListener('popstate', updatePageFromUrl)
    window.addEventListener('pushstate', updatePageFromUrl)
    
    return () => {
      window.removeEventListener('popstate', updatePageFromUrl)
      window.removeEventListener('pushstate', updatePageFromUrl)
    }
  }, [])
  
  // Update total pages when all listings change
  useEffect(() => {
    setTotalPages(Math.ceil(allListings.length / itemsPerPage))
  }, [allListings, itemsPerPage])
  
  // Get paginated listings
  const getPaginatedListings = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return allListings.slice(startIndex, endIndex)
  }
  
  const paginatedListings = getPaginatedListings()
  
  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage])
  
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
        <div className="breadcrumb text-sm mb-4 px-2 sm:px-0 flex flex-col sm:flex-row">
          <div className="flex items-center mb-1 sm:mb-0">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Skluva United States
            </Link>
            <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          </div>
          <div className="flex items-center">
            <Link href={`/us/escorts/${params.state}`} className="text-accent-blue font-medium hover:text-primary">
              {stateName} Escorts
            </Link>
          </div>
        </div>

        {/* Location Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 px-2 sm:px-0">
          {pageContent?.h1Title || ''}
        </h1>

        {/* Listings */}
        {allListings.length > 0 ? (
          <div className="flex flex-col gap-4 mb-8 overflow-hidden">
            {paginatedListings.map((listing) => (
              <div key={listing.id} className="relative w-[99%] mx-auto sm:w-full mb-1 mt-3">
                {listing.adType === 'premium' && (
                  <div className="absolute -top-3 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center z-20">
                    <Crown className="w-3 h-3 mr-1" />
                    TOP
                  </div>
                )}
                <Link href={getAdUrl(listing.title, listing.id)} className="block no-underline text-black">
                  <div className="bg-white rounded-xl border-2 border-accent-blue/50 shadow-sm overflow-hidden flex flex-row hover:shadow-md transition-shadow h-[253px] sm:h-[242px] md:h-[242px] relative">
                    <ImageCarousel 
                      images={listing.photos || []} 
                      photoCount={listing.photos?.length || 0}
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
                            <span>{typeof listing.nationality === 'string' ? 
                              listing.nationality.split(/(?=[A-Z])/)[0] : 
                              Array.isArray(listing.nationality) ? 
                                listing.nationality[0] : 
                                listing.nationality}</span>
                          </div>
                        )}
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <MapPin className="mr-1 sm:mr-2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{listing.city}</span>
                        </div>
                        <div className="text-green-600 font-semibold text-base sm:text-lg mt-1 sm:mt-3">
                          {(() => {
                            // Get all rates from both incall and outcall
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
        {allListings.length > itemsPerPage && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            baseUrl={`/us/escorts/${params.state && params.state !== 'undefined' ? params.state : createStateSlug(stateName)}`}
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
  )
}
