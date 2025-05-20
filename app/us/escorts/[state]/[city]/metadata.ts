import { Metadata } from 'next';
import { getStateNameFromSlug, getCityNameFromSlug } from '@/lib/route-utils';
import { getCityPageContent } from '@/lib/location-content';

export async function generateMetadata({ params }: { params: { state: string; city: string } }): Promise<Metadata> {
  const stateSlug = params.state;
  const citySlug = params.city;
  
  const stateName = getStateNameFromSlug(stateSlug) || stateSlug;
  const cityName = getCityNameFromSlug(stateSlug, citySlug) || citySlug;
  
  // Default metadata
  let metadata: Metadata = {
    title: `Escorts in ${cityName}, ${stateName} | Find Local Escorts`,
    description: `Find verified escorts in ${cityName}, ${stateName}. Browse our directory of premium escort services and adult entertainment options in ${cityName}.`,
  };
  
  // Try to get custom content from Firestore
  try {
    const content = await getCityPageContent(stateSlug, citySlug);
    if (content) {
      metadata = {
        ...metadata,
        title: content.title,
        description: content.metaDescription,
      };
    }
  } catch (error) {
    console.error('Error fetching city page metadata:', error);
  }
  
  return metadata;
}
