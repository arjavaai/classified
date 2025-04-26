"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export default function FirebaseTestPage() {
  const [status, setStatus] = useState("Checking Firebase initialization...");

  useEffect(() => {
    try {
      console.log("Firebase auth in test page:", auth);
      const isInitialized = !!auth;
      console.log("Is Firebase initialized:", isInitialized);
      
      if (isInitialized) {
        setStatus("Firebase is properly initialized! ✅");
      } else {
        setStatus("Firebase initialization issue! ❌");
      }
    } catch (error) {
      console.error("Error checking Firebase:", error);
      setStatus(`Firebase error: ${error}`);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Firebase Test Page</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="mb-4">Status: <span className={status.includes("✅") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{status}</span></p>
        <p className="text-sm text-gray-500">Check the browser console for more details.</p>
      </div>
    </div>
  );
} 