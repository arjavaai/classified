import { adminDb } from './firebase-admin';

export interface LocationPageContent {
  title: string;
  metaDescription: string;
  content: string;
  h1Title: string;
}

/**
 * Fetches content for a state page from Firestore using Admin SDK
 * This function runs on the server during SSR
 */
export async function getStatePageContentSSR(stateSlug: string): Promise<LocationPageContent | null> {
  try {
    console.log(`[SSR] Fetching content for state: ${stateSlug}`);
    
    // Check if adminDb is initialized
    if (!adminDb) {
      console.error('[SSR] adminDb is not initialized in getStatePageContentSSR');
      return null;
    }
    
    // Query Firestore using Admin SDK
    const querySnapshot = await adminDb
      .collection('locationPages')
      .where('type', '==', 'state')
      .where('stateSlug', '==', stateSlug)
      .limit(1)
      .get();
    
    if (querySnapshot.empty) {
      console.log(`[SSR] No content found for state: ${stateSlug}`);
      return null;
    }
    
    const pageData = querySnapshot.docs[0].data();
    console.log(`[SSR] Found content for state: ${stateSlug}`);
    
    return {
      title: pageData.title || '',
      metaDescription: pageData.metaDescription || '',
      content: pageData.content || '',
      h1Title: pageData.h1Title || `${pageData.state} Escorts`,
    };
  } catch (error) {
    console.error('[SSR] Error fetching state page content:', error);
    return null;
  }
}

/**
 * Fetches content for a city page from Firestore using Admin SDK
 * This function runs on the server during SSR
 */
export async function getCityPageContentSSR(stateSlug: string, citySlug: string): Promise<LocationPageContent | null> {
  try {
    console.log(`[SSR] Fetching content for city: ${citySlug} in state: ${stateSlug}`);
    
    // Check if adminDb is initialized
    if (!adminDb) {
      console.error('[SSR] adminDb is not initialized in getCityPageContentSSR');
      return null;
    }
    
    // Query Firestore using Admin SDK
    const querySnapshot = await adminDb
      .collection('locationPages')
      .where('type', '==', 'city')
      .where('stateSlug', '==', stateSlug)
      .where('citySlug', '==', citySlug)
      .limit(1)
      .get();
    
    if (querySnapshot.empty) {
      console.log(`[SSR] No content found for city: ${citySlug} in state: ${stateSlug}`);
      return null;
    }
    
    const pageData = querySnapshot.docs[0].data();
    console.log(`[SSR] Found content for city: ${citySlug} in state: ${stateSlug}`);
    
    return {
      title: pageData.title || '',
      metaDescription: pageData.metaDescription || '',
      content: pageData.content || '',
      h1Title: pageData.h1Title || `${pageData.city}, ${pageData.state} Escorts`,
    };
  } catch (error) {
    console.error('[SSR] Error fetching city page content:', error);
    return null;
  }
}
