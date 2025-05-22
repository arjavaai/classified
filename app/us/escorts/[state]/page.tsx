import { Suspense } from 'react'
import { getStatePageContentSSR } from '@/lib/location-content-admin'
import { fetchAdsByStateSSR, listAllAdsSSR } from '@/lib/ad-utils-admin'
import { getStateNameFromSlug } from '@/lib/route-utils'
import { usaStatesAndCitiesData } from '@/lib/demo-data'
import StateClient from './state-client'

// Helper function to get cities for a state name
function getCitiesForState(stateName: string): { name: string; slug: string }[] {
  if (!stateName) return [];
  
  const stateData = usaStatesAndCitiesData.states.find(s => s.name === stateName);
  if (!stateData) return [];
  
  return stateData.cities.map(city => ({
    name: city.name,
    slug: city.slug
  }));
}

// This is a Server Component that pre-fetches data
export default async function StatePage({ params }: { params: { state: string } }) {
  // Extract the state parameter
  const stateParam = params.state;
  
  try {
    // Debug: List all ads in the database
    const allAds = await listAllAdsSSR();
    console.log(`[DEBUG] Found ${allAds.length} total ads in the database`);
    
    // Pre-fetch the content from Firestore using Admin SDK
    const pageContent = await getStatePageContentSSR(stateParam);
    
    // Get state name from slug
    const stateName = getStateNameFromSlug(stateParam);
    console.log(`[DEBUG] State name from slug: '${stateName}' (slug: '${stateParam}')`);
    
    // Get cities for this state
    const cities = getCitiesForState(stateName);
    console.log(`[DEBUG] Found ${cities.length} cities for state: ${stateName}`);
    
    // Pre-fetch ads for this state using Admin SDK
    console.log(`[DEBUG] Fetching ads for state: ${stateName}`);
    const stateAds = await fetchAdsByStateSSR(stateParam);
    
    // Render the client component with pre-fetched data
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <StateClient 
          params={{ state: stateParam }} 
          initialPageContent={pageContent}
          initialStateName={stateName || ''}
          initialCities={cities}
          initialListings={stateAds}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error in StatePage:', error);
    
    // Fallback to client-side rendering if server-side fails
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <StateClient 
          params={{ state: stateParam }} 
          initialPageContent={null}
          initialStateName={getStateNameFromSlug(stateParam) || ''}
          initialCities={[]}
          initialListings={[]}
        />
      </Suspense>
    );
  }
}
