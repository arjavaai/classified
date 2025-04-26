"use client";

import { useState } from "react";
import { Calendar, Filter, X, Plus } from "lucide-react";
import Link from "next/link";
import DashboardPostsList from "./dashboard-posts-list";

export default function DashboardPosts() {
  const [dateRange, setDateRange] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 mb-6 justify-end">
        <Link 
          href="/create-ad" 
          className="flex items-center bg-primary hover:bg-primary/90 transition text-white px-4 py-2 rounded-md font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" /> Post New Ad
        </Link>

        <button 
          className="flex items-center px-4 py-2 border rounded-md bg-white hover:border-primary transition"
          onClick={() => setIsFilterActive(!isFilterActive)}
        >
          <Calendar className="h-5 w-5 mr-2" />
          <span>Date Range</span>
          <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <button 
          className="flex items-center px-4 py-2 border rounded-md bg-primary text-white hover:bg-primary/90 transition"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span>Filter</span>
        </button>
        
        <button 
          className="flex items-center px-4 py-2 border rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          <X className="h-5 w-5 mr-2" />
          <span>Clear</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DashboardPostsList />
      </div>
    </div>
  );
}
