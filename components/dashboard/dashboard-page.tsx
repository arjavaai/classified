"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/lib/context/auth-context";
import Link from 'next/link';
import { 
  LayoutGrid, 
  FileText, 
  CreditCard, 
  Download,
  Calendar,
  Filter,
  X,
  Menu,
  Plus
} from 'lucide-react';

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
  const [dateRange, setDateRange] = useState('');
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'posts', 'payment-history', 'account-settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Mock data
  const totalAdsPosted = 0;
  const paymentHistory = [
    { id: 1, units: 1330, price: 498.75, date: "January 17, 2025", status: "Success" },
    { id: 2, units: 1330, price: 498.75, date: "January 17, 2025", status: "Success" },
    { id: 3, units: 1660, price: 605.9, date: "January 15, 2025", status: "Success" }
  ];
  
  // Sample posts data
  const samplePosts = [
    { id: 1, title: "11 April-3", date: "11 April 2025", imageUrl: "/images/placeholder-1.jpg", active: true },
    { id: 2, title: "11 April-2", date: "11 April 2025", imageUrl: "/images/placeholder-2.jpg", active: true },
    { id: 3, title: "11 April-1", date: "11 April 2025", imageUrl: "/images/placeholder-3.jpg", active: true },
    { id: 4, title: "No Z cal ts", date: "10 April 2025", imageUrl: "/images/placeholder-4.jpg", active: true },
    { id: 5, title: "Hhghh", date: "10 May 2025", imageUrl: "/images/placeholder-5.jpg", active: true }
  ];

  return (
    <div className="flex w-full bg-[#f0f4f8]">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block w-[176px] min-w-[176px] bg-white h-screen border-r border-gray-200">
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center p-2 bg-[#e8f2ff] text-[#0066ff] rounded mb-4">
            <LayoutGrid className="h-5 w-5 mr-2" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link href="/dashboard?tab=posts" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <FileText className="h-5 w-5 mr-2" />
            <span>Posts</span>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mr-3"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-medium">Dashboard</h1>
          </div>
          
          {/* Desktop title */}
          <div className="hidden md:block">
            <h1 className="text-xl font-medium">Dashboard</h1>
          </div>
          
          <div className="text-sm text-gray-600">
            Customer ID - #0991014946
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleTabChange('overview')}
                className={`flex items-center p-2 rounded ${activeTab === 'overview' ? 'bg-[#e8f2ff] text-[#0066ff]' : 'text-gray-700'}`}
              >
                <LayoutGrid className="h-5 w-5 mr-2" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handleTabChange('posts')}
                className={`flex items-center p-2 rounded ${activeTab === 'posts' ? 'bg-[#e8f2ff] text-[#0066ff]' : 'text-gray-700'}`}
              >
                <FileText className="h-5 w-5 mr-2" />
                <span>Posts</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'overview' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Overview</h2>
                <div className="flex items-center gap-2">
                  <Link 
                    href="/create-ad" 
                    className="bg-[#0066ff] text-white rounded px-4 py-2 text-sm flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Post Your Ad</span>
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full md:w-auto mr-2">
                  <button 
                    className="flex items-center justify-between w-full md:w-auto bg-white border border-gray-300 rounded px-4 py-2 text-sm"
                    onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
                  >
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Date Range</span>
                    </div>
                    <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDateRangeOpen && (
                    <div className="absolute top-full left-0 md:right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg p-4 z-10 w-full md:w-auto">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <input type="date" className="border rounded px-2 py-1 text-sm" />
                          <span className="text-gray-500">to</span>
                          <input type="date" className="border rounded px-2 py-1 text-sm" />
                        </div>
                        <button className="bg-blue-600 text-white rounded py-1 text-sm">Apply</button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex">
                  <button className="flex items-center gap-1 bg-[#0066ff] text-white rounded px-3 py-2 text-sm mr-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  
                  <button className="flex items-center gap-1 bg-gray-800 text-white rounded px-3 py-2 text-sm">
                    <X className="h-4 w-4" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                {/* Total Ads Posted */}
                <div className="bg-white rounded-md shadow-sm p-4">
                  <div className="flex items-center">
                    <div className="bg-[#e8f2ff] p-3 rounded-md mr-4">
                      <svg className="h-6 w-6 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path d="M8 11l2 2 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-gray-500 font-medium">Total Ads posted</h3>
                      <p className="text-3xl font-bold">{totalAdsPosted}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment History */}
              <div className="bg-white rounded-md shadow-sm mb-6">
                <div className="p-4 border-b border-gray-100 flex items-center">
                  <div className="bg-[#e8f2ff] p-2 rounded-md mr-2">
                    <CreditCard className="h-5 w-5 text-[#0066ff]" />
                  </div>
                  <h3 className="text-gray-700 font-medium">Payment history</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Units</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Act</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-t border-gray-100">
                          <td className="px-4 py-3">{payment.id}</td>
                          <td className="px-4 py-3">{payment.units}</td>
                          <td className="px-4 py-3">{payment.price}</td>
                          <td className="px-4 py-3">{payment.date}</td>
                          <td className="px-4 py-3">
                            <span className="text-green-500">{payment.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-gray-500 hover:text-gray-700">
                              <Download className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Posts */}
              <div className="bg-white rounded-md shadow-sm mb-6">
                <div className="p-4 border-b border-gray-100 flex items-center">
                  <div className="bg-[#e8f2ff] p-2 rounded-md mr-2">
                    <FileText className="h-5 w-5 text-[#0066ff]" />
                  </div>
                  <h3 className="text-gray-700 font-medium">Posts</h3>
                </div>
                
                {samplePosts.length > 0 ? (
                  <div className="divide-y">
                    {samplePosts.slice(0, 5).map((post) => (
                      <div key={post.id} className="p-4 flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-md mr-4 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-[#0066ff]">{post.title}</h4>
                          <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    Not found !
                  </div>
                )}
              </div>
            </>
          )}
          
          {activeTab === 'posts' && <DashboardPosts />}
          {activeTab === 'payment-history' && <DashboardPaymentHistory />}
          {activeTab === 'account-settings' && <DashboardAccountSettings />}
        </div>
        
        {/* Footer - Mobile only */}
        <div className="md:hidden p-4 mt-6 text-center text-sm text-gray-600">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/sitemap" className="hover:text-[#0066ff]">Sitemap</Link>
            <Link href="/privacy" className="hover:text-[#0066ff]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0066ff]">Terms & Conditions</Link>
            <Link href="/faq" className="hover:text-[#0066ff]">FAQ</Link>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/contact" className="hover:text-[#0066ff]">Contact Us</Link>
            <Link href="/promote" className="hover:text-[#0066ff]">Promote Your ads</Link>
          </div>
          <div className="flex justify-center items-center space-x-3 mb-4">
            <span>Follow Us:</span>
            <Link href="#" className="bg-black text-white p-1 rounded-md">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </Link>
            <Link href="#" className="bg-pink-500 text-white p-1 rounded-md">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>
          <p>drazunga.co.uk</p>
        </div>
      </div>
    </div>
  );
}
