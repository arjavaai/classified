import { Metadata } from 'next';
import { getStateNameFromSlug } from '@/lib/route-utils';
import { getStatePageContent } from '@/lib/location-content';

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateSlug = params.state;
  const stateName = getStateNameFromSlug(stateSlug) || stateSlug;
  
  // Default metadata
  let metadata: Metadata = {
    title: `Escorts in ${stateName} | Find Local Escorts`,
    description: `Find verified escorts in ${stateName}. Browse our directory of premium escort services and adult entertainment options throughout ${stateName}.`,
  };
  
  // Try to get custom content from Firestore
  try {
    const content = await getStatePageContent(stateSlug);
    if (content) {
      metadata = {
        ...metadata,
        title: content.title,
        description: content.metaDescription,
      };
    }
  } catch (error) {
    console.error('Error fetching state page metadata:', error);
  }
  
  return metadata;
}
