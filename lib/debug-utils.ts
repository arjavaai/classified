import { db } from './firebase';
import { collection, addDoc, serverTimestamp, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { generateUniqueAdId } from './firebase';
import { deleteAd } from './ad-utils';

/**
 * Creates sample ads for a user to help with debugging
 * @param userId The user ID to create ads for
 * @param count Number of sample ads to create
 * @returns A promise that resolves to an array of created ad IDs
 */
export const createSampleAdsForUser = async (userId: string, count: number = 3): Promise<string[]> => {
  if (!db) {
    console.error("Firestore not initialized");
    return [];
  }

  const adIds: string[] = [];
  const states = ["California", "New York", "Florida", "Texas", "Illinois"];
  const cities = ["Los Angeles", "New York", "Miami", "Houston", "Chicago"];
  const titles = [
    "VIP Escort Service Available Now",
    "Premium Companion for Upscale Clients",
    "New in Town - Limited Time Only",
    "Exclusive GFE Experience",
    "Top Rated Independent Provider"
  ];
  const descriptions = [
    "I offer a premium experience for discerning clients. Contact me for an unforgettable time.",
    "Available for dinner dates, travel companionship, and private meetings. Serious inquiries only.",
    "Just arrived in town and looking to meet new friends. Limited availability.",
    "Providing a genuine girlfriend experience with no rush. Let's create memories together.",
    "Highly reviewed independent provider with a passion for connection. Respectful gentlemen only."
  ];
  const categories = ["escorts", "massage", "companions"];
  const ages = ["21", "24", "26", "28", "30"];
  const adTypes = ["free", "premium"];
  
  try {
    console.log(`Creating ${count} sample ads for user ${userId}`);
    
    for (let i = 0; i < count; i++) {
      // Generate random data for this ad
      const stateIndex = Math.floor(Math.random() * states.length);
      const titleIndex = Math.floor(Math.random() * titles.length);
      const descIndex = Math.floor(Math.random() * descriptions.length);
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const ageIndex = Math.floor(Math.random() * ages.length);
      const adTypeIndex = Math.floor(Math.random() * adTypes.length);
      
      // Create a unique ad ID
      const uniqueAdId = await generateUniqueAdId();
      
      // Set expiration date (7 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      // Create the ad data with exact structure matching the manual form
      const adData = {
        // Basic info
        userId: userId, // This is critical for querying
        adType: adTypes[adTypeIndex],
        status: adTypes[adTypeIndex] === 'premium' ? 'active' : 'pending',
        
        // Personal info
        name: `Sample ${i+1}`,
        category: categories[categoryIndex],
        age: ages[ageIndex],
        contactPreference: "both",
        email: "sample@example.com",
        phone: "9999999999",
        whatsapp: true,
        sms: true,
        
        // Location
        state: states[stateIndex],
        city: cities[stateIndex].toLowerCase().replace(/ /g, '-'), // Match city to state with proper slug format
        
        // Ad details
        title: `${titles[titleIndex]} ${i+1}`,
        description: descriptions[descIndex],
        
        // Characteristics - adding these to match manual form structure
        ethnicity: ["Ebony"],
        nationality: ["Bulgarian", "American"],
        bodyType: ["Curvy"],
        breastType: ["Natural"],
        hairColor: ["Brown Hair", "Blond Hair"],
        services: ["Oral", "Role play"],
        catersTo: ["Men"],
        placeOfService: ["At home"],
        
        // Rates - using exact same structure as manual form
        incallRates: {
          "0.5": "1",
          "1": "2",
          "2": "3",
          "3": "4",
          "6": "5",
          "12": "6",
          "24": "7",
          "48": "8",
          "overnight": "9"
        },
        outcallRates: {
          "0.5": "6",
          "1": "8",
          "2": "5",
          "3": "8",
          "6": "4",
          "12": "6",
          "24": "8",
          "48": "8",
          "overnight": "7"
        },
        
        // Photos - using sample images
        photos: [
          "https://firebasestorage.googleapis.com/v0/b/skluva.firebasestorage.app/o/ads%2FKmaLFCksNJZ7r8bOERYfRxNInXH2%2FKmaLFCksNJZ7r8bOERYfRxNInXH2_1747217153332.jpeg?alt=media&token=4da38b5a-f570-4af7-a884-38fc3ed063c6",
          "https://firebasestorage.googleapis.com/v0/b/skluva.firebasestorage.app/o/ads%2FKmaLFCksNJZ7r8bOERYfRxNInXH2%2FKmaLFCksNJZ7r8bOERYfRxNInXH2_1747217153347.jpeg?alt=media&token=9724e8ec-37df-4ee9-8469-87c938a13bce",
          "https://firebasestorage.googleapis.com/v0/b/skluva.firebasestorage.app/o/ads%2FKmaLFCksNJZ7r8bOERYfRxNInXH2%2FKmaLFCksNJZ7r8bOERYfRxNInXH2_1747217153316.jpeg?alt=media&token=18e1b4c8-f899-4089-806d-dab85511b1f5",
          "https://firebasestorage.googleapis.com/v0/b/skluva.firebasestorage.app/o/ads%2FKmaLFCksNJZ7r8bOERYfRxNInXH2%2FKmaLFCksNJZ7r8bOERYfRxNInXH2_1747217153550.jpg?alt=media&token=91661650-8955-4494-ac7c-9d735373b8e0"
        ],
        
        // Expiration date
        expiresAt: expiresAt.toISOString(),
        
        // Terms
        termsAccepted: true,
        termsAcceptedAt: new Date().toISOString(),
        
        // The unique ad ID will be added by the createAd function
        adId: uniqueAdId
      };
      
      console.log(`Creating sample ad with data:`, adData);
      
      // Add the ad to Firestore
      const docRef = await addDoc(collection(db, "ads"), adData);
      console.log(`Created sample ad with ID: ${docRef.id} and unique ad ID: ${uniqueAdId}`);
      adIds.push(docRef.id);
    }
    
    return adIds;
  } catch (error) {
    console.error("Error creating sample ads:", error);
    return adIds;
  }
};

/**
 * Debug function to check if Firestore is properly initialized
 */
export const checkFirestoreConnection = async (): Promise<boolean> => {
  if (!db) {
    console.error("Firestore not initialized");
    return false;
  }
  
  try {
    // Try to add a test document to a debug collection
    const testData = {
      timestamp: serverTimestamp(),
      message: "Firestore connection test"
    };
    
    const docRef = await addDoc(collection(db, "debug_logs"), testData);
    console.log("Firestore connection successful, test document ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Firestore connection failed:", error);
    return false;
  }
};
