"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/lib/context/auth-context";
// Import dashboard components with correct paths
import DashboardOverview from '@/components/dashboard/dashboard-overview';
import DashboardPosts from '@/components/dashboard/dashboard-posts';
import DashboardPaymentHistory from '@/components/dashboard/dashboard-payment-history';
import DashboardAccountSettings from '@/components/dashboard/dashboard-account-settings';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'posts', 'payment-history', 'account-settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user && <p className="text-sm text-gray-500 mb-4">Welcome, {user.displayName || user.email}</p>}
        
        {/* Simple horizontal tab navigation */}
        <div className="flex overflow-x-auto pb-3 hide-scrollbar border-b">
          <button
            onClick={() => handleTabChange('overview')}
            className={`flex items-center whitespace-nowrap mr-2 ${activeTab === 'overview' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}`}
          >
            <span>Overview</span>
          </button>
          <button
            onClick={() => handleTabChange('posts')}
            className={`flex items-center whitespace-nowrap mr-2 ${activeTab === 'posts' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}`}
          >
            <span>Posts</span>
          </button>
          <button
            onClick={() => handleTabChange('payment-history')}
            className={`flex items-center whitespace-nowrap mr-2 ${activeTab === 'payment-history' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}`}
          >
            <span>Payment History</span>
          </button>
          <button
            onClick={() => handleTabChange('account-settings')}
            className={`flex items-center whitespace-nowrap ${activeTab === 'account-settings' ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}`}
          >
            <span>Account Settings</span>
          </button>
        </div>
      </div>
      
      <main>
        {activeTab === 'overview' && <DashboardOverview />}
        {activeTab === 'posts' && <DashboardPosts />}
        {activeTab === 'payment-history' && <DashboardPaymentHistory />}
        {activeTab === 'account-settings' && <DashboardAccountSettings />}
      </main>
    </div>
  );
}
