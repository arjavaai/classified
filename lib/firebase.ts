import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, Auth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, Firestore, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Firebase configuration with fallback to hardcoded values
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
};

// Check if any values are missing or undefined
const hasValidConfig = 
  !!firebaseConfig.apiKey && 
  !!firebaseConfig.authDomain && 
  !!firebaseConfig.projectId;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize Firebase with debug logging
if (isBrowser) {
  console.log("Initializing Firebase with config:", { 
    ...firebaseConfig, 
    apiKey: firebaseConfig.apiKey ? "PRESENT" : "MISSING",
    authDomain: firebaseConfig.authDomain ? "PRESENT" : "MISSING",
    projectId: firebaseConfig.projectId ? "PRESENT" : "MISSING",
    // Display if env vars are loaded
    hasValidConfig,
    usingEnvVars: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    usingHardcoded: !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  });
}

// Always provide fallback values in development mode to prevent crashes
if ((!hasValidConfig && isBrowser) || process.env.NODE_ENV === 'development') {
  if (!hasValidConfig) {
    console.warn("Some Firebase configuration values are missing. Using fallback values in development mode.");
  }
  
  // Use existing values or fallback to hardcoded values
  firebaseConfig.apiKey = firebaseConfig.apiKey || "AIzaSyBkhEAy18wAhpxkUJwv0XoGTfUbOdq_y3Y";
  firebaseConfig.authDomain = firebaseConfig.authDomain || "skluva.firebaseapp.com";
  firebaseConfig.projectId = firebaseConfig.projectId || "skluva";
  firebaseConfig.storageBucket = firebaseConfig.storageBucket || "skluva.firebasestorage.app";
  firebaseConfig.messagingSenderId = firebaseConfig.messagingSenderId || "567077871212";
  firebaseConfig.appId = firebaseConfig.appId || "1:567077871212:web:65517af125e7ce809f8249";
  
  console.log("Using fallback values:", { 
    ...firebaseConfig, 
    apiKey: "HIDDEN" 
  });
}

let app: FirebaseApp | undefined;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Only initialize Firebase in browser environments
if (isBrowser) {
  try {
    if (getApps().length) {
      console.log("Firebase already initialized, getting existing app");
      app = getApps()[0];
    } else {
      console.log("Creating new Firebase app instance");
      app = initializeApp(firebaseConfig);
    }
    
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase Auth initialized", auth ? "successfully" : "failed");
    console.log("Firebase Firestore initialized", db ? "successfully" : "failed");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    // Don't throw error, just log it to prevent build failures
  }
} else {
  console.log("Skipping Firebase initialization in SSR context");
}

