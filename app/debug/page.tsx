"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { createSampleAdsForUser, checkFirestoreConnection } from "@/lib/debug-utils";
import { fetchUserAds, deleteAd } from "@/lib/ad-utils";
import Link from "next/link";
import { Trash, Loader2, RefreshCw } from "lucide-react";

export default function DebugPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adCount, setAdCount] = useState(3);
  const [createdAdIds, setCreatedAdIds] = useState<string[]>([]);
  const [firestoreStatus, setFirestoreStatus] = useState<string | null>(null);
  const [userAds, setUserAds] = useState<any[]>([]);
  const [deletingAdIds, setDeletingAdIds] = useState<string[]>([]);

  const handleCreateSampleAds = async () => {
    if (!user) {
      setError("You must be logged in to create sample ads");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);
    
    try {
      const adIds = await createSampleAdsForUser(user.uid, adCount);
      setCreatedAdIds(adIds);
      setMessage(`Successfully created ${adIds.length} sample ads for user ${user.uid}`);
      
      // Refresh the list of user ads
      await checkUserAds();
    } catch (err: any) {
      console.error("Error creating sample ads:", err);
      setError(`Error creating sample ads: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkFirestore = async () => {
    setLoading(true);
    setFirestoreStatus(null);
    
    try {
      const isConnected = await checkFirestoreConnection();
      setFirestoreStatus(isConnected ? "Connected successfully to Firestore" : "Failed to connect to Firestore");
    } catch (err: any) {
      setFirestoreStatus(`Error checking Firestore: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkUserAds = async () => {
    if (!user) {
      setError("You must be logged in to check ads");
      return;
    }

    setLoading(true);
    try {
      const ads = await fetchUserAds(user.uid);
      setUserAds(ads);
      setMessage(`Found ${ads.length} ads for user ${user.uid}`);
    } catch (err: any) {
      setError(`Error fetching user ads: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAd = async (adId: string) => {
    if (!confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
      return;
    }
    
    // Add to deleting state
    setDeletingAdIds(prev => [...prev, adId]);
    
    try {
      const success = await deleteAd(adId);
      
      if (success) {
        // Remove from local state
        setUserAds(prevAds => prevAds.filter(ad => ad.id !== adId));
        setMessage(`Successfully deleted ad ${adId}`);
      } else {
        throw new Error('Failed to delete ad');
      }
    } catch (err: any) {
      console.error('Error deleting ad:', err);
      setError(`Error deleting ad: ${err.message}`);
    } finally {
      // Remove from deleting state
      setDeletingAdIds(prev => prev.filter(id => id !== adId));
    }
  };
  
  const handleDeleteAllAds = async () => {
    if (!user) {
      setError("You must be logged in to delete ads");
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ALL ${userAds.length} ads? This action cannot be undone.`)) {
      return;
    }
    
    setLoading(true);
    let successCount = 0;
    let errorCount = 0;
    
    try {
      for (const ad of userAds) {
        setDeletingAdIds(prev => [...prev, ad.id]);
        try {
          const success = await deleteAd(ad.id);
          if (success) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (err) {
          console.error(`Error deleting ad ${ad.id}:`, err);
          errorCount++;
        } finally {
          setDeletingAdIds(prev => prev.filter(id => id !== ad.id));
        }
      }
      
      // Refresh the ads list
      if (successCount > 0) {
        setUserAds([]);
        setMessage(`Successfully deleted ${successCount} ads. Failed to delete ${errorCount} ads.`);
      } else if (errorCount > 0) {
        setError(`Failed to delete ${errorCount} ads.`);
      }
    } catch (err: any) {
      setError(`Error during bulk delete: ${err.message}`);
    } finally {
      setLoading(false);
      setDeletingAdIds([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Debug Tools</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        {user ? (
          <div className="space-y-2">
            <p><span className="font-medium">User ID:</span> {user.uid}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Email Verified:</span> {user.emailVerified ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p className="text-red-500">Not logged in. Please log in to use debug tools.</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Firestore Connection Test</h2>
        <button 
          onClick={checkFirestore}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Firestore Connection"}
        </button>
        
        {firestoreStatus && (
          <div className={`mt-4 p-3 rounded-md ${firestoreStatus.includes("Failed") || firestoreStatus.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {firestoreStatus}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Sample Ads</h2>
        {user ? (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <label className="font-medium">Number of ads to create:</label>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={adCount} 
                onChange={(e) => setAdCount(parseInt(e.target.value))} 
                className="border border-gray-300 rounded-md px-3 py-2 w-20"
              />
            </div>
            
            <button 
              onClick={handleCreateSampleAds}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Sample Ads"}
            </button>
          </>
        ) : (
          <p className="text-red-500">Please log in to create sample ads.</p>
        )}
        
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {createdAdIds.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Created Ad IDs:</h3>
            <ul className="list-disc list-inside">
              {createdAdIds.map((id, index) => (
                <li key={index}>{id}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Check User Ads</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <button 
            onClick={checkUserAds}
            disabled={loading || !user}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Check User Ads
              </>
            )}
          </button>
          
          {userAds.length > 0 && (
            <button 
              onClick={handleDeleteAllAds}
              disabled={loading || deletingAdIds.length > 0}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete All Ads
                </>
              )}
            </button>
          )}
        </div>
        
        {userAds.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Found {userAds.length} ads:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">Created</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userAds.map((ad, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-2 px-4 border-b">{ad.id.substring(0, 8)}...</td>
                      <td className="py-2 px-4 border-b">{ad.title}</td>
                      <td className="py-2 px-4 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ad.status === 'active' ? 'bg-green-100 text-green-800' : 
                          ad.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {ad.createdAt && ad.createdAt.toDate ? 
                          ad.createdAt.toDate().toLocaleString() : 
                          'Unknown'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleDeleteAd(ad.id)}
                          disabled={deletingAdIds.includes(ad.id)}
                          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 flex items-center"
                          title="Delete this ad"
                        >
                          {deletingAdIds.includes(ad.id) ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash className="h-5 w-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : userAds.length === 0 && !loading && message ? (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-md">
            No ads found for this user.
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <Link 
          href="/dashboard?tab=posts" 
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
