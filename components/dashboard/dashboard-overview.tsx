"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Filter, X, CreditCard, Image, Plus } from "lucide-react";
import DashboardPaymentHistory from "./dashboard-payment-history";
import DashboardPostsList from "./dashboard-posts-list";

export default function DashboardOverview() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  
  // Mock data
  const totalAdsPosted = 132;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <button 
            className={`${isFilterApplied ? 'btn btn-primary' : 'btn btn-secondary'} flex items-center`}
            onClick={() => setIsFilterActive(!isFilterActive)}
          >
            <Calendar className="h-5 w-5 mr-2" />
            <span>
              {isFilterApplied 
                ? (startDate && endDate 
                  ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
                  : 'Filter Applied') 
                : 'Date Range'}
            </span>
            {isFilterApplied && (
              <span 
                className="ml-2 bg-white text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterApplied(false);
                  setStartDate("");
                  setEndDate("");
                }}
              >
                ×
              </span>
            )}
          </button>
          
          {isFilterActive && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 border">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    className="border rounded-md px-2 py-1 text-sm"
                    placeholder="Start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="text-gray-500">to</span>
                  <input 
                    type="date" 
                    className="border rounded-md px-2 py-1 text-sm"
                    placeholder="End date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <button 
                  className="btn btn-primary btn-sm w-full"
                  onClick={() => {
                    setIsFilterApplied(true);
                    setIsFilterActive(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
        
        <Link 
          href="/create-ad" 
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Post Your Ad
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-gray-500 font-medium">Total Ads posted</h3>
              <p className="text-3xl font-bold">{totalAdsPosted}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <h3 className="p-4 border-b font-medium flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          Payment history
        </h3>
        <DashboardPaymentHistory limit={4} isOverview={true} />
      </div>
      
      {/* Recent Posts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="p-4 border-b font-medium flex items-center">
          <Image className="h-5 w-5 mr-2 text-primary" />
          Posts
        </h3>
        <DashboardPostsList limit={2} isOverview={true} />
      </div>
    </div>
  );
}
