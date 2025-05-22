"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from "@/components/header";
import InfoFooter from "@/components/info-footer";
import SiteFooter from "@/components/site-footer";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  coverImage?: string;
  tags?: string[];
  publishDate: string;
  published: boolean;
}

function formatPublishDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getExcerpt(content: string, maxLength: number = 150) {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]+>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last space before maxLength
  const lastSpace = plainText.substring(0, maxLength).lastIndexOf(' ');
  return plainText.substring(0, lastSpace) + '...';
}

export default function BlogClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        if (!db) {
          throw new Error("Firestore is not initialized");
        }
        
        const blogPostsCollection = collection(db, 'blogPosts');
        const blogPostsQuery = query(
          blogPostsCollection,
          where('published', '==', true),
          orderBy('publishDate', 'desc')
        );
        
        const blogPostsSnapshot = await getDocs(blogPostsQuery);
        const posts: BlogPost[] = [];
        
        blogPostsSnapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          } as BlogPost);
        });
        
        setBlogPosts(posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading blog posts...</p>
        </div>
        <SiteFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-red-600">Error loading blog posts: {error}</p>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 sm:py-10">
        {blogPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg h-full">
                {post.coverImage ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-500 text-xl font-medium">Skluva Blog</span>
                  </div>
                )}
                
                <div className="flex flex-1 flex-col justify-between bg-white p-4 sm:p-6">
                  <div className="flex-1">
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-gray-600 text-sm sm:text-base">
                        {getExcerpt(post.content)}
                      </p>
                    </Link>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 flex items-center">
                    <div className="text-xs sm:text-sm text-gray-500">
                      <time dateTime={post.publishDate}>
                        {formatPublishDate(post.publishDate)}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <InfoFooter />
      <SiteFooter />
    </>
  );
}
