import { Suspense } from 'react'
import { getCityPageContentSSR } from '@/lib/location-content-admin'
import { fetchAdsByCitySSR } from '@/lib/ad-utils-admin'
import { getStateNameFromSlug, getCityNameFromSlug } from '@/lib/route-utils'
import CityClient from './city-client'

// This is a Server Component that pre-fetches data
export default async function CityPageSSR({ params }: { params: { state: string; city: string } }) {
  try {
    // Pre-fetch the content from Firestore using Admin SDK
    const pageContent = await getCityPageContentSSR(params.state, params.city)
    
    // Get state and city names from slugs
    const stateName = getStateNameFromSlug(params.state)
    const cityName = getCityNameFromSlug(params.state, params.city)
    
    // Pre-fetch ads for this city using Admin SDK
    const cityAds = await fetchAdsByCitySSR(params.state, params.city)
    
    // Render the client component with pre-fetched data
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CityClient 
          params={params} 
          initialPageContent={pageContent}
          initialStateName={stateName || ''}
          initialCityName={cityName || ''}
          initialListings={cityAds}
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Error in CityPageSSR:', error)
    // Fallback to client-side rendering if server-side fails
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CityClient 
          params={params} 
          initialPageContent={null}
          initialStateName={getStateNameFromSlug(params.state) || ''}
          initialCityName={getCityNameFromSlug(params.state, params.city) || ''}
          initialListings={[]}
        />
      </Suspense>
    )
  }
}
