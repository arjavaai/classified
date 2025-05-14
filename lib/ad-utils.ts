import { db } from './firebase';
import { collection, query, where, getDocs, orderBy, limit, Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export interface Ad {
  id: string;
  userId: string;
  adType: string;
  status: string;
  title: string;
  description: string;
  photos: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt: string;
  state: string;
  city: string;
  name: string;
  category: string;
  age: string;
  // Additional fields that might be present in some ads
  adId?: string;
  contactPreference?: string;
  email?: string;
  phone?: string;
  whatsapp?: boolean;
  sms?: boolean;
  smsEnabled?: boolean; // For backward compatibility
  ethnicity?: string;
  nationality?: string;
  bodyType?: string;
  breastType?: string;
  hairColor?: string;
  services?: string[];
  catersTo?: string[];
  placeOfService?: string[];
  incallRates?: Record<string, string>;
  outcallRates?: Record<string, string>;
  termsAccepted?: boolean;
  termsAcceptedAt?: string;
}

/**
 * Fetches ads for a specific user
 * @param userId The ID of the user
 * @param limitCount Optional limit on the number of ads to fetch
 * @returns A promise that resolves to an array of ads
 */
export const fetchUserAds = async (userId: string, limitCount?: number): Promise<Ad[]> => {
  if (!db) {
    console.error("Firestore not initialized");
    return [];
  }
  
  console.log(`Attempting to fetch ads for user: ${userId}, limit: ${limitCount || 'none'}`);
  
  try {
    // Create a query against the ads collection
    // IMPORTANT: Don't use orderBy with where on different fields unless you have a composite index
    const adsQuery = query(
      collection(db, "ads"),
      where("userId", "==", userId)
      // Removed orderBy to avoid index issues
      // ...(limitCount ? [limit(limitCount)] : [])
    );
    
    console.log("Query created, executing...");
    
    // Execute the query
    const querySnapshot = await getDocs(adsQuery);
    
    console.log(`Query executed, found ${querySnapshot.docs.length} ads`);
    console.log('Raw query results:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
    if (querySnapshot.empty) {
      console.log('No documents found in the query');
    } else {
      // Log the first document to see its structure
      const firstDoc = querySnapshot.docs[0];
      console.log('First document structure:', { id: firstDoc.id, data: firstDoc.data() });
    }
    
    // Map the documents to our Ad interface
    const ads: Ad[] = [];
    
    querySnapshot.forEach(doc => {
      try {
        const data = doc.data();
        console.log(`Processing ad document: ${doc.id}`, data);
        
        // Handle potentially missing fields with default values
        const ad: Ad = {
          id: doc.id,
          userId: data.userId || userId,
          adType: data.adType || 'free',
          status: data.status || 'pending',
          title: data.title || 'Untitled Ad',
          description: data.description || '',
          photos: data.photos || [],
          createdAt: data.createdAt || new Date(),
          updatedAt: data.updatedAt || new Date(),
          expiresAt: data.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Default 24h expiry
          state: data.state || '',
          city: data.city || '',
          name: data.name || '',
          category: data.category || '',
          age: data.age || ''
        };
        
        // Add additional fields if they exist in the document
        if (data.adId) ad.adId = data.adId;
        if (data.contactPreference) ad.contactPreference = data.contactPreference;
        if (data.email) ad.email = data.email;
        if (data.phone) ad.phone = data.phone;
        if (data.whatsapp !== undefined) ad.whatsapp = data.whatsapp;
        
        // Handle SMS toggle from both formats
        if (data.sms !== undefined) ad.sms = data.sms;
        if (data.smsEnabled !== undefined) ad.smsEnabled = data.smsEnabled;
        
        // Add characteristic fields if they exist
        if (data.ethnicity) ad.ethnicity = data.ethnicity;
        if (data.nationality) ad.nationality = data.nationality;
        if (data.bodyType) ad.bodyType = data.bodyType;
        if (data.breastType) ad.breastType = data.breastType;
        if (data.hairColor) ad.hairColor = data.hairColor;
        if (data.services) ad.services = data.services;
        if (data.catersTo) ad.catersTo = data.catersTo;
        if (data.placeOfService) ad.placeOfService = data.placeOfService;
        if (data.incallRates) ad.incallRates = data.incallRates;
        if (data.outcallRates) ad.outcallRates = data.outcallRates;
        if (data.termsAccepted !== undefined) ad.termsAccepted = data.termsAccepted;
        if (data.termsAcceptedAt) ad.termsAcceptedAt = data.termsAcceptedAt;
        
        ads.push(ad);
      } catch (err) {
        console.error(`Error processing document ${doc.id}:`, err);
      }
    });
    
    // Sort manually since we removed orderBy
    ads.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(0);
      return dateB.getTime() - dateA.getTime(); // descending order
    });
    
    // Apply limit if needed
    const limitedAds = limitCount ? ads.slice(0, limitCount) : ads;
    
    console.log(`Returning ${limitedAds.length} processed ads`);
    return limitedAds;
  } catch (error) {
    console.error("Error fetching user ads:", error);
    return [];
  }
};

/**
 * Toggles the active status of an ad
 * @param adId The ID of the ad to toggle
 * @param active The new active status
 * @returns A promise that resolves to a success indicator
 */
export const toggleAdStatus = async (adId: string, active: boolean): Promise<boolean> => {
  if (!db) {
    console.error("Firestore not initialized");
    return false;
  }
  
  try {
    const adRef = doc(db, "ads", adId);
    await updateDoc(adRef, {
      status: active ? "active" : "inactive",
      updatedAt: Timestamp.now()
    });
    
    return true;
  } catch (error) {
    console.error("Error toggling ad status:", error);
    return false;
  }
};

/**
 * Deletes an ad
 * @param adId The ID of the ad to delete
 * @returns A promise that resolves to a success indicator
 */
export const deleteAd = async (adId: string): Promise<boolean> => {
  if (!db) {
    console.error("Firestore not initialized");
    return false;
  }
  
  try {
    await deleteDoc(doc(db, "ads", adId));
    return true;
  } catch (error) {
    console.error("Error deleting ad:", error);
    return false;
  }
};

/**
 * Checks if an ad is expired
 * @param expiresAt The expiration date string
 * @returns True if the ad is expired, false otherwise
 */
export const isAdExpired = (expiresAt: string): boolean => {
  const expirationDate = new Date(expiresAt);
  const now = new Date();
  return now > expirationDate;
};

/**
 * Formats a date string for display
 * @param dateString The date string to format
 * @returns A formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculates time remaining until expiration
 * @param expiresAt The expiration date string
 * @returns A string representing the time remaining
 */
export const getTimeRemaining = (expiresAt: string): string => {
  const expirationDate = new Date(expiresAt);
  const now = new Date();
  
  if (now > expirationDate) {
    return "Expired";
  }
  
  const diffMs = expirationDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1) {
    return `${diffDays} days`;
  } else if (diffDays === 1) {
    return "1 day";
  }
  
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffHours > 1) {
    return `${diffHours} hours`;
  } else if (diffHours === 1) {
    return "1 hour";
  }
  
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffMinutes} minutes`;
};
