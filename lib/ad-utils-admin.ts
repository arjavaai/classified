import { adminDb } from './firebase-admin';
import { Ad } from './ad-utils';
import { getStateNameFromSlug, getCityNameFromSlug } from './route-utils';

// Helper function to serialize Firestore timestamps and other non-serializable objects
function serializeAdForClient(doc: FirebaseFirestore.DocumentSnapshot): Ad {
  const data = doc.data() || {};
  
  // Create a new object with all properties serialized
  const serialized: Record<string, any> = {
    id: doc.id
  };
  
  // Process all fields and convert timestamps to ISO strings
  Object.entries(data).forEach(([key, value]) => {
    // Handle Firestore Timestamps
    if (value && typeof value === 'object' && value.toDate && typeof value.toDate === 'function') {
      serialized[key] = value.toDate().toISOString();
    } 
    // Handle nested objects with timestamps (like updatedAt)
    else if (value && typeof value === 'object' && value._seconds !== undefined && value._nanoseconds !== undefined) {
      const date = new Date(value._seconds * 1000 + value._nanoseconds / 1000000);
      serialized[key] = date.toISOString();
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      serialized[key] = [...value];
    }
    // Handle other objects
    else if (value && typeof value === 'object') {
      serialized[key] = { ...value };
    }
    // Handle primitives
    else {
      serialized[key] = value;
    }
  });
  
  return serialized as Ad;
}

/**
 * Lists all ads in the database for debugging
 */
export async function listAllAdsSSR(): Promise<Ad[]> {
  try {
    // Check if adminDb is initialized
    if (!adminDb) {
      console.error('[SSR] adminDb is not initialized');
      return [];
    }
    
    const snapshot = await adminDb.collection('ads').get();
    
    if (snapshot.empty) {
      console.log('[SSR] No ads found in the database');
      return [];
    }
    
    console.log(`[SSR] Found ${snapshot.docs.length} ads in the database`);
    
    const ads = snapshot.docs.map(doc => serializeAdForClient(doc));
    
    // Log a sample ad for debugging
    if (ads.length > 0) {
      console.log('[SSR] Sample ad:', JSON.stringify(ads[0]).substring(0, 200) + '...');
    }
    
    return ads;
  } catch (error) {
    console.error('Error listing all ads (SSR):', error);
    return [];
  }
}

/**
 * Fetches ads for a specific state using Admin SDK (server-side)
 */
export async function fetchAdsByStateSSR(stateSlug: string): Promise<Ad[]> {
  try {
    // Get state name from slug using the utility function
    const stateName = getStateNameFromSlug(stateSlug);
    
    console.log(`[SSR] Fetching ads for state: ${stateName} (slug: ${stateSlug})`);
    
    // Check if adminDb is initialized
    if (!adminDb) {
      console.error('[SSR] adminDb is not initialized');
      return [];
    }
    
    // Query Firestore directly with the correct field names and status
    console.log(`[SSR] Querying Firestore for ads with state='${stateName}' and status='active'`);
    const adsSnapshot = await adminDb
      .collection('ads')
      .where('state', '==', stateName)
      .where('status', '==', 'active')
      .get();
    
    if (adsSnapshot.empty) {
      console.log(`[SSR] No active ads found for state: ${stateName}`);
      
      // Try getting all ads for debugging
      const allAdsSnapshot = await adminDb.collection('ads').get();
      console.log(`[SSR] Found ${allAdsSnapshot.docs.length} total ads in the database`);
      
      if (allAdsSnapshot.docs.length > 0) {
        // Log all states and statuses for debugging
        const states = new Set<string>();
        const statuses = new Set<string>();
        
        allAdsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.state) states.add(data.state);
          if (data.status) statuses.add(data.status);
        });
        
        console.log('[SSR] All states in database:', Array.from(states));
        console.log('[SSR] All statuses in database:', Array.from(statuses));
      }
      
      return [];
    }
    
    console.log(`[SSR] Found ${adsSnapshot.docs.length} active ads for state: ${stateName}`);
    
    // Serialize the ads for client
    const stateAds = adsSnapshot.docs.map(doc => serializeAdForClient(doc));
    
    // Log a sample ad for debugging
    if (stateAds.length > 0) {
      console.log('[SSR] Sample ad:', JSON.stringify(stateAds[0]).substring(0, 200) + '...');
    }
    
    // Sort by premium status first, then by creation date (same as client-side)
    stateAds.sort((a: Ad, b: Ad) => {
      // Premium ads first
      if (a.adType === 'premium' && b.adType !== 'premium') return -1;
      if (a.adType !== 'premium' && b.adType === 'premium') return 1;
      
      // Then by creation date (newest first)
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Return the filtered and sorted ads
    return stateAds;
  } catch (error) {
    console.error('Error fetching ads by state (SSR):', error);
    return [];
  }
}

/**
 * Fetches ads for a specific city using Admin SDK (server-side)
 */
export async function fetchAdsByCitySSR(stateSlug: string, citySlug: string): Promise<Ad[]> {
  try {
    // Get state and city names from slugs using utility functions
    const stateName = getStateNameFromSlug(stateSlug);
    const cityName = getCityNameFromSlug(stateSlug, citySlug);
    
    console.log(`[SSR] Fetching ads for city: ${cityName} in state: ${stateName}`);
    
    // Check if adminDb is initialized
    if (!adminDb) {
      console.error('[SSR] adminDb is not initialized');
      return [];
    }
    
    // Query Firestore directly with the correct field names and status
    console.log(`[SSR] Querying Firestore for ads with state='${stateName}', city='${cityName}' and status='active'`);
    const adsSnapshot = await adminDb
      .collection('ads')
      .where('state', '==', stateName)
      .where('city', '==', cityName)
      .where('status', '==', 'active')
      .get();
    
    if (adsSnapshot.empty) {
      console.log(`[SSR] No active ads found for city: ${cityName} in state: ${stateName}`);
      
      // Try getting all ads for this state to see what cities exist
      console.log(`[SSR] Checking for any active ads in state: ${stateName}`);
      const stateAdsSnapshot = await adminDb
        .collection('ads')
        .where('state', '==', stateName)
        .where('status', '==', 'active')
        .get();
      
      if (!stateAdsSnapshot.empty) {
        // Log all cities in this state
        const cities = new Set<string>();
        stateAdsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.city) cities.add(data.city);
        });
        
        console.log(`[SSR] Cities with active ads in ${stateName}:`, Array.from(cities));
      } else {
        console.log(`[SSR] No active ads found for state: ${stateName}`);
      }
      
      return [];
    }
    
    console.log(`[SSR] Found ${adsSnapshot.docs.length} active ads for city: ${cityName} in state: ${stateName}`);
    
    // Serialize the ads for client
    const cityAds = adsSnapshot.docs.map(doc => serializeAdForClient(doc));
    
    // Log a sample ad for debugging
    if (cityAds.length > 0) {
      console.log('[SSR] Sample ad:', JSON.stringify(cityAds[0]).substring(0, 200) + '...');
    }
    
    // Sort by premium status first, then by creation date (same as client-side)
    cityAds.sort((a: Ad, b: Ad) => {
      // Premium ads first
      if (a.adType === 'premium' && b.adType !== 'premium') return -1;
      if (a.adType !== 'premium' && b.adType === 'premium') return 1;
      
      // Then by creation date (newest first)
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log(`[SSR] Returning ${cityAds.length} ads for city: ${cityName} in state: ${stateName}`);
    return cityAds;
  } catch (error) {
    console.error('Error fetching ads by city (SSR):', error);
    return [];
  }
}
