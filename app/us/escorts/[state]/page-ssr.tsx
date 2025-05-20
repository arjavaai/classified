import { Suspense } from 'react'
import { getStatePageContentSSR } from '@/lib/location-content-admin'
import { fetchAdsByStateSSR } from '@/lib/ad-utils-admin'
import { getStateNameFromSlug } from '@/lib/route-utils'
import { usaStatesAndCitiesData } from '@/lib/demo-data'
import StateClient from './state-client'

// This is a Server Component that pre-fetches data
export default async function StatePageSSR({ params }: { params: { state: string } }) {
  try {
    // Pre-fetch the content from Firestore using Admin SDK
    const pageContent = await getStatePageContentSSR(params.state)
    
    // Get state name from slug
    const stateName = getStateNameFromSlug(params.state)
    
    // Get cities for this state
    let cities: { name: string; slug: string }[] = []
    if (stateName) {
      const stateData = usaStatesAndCitiesData.states.find(
        state => state.name === stateName
      )
      
      if (stateData) {
        cities = stateData.cities.map(city => ({
          name: city.name,
          slug: city.slug
        }))
      }
    }
    
    // Pre-fetch ads for this state using Admin SDK
    const stateAds = await fetchAdsByStateSSR(params.state)
    
    // Render the client component with pre-fetched data
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <StateClient 
          params={params} 
          initialPageContent={pageContent}
          initialStateName={stateName || ''}
          initialCities={cities}
          initialListings={stateAds}
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Error in StatePageSSR:', error)
    // Fallback to client-side rendering if server-side fails
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <StateClient 
          params={params} 
          initialPageContent={null}
          initialStateName={getStateNameFromSlug(params.state) || ''}
          initialCities={[]}
          initialListings={[]}
        />
      </Suspense>
    )
  }
}
