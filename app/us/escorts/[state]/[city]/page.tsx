import { Suspense } from 'react'
import { getCityPageContentSSR } from '@/lib/location-content-admin'
import { fetchAdsByCitySSR } from '@/lib/ad-utils-admin'
import { getStateNameFromSlug, getCityNameFromSlug } from '@/lib/route-utils'
import CityClient from './city-client'

// This is a Server Component that pre-fetches data
export default async function CityPage({ params }: { params: { state: string; city: string } }) {
  // Extract the params directly without destructuring
  const stateParam = params.state;
  const cityParam = params.city;
  
  try {
    // Pre-fetch the content from Firestore using Admin SDK
    const pageContent = await getCityPageContentSSR(stateParam, cityParam);
    
    // Get state and city names from slugs
    const stateName = getStateNameFromSlug(stateParam);
    const cityName = getCityNameFromSlug(stateParam, cityParam);
    
    // Pre-fetch ads for this city using Admin SDK
    const cityAds = await fetchAdsByCitySSR(stateParam, cityParam);
    
    // Render the client component with pre-fetched data
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CityClient 
          params={{ state: stateParam, city: cityParam }} 
          initialPageContent={pageContent}
          initialStateName={stateName || ''}
          initialCityName={cityName || ''}
          initialListings={cityAds}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error in CityPage:', error);
    
    // Fallback to client-side rendering if server-side fails
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CityClient 
          params={{ state: stateParam, city: cityParam }} 
          initialPageContent={null}
          initialStateName={getStateNameFromSlug(stateParam) || ''}
          initialCityName={getCityNameFromSlug(stateParam, cityParam) || ''}
          initialListings={[]}
        />
      </Suspense>
    );
  }
}
