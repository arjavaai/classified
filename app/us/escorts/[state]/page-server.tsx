import { Suspense } from 'react'
import { getStatePageContentCached } from '@/lib/location-content-server'
import StatePageClient from './page-client'
import { getStateNameFromSlug } from '@/lib/route-utils'
import { fetchAdsByState } from '@/lib/ad-utils'
import { usaStatesAndCitiesData } from '@/lib/demo-data'

// This is a Server Component that pre-fetches data
export default async function StatePageServer({ params }: { params: { state: string } }) {
  // Pre-fetch the content from Firestore
  const pageContent = await getStatePageContentCached(params.state)
  
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
  
  // Pre-fetch ads for this state
  const stateAds = await fetchAdsByState(params.state)
  
  // Render the client component with pre-fetched data
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatePageClient 
        params={params} 
        initialPageContent={pageContent}
        initialStateName={stateName || ''}
        initialCities={cities}
        initialListings={stateAds}
      />
    </Suspense>
  )
}
