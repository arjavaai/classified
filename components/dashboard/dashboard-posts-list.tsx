"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash, Eye, TrendingUp, Plus, Clock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { fetchUserAds, toggleAdStatus, deleteAd, Ad, isAdExpired, formatDate, getTimeRemaining } from "@/lib/ad-utils";

interface AdWithUI extends Ad {
  active: boolean;
  isDeleting: boolean;
  isToggling: boolean;
}

interface DashboardPostsListProps {
  limit?: number;
  isOverview?: boolean;
}

export default function DashboardPostsList({ limit, isOverview = false }: DashboardPostsListProps) {
  const { user } = useAuth();
  const [ads, setAds] = useState<AdWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ads when component mounts or user changes
  useEffect(() => {
    const loadAds = async () => {
      if (!user) {
        console.log('No user found, skipping ad fetch');
        setLoading(false);
        return;
      }

      console.log('User authenticated, fetching ads for:', user.uid);
      try {
        setLoading(true);
        setError(null);
        
        // Fetch ads with the user ID
        console.log('Calling fetchUserAds with user ID:', user.uid);
        const userAds = await fetchUserAds(user.uid, limit || undefined);
        console.log('Received ads from fetchUserAds:', userAds);
        
        if (userAds.length === 0) {
          console.log('No ads found for user');
        }
        
        // Convert to AdWithUI
        const adsWithUI = userAds.map(ad => {
          console.log('Processing ad for UI:', ad.id, ad.title);
          return {
            ...ad,
            active: ad.status === 'active',
            isDeleting: false,
            isToggling: false
          };
        });
        
        console.log('Setting ads state with:', adsWithUI.length, 'ads');
        setAds(adsWithUI);
      } catch (err: any) {
        console.error('Error loading ads:', err);
        setError('Failed to load your ads. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, [user, limit]);

  // Toggle ad active status
  const toggleAdActive = async (adId: string) => {
    // Find the ad and update its isToggling state
    setAds(prevAds => 
      prevAds.map(ad => 
        ad.id === adId ? { ...ad, isToggling: true } : ad
      )
    );

    // Find the current active state
    const ad = ads.find(ad => ad.id === adId);
    if (!ad) return;

    try {
      // Update in Firebase
      const newActiveState = !ad.active;
      const success = await toggleAdStatus(adId, newActiveState);
      
      if (success) {
        // Update local state
        setAds(prevAds => 
          prevAds.map(ad => 
            ad.id === adId ? { ...ad, active: newActiveState, isToggling: false } : ad
          )
        );
      } else {
        throw new Error('Failed to update ad status');
      }
    } catch (err) {
      console.error('Error toggling ad status:', err);
      // Reset the toggling state
      setAds(prevAds => 
        prevAds.map(ad => 
          ad.id === adId ? { ...ad, isToggling: false } : ad
        )
      );
    }
  };

  // Delete an ad
  const handleDeleteAd = async (adId: string) => {
    if (!confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
      return;
    }

    // Set deleting state
    setAds(prevAds => 
      prevAds.map(ad => 
        ad.id === adId ? { ...ad, isDeleting: true } : ad
      )
    );

    try {
      const success = await deleteAd(adId);
      
      if (success) {
        // Remove from local state
        setAds(prevAds => prevAds.filter(ad => ad.id !== adId));
      } else {
        throw new Error('Failed to delete ad');
      }
    } catch (err) {
      console.error('Error deleting ad:', err);
      // Reset the deleting state
      setAds(prevAds => 
        prevAds.map(ad => 
          ad.id === adId ? { ...ad, isDeleting: false } : ad
        )
      );
    }
  };

  const displayAds = limit ? ads.slice(0, limit) : ads;

  // Debug information about the current state
  useEffect(() => {
    console.log('Current dashboard state:', {
      loading,
      error,
      adsCount: ads.length,
      user: user ? user.uid : 'none'
    });
  }, [loading, error, ads, user]);

  return (
    <div className="divide-y">
      {/* Loading state */}
      {loading && (
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <p className="text-gray-500">Loading your ads...</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4 text-red-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 transition text-white px-4 py-2 rounded-md font-semibold inline-flex items-center"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Debug info for development */}
      {!loading && !error && user && ads.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
          <p className="font-medium">Debug Info:</p>
          <p>User ID: {user.uid}</p>
          <p>Authenticated: {user.emailVerified ? 'Yes' : 'No'}</p>
          <p>No ads found for this user.</p>
        </div>
      )}

      {/* Ad listings */}
      {!loading && !error && displayAds.map((ad) => (
        <div key={ad.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
            {ad.photos && ad.photos.length > 0 ? (
              <img 
                src={ad.photos[0]} 
                alt={ad.title} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                <span className="text-sm">No Image</span>
              </div>
            )}
            
            {/* Ad type badge */}
            <div className={`absolute top-0 right-0 px-2 py-1 text-xs font-semibold ${ad.adType === 'premium' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-400 text-blue-900'}`}>
              {ad.adType === 'premium' ? 'Premium' : 'Free'}
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-primary font-medium text-lg">{ad.title}</h3>
              
              {/* Expiration info */}
              <div className="flex items-center text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span className={`${isAdExpired(ad.expiresAt) ? 'text-red-500' : 'text-gray-500'}`}>
                  {isAdExpired(ad.expiresAt) ? 'Expired' : `Expires in: ${getTimeRemaining(ad.expiresAt)}`}
                </span>
              </div>
            </div>
            
            {/* Status badge */}
            <div className="mt-1 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${ad.status === 'active' ? 'bg-green-100 text-green-800' : ad.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {ad.status === 'active' ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </>
                ) : ad.status === 'pending' ? (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Inactive
                  </>
                )}
              </span>
            </div>
            
            <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link 
                href={`/listing/${ad.id}`} 
                className="flex items-center text-gray-700 hover:text-primary transition"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Ad
              </Link>
              <Link 
                href={`/promote-ad?id=${ad.id}`} 
                className="flex items-center text-gray-700 hover:text-primary transition"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Promote Ad
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={ad.active}
                onChange={() => toggleAdActive(ad.id)}
                disabled={ad.isToggling || isAdExpired(ad.expiresAt)}
              />
              <div className={`w-11 h-6 ${isAdExpired(ad.expiresAt) ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30'} rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}>
                {ad.isToggling && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                )}
              </div>
            </label>
            
            <Link 
              href={`/create-ad/edit/${ad.id}`}
              className="text-gray-600 hover:text-primary transition"
            >
              <Edit className="h-5 w-5" />
            </Link>
            
            <button 
              className="text-gray-600 hover:text-red-500 transition"
              onClick={() => handleDeleteAd(ad.id)}
              disabled={ad.isDeleting}
            >
              {ad.isDeleting ? (
                <Loader2 className="h-5 w-5 animate-spin text-red-500" />
              ) : (
                <Trash className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      ))}
      
      {/* View all link for overview mode */}
      {isOverview && !loading && !error && displayAds.length > 0 && (
        <div className="p-4 text-center">
          <Link 
            href="/dashboard?tab=posts" 
            className="text-primary hover:text-primary/80 font-medium transition"
          >
            View All Ads
          </Link>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && displayAds.length === 0 && (
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4 text-gray-400">
            <Plus className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No ads found</h3>
          <p className="text-gray-500 mb-4">
            You haven't created any ads yet. Get started by creating your first ad.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/create-ad"
              className="bg-primary hover:bg-primary/90 transition text-white px-4 py-2 rounded-md font-semibold inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Create Ad
            </Link>
            
            <Link
              href="/debug"
              className="bg-gray-200 hover:bg-gray-300 transition text-gray-800 px-4 py-2 rounded-md font-semibold inline-flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-2" /> Debug Tools
            </Link>
          </div>
          
          {user && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
              <p className="font-medium">Debugging Info:</p>
              <p>User ID: {user.uid}</p>
              <p>Authenticated: {user.emailVerified ? 'Yes' : 'No'}</p>
              <p className="mt-2">If you've created ads but don't see them here, try using the Debug Tools.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
