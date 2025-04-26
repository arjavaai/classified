import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "firebase/auth";


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

// Initialize Firebase with debug logging
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

if (!hasValidConfig) {
  console.error("Firebase configuration is missing required values. Check your .env.local file.");
  // Fall back to hardcoded values for development only
  if (process.env.NODE_ENV === 'development') {
    console.log("Falling back to hardcoded values in development mode");
    firebaseConfig.apiKey = firebaseConfig.apiKey || "AIzaSyDp20G5dihP-qT5RKwm6069eBectMLT67k";
    firebaseConfig.authDomain = firebaseConfig.authDomain || "classified-5951c.firebaseapp.com";
    firebaseConfig.projectId = firebaseConfig.projectId || "classified-5951c";
    firebaseConfig.storageBucket = firebaseConfig.storageBucket || "classified-5951c.firebasestorage.app";
    firebaseConfig.messagingSenderId = firebaseConfig.messagingSenderId || "778890110423";
    firebaseConfig.appId = firebaseConfig.appId || "1:778890110423:web:c226a31df27db70a7bd792";
    console.log("Using fallback values:", { 
      ...firebaseConfig, 
      apiKey: "HIDDEN" 
    });
  }
}

let app;
try {
  if (getApps().length) {
    console.log("Firebase already initialized, getting existing app");
    app = getApps()[0];
  } else {
    console.log("Creating new Firebase app instance");
    app = initializeApp(firebaseConfig);
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

const auth = getAuth(app);
console.log("Firebase Auth initialized", auth ? "successfully" : "failed");

// Authentication functions
export const signUp = async (email: string, password: string) => {
  console.log(`Attempting to sign up user with email: ${email.substring(0, 3)}...`);
  try {
    console.log("Calling createUserWithEmailAndPassword");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created successfully, sending verification email");
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Error in signUp:", error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
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

// Export for debugging
console.log("Firebase module loaded and exporting auth");
export { auth }; 