// Generate a unique customer ID (8 characters alphanumeric)
const generateUniqueCustomerId = async (): Promise<string> => {
  if (!db) {
    console.error("Firestore not initialized");
    return "TEMPID" + Math.random().toString(36).substring(2, 10);
  }
  
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters like 0, O, 1, I
  let customerId: string = '';
  let isUnique = false;
  
  // Keep generating until we find a unique ID
  while (!isUnique) {
    customerId = '';
    // Generate 8 character ID
    for (let i = 0; i < 8; i++) {
      customerId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    console.log(`Generated customer ID candidate: ${customerId}`);
    
    // Check if this ID already exists in the database
    try {
      const customerQuery = query(collection(db, "users"), where("customerId", "==", customerId));
      const querySnapshot = await getDocs(customerQuery);
      
      if (querySnapshot.empty) {
        // No matching document found, so this ID is unique
        isUnique = true;
        console.log(`Customer ID ${customerId} is unique and will be used`);
      } else {
        console.log(`Customer ID ${customerId} already exists, generating a new one`);
      }
    } catch (error) {
      console.error("Error checking customer ID uniqueness:", error);
      // In case of error, we'll just assume the ID is unique to avoid infinite loops
      isUnique = true;
    }
  }
  
  return customerId;
};

// Generate a unique ad ID (10 characters alphanumeric with prefix)
const generateUniqueAdId = async (): Promise<string> => {
  if (!db) {
    console.error("Firestore not initialized");
    return "AD" + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  }
  
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters like 0, O, 1, I
  let adId: string = '';
  let isUnique = false;
  
  // Keep generating until we find a unique ID
  while (!isUnique) {
    // Start with 'AD' prefix
    adId = 'AD';
    
    // Generate 8 more characters for the ID
    for (let i = 0; i < 8; i++) {
      adId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    console.log(`Generated ad ID candidate: ${adId}`);
    
    // Check if this ID already exists in the database
    try {
      const adQuery = query(collection(db, "ads"), where("adId", "==", adId));
      const querySnapshot = await getDocs(adQuery);
      
      if (querySnapshot.empty) {
        // No matching document found, so this ID is unique
        isUnique = true;
        console.log(`Ad ID ${adId} is unique and will be used`);
      } else {
        console.log(`Ad ID ${adId} already exists, generating a new one`);
      }
    } catch (error) {
      console.error("Error checking ad ID uniqueness:", error);
      // In case of error, we'll just assume the ID is unique to avoid infinite loops
      isUnique = true;
    }
  }
  
  return adId;
};

// Authentication functions
export const signUp = async (email: string, password: string) => {
  if (!auth || !db) {
    console.error("Firebase not initialized");
    return { success: false, error: "Firebase not initialized" };
  }
  
  console.log(`Attempting to sign up user with email: ${email.substring(0, 3)}...`);
  try {
    console.log("Calling createUserWithEmailAndPassword");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Generate a unique customer ID
    const customerId = await generateUniqueCustomerId();
    
    // Create a user profile in Firestore
    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
      email: email,
      customerId: customerId,
      createdAt: new Date(),
      emailVerified: userCredential.user.emailVerified || false,
    });
    
    console.log(`User created successfully with customer ID: ${customerId}, sending verification email`);
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");
    
    return { 
      success: true, 
      user: userCredential.user,
      customerId: customerId
    };
  } catch (error: any) {
    console.error("Error in signUp:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  if (!auth) {
    console.error("Firebase Auth not initialized");
    return { success: false, error: "Firebase Auth not initialized" };
  }
  
  console.log(`Attempting to sign in user with email: ${email.substring(0, 3)}...`);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Sign in successful");
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Error in signIn:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (email: string) => {
  if (!auth) {
    console.error("Firebase Auth not initialized");
    return { success: false, error: "Firebase Auth not initialized" };
  }
  
  console.log(`Attempting to send password reset email to: ${email.substring(0, 3)}...`);
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
    return { success: true };
  } catch (error: any) {
    console.error("Error in resetPassword:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  if (!auth) {
    console.error("Firebase Auth not initialized");
    return { success: false, error: "Firebase Auth not initialized" };
  }
  
  console.log("Attempting to log out user");
  try {
    await signOut(auth);
    console.log("Logout successful");
    return { success: true };
  } catch (error: any) {
    console.error("Error in logOut:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

// Create an ad in Firestore
export const createAd = async (adData: any) => {
  if (!db) {
    console.error("Firebase Firestore not initialized");
    return { success: false, error: "Firebase Firestore not initialized" };
  }
  
  try {
    const adsCollectionRef = collection(db, "ads");
    const docRef = await addDoc(adsCollectionRef, {
      ...adData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: adData.adType === 'premium' ? "active" : "pending"
    });
    
    console.log("Ad created with Firebase document ID:", docRef.id);
    return { success: true, adId: docRef.id, uniqueAdId: docRef.id };
  } catch (error: any) {
    console.error("Error creating ad:", error);
    return { success: false, error: error.message };
  }
};

// Export Firebase services
export const storage = isBrowser ? getStorage() : null;

// Export for debugging
if (isBrowser) {
  console.log("Firebase module loaded and exporting auth and storage");
}
export { auth, db, generateUniqueAdId };