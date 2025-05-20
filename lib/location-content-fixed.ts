import { collection, query, where, getDocs, limit, Firestore } from 'firebase/firestore';
import { db } from './firebase';

interface LocationPageContent {
  title: string;
  metaDescription: string;
  content: string;
  h1Title: string;
}

/**
 * Fetches content for a state page from Firestore
 * @param stateSlug The URL slug for the state
 * @returns Object containing title, metaDescription and content
 */
export async function getStatePageContent(stateSlug: string): Promise<LocationPageContent | null> {
  try {
    // Check if Firestore is initialized
    if (!db) {
      console.error('Firestore is not initialized');
      return null;
    }

    const locationPagesCollection = collection(db as Firestore, 'locationPages');
    const q = query(
      locationPagesCollection,
      where('type', '==', 'state'),
      where('stateSlug', '==', stateSlug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`No content found for state: ${stateSlug}`);
      return null;
    }
    
    const pageData = querySnapshot.docs[0].data();
    
    return {
      title: pageData.title || '',
      metaDescription: pageData.metaDescription || '',
      content: pageData.content || '',
      h1Title: pageData.h1Title || `${pageData.state} Escorts`,
    };
  } catch (error) {
    console.error('Error fetching state page content:', error);
    return null;
  }
}

/**
 * Fetches content for a city page from Firestore
 * @param stateSlug The URL slug for the state
 * @param citySlug The URL slug for the city
 * @returns Object containing title, metaDescription and content
 */
export async function getCityPageContent(stateSlug: string, citySlug: string): Promise<LocationPageContent | null> {
  try {
    // Check if Firestore is initialized
    if (!db) {
      console.error('Firestore is not initialized');
      return null;
    }

    const locationPagesCollection = collection(db as Firestore, 'locationPages');
    const q = query(
      locationPagesCollection,
      where('type', '==', 'city'),
      where('stateSlug', '==', stateSlug),
      where('citySlug', '==', citySlug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`No content found for city: ${citySlug} in state: ${stateSlug}`);
      return null;
    }
    
    const pageData = querySnapshot.docs[0].data();
    
    return {
      title: pageData.title || '',
      metaDescription: pageData.metaDescription || '',
      content: pageData.content || '',
      h1Title: pageData.h1Title || `${pageData.city}, ${pageData.state} Escorts`,
    };
  } catch (error) {
    console.error('Error fetching city page content:', error);
    return null;
  }
}
