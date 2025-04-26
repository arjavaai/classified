"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash, Eye, TrendingUp, Plus } from "lucide-react";

interface Post {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  active: boolean;
}

interface DashboardPostsListProps {
  limit?: number;
  isOverview?: boolean;
}

export default function DashboardPostsList({ limit, isOverview = false }: DashboardPostsListProps) {
  // Mock data for posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "11 April-3",
      date: "11 April 2025",
      imageUrl: "/images/placeholder-1.jpg",
      active: true
    },
    {
      id: "2",
      title: "11 April-2",
      date: "11 April 2025",
      imageUrl: "/images/placeholder-2.jpg",
      active: true
    },
    {
      id: "3",
      title: "11 April-1",
      date: "11 April 2025",
      imageUrl: "/images/placeholder-3.jpg",
      active: true
    },
    {
      id: "4",
      title: "No Z cal ts",
      date: "10 April 2025",
      imageUrl: "/images/placeholder-4.jpg",
      active: true
    },
    {
      id: "5",
      title: "Hhghh",
      date: "10 May 2025",
      imageUrl: "/images/placeholder-5.jpg",
      active: true
    },
    {
      id: "6",
      title: "10 may-4",
      date: "10 May 2025",
      imageUrl: "/images/placeholder-6.jpg",
      active: true
    },
    {
      id: "7",
      title: "9 may-3",
      date: "9 May 2025",
      imageUrl: "/images/placeholder-7.jpg",
      active: true
    },
    {
      id: "8",
      title: "8 may-2",
      date: "8 May 2025",
      imageUrl: "/images/placeholder-8.jpg",
      active: true
    }
  ]);

  const togglePostActive = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, active: !post.active } : post
    ));
  };

  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="divide-y">
      {displayPosts.map((post) => (
        <div key={post.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
            {/* Using a placeholder div instead of actual images */}
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
              <span className="text-sm">{post.id}</span>
            </div>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-primary font-medium text-lg">{post.title}</h3>
            <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link 
                href={`/listing/${post.id}`} 
                className="flex items-center text-gray-700 hover:text-primary transition"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
              <Link 
                href={`/promote/${post.id}`} 
                className="flex items-center text-gray-700 hover:text-primary transition"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Promote your ad
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={post.active}
                onChange={() => togglePostActive(post.id)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            
            <button className="text-gray-600 hover:text-primary transition">
              <Edit className="h-5 w-5" />
            </button>
            
            <button className="text-gray-600 hover:text-red-500 transition">
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      
      {isOverview && displayPosts.length > 0 && (
        <div className="p-4 text-center">
          <Link 
            href="/dashboard" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('[data-tab="posts"]')?.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
              );
            }}
            className="text-primary hover:text-primary/80 font-medium transition"
          >
            View All Posts
          </Link>
        </div>
      )}

      {displayPosts.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">You don't have any posts yet</p>
          <Link
            href="/create-ad"
            className="bg-primary hover:bg-primary/90 transition text-white px-4 py-2 rounded-md font-semibold inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" /> Create Your First Ad
          </Link>
        </div>
      )}
    </div>
  );
}
