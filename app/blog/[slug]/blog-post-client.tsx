"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
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

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        if (!db) {
          throw new Error("Firestore is not initialized");
        }
        
        const blogPostsCollection = collection(db, 'blogPosts');
        const blogPostsQuery = query(
          blogPostsCollection,
          where('slug', '==', slug),
          where('published', '==', true)
        );
        
        const blogPostsSnapshot = await getDocs(blogPostsQuery);
        
        if (blogPostsSnapshot.empty) {
          setPost(null);
          setLoading(false);
          return;
        }
        
        const doc = blogPostsSnapshot.docs[0];
        const blogPost = {
          id: doc.id,
          ...doc.data(),
        } as BlogPost;
        
        setPost(blogPost);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching blog post with slug "${slug}":`, err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading blog post...</p>
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
          <p className="text-red-600">Error loading blog post: {error}</p>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
        <SiteFooter />
      </>
    );
  }

  if (!post) {
    notFound();
    return null;
  }

  return (
    <>
      <Header />
      <article className="container mx-auto max-w-4xl px-4 py-6 sm:py-10">
        <Link 
          href="/blog"
          className="mb-4 sm:mb-6 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{post.title}</h1>
          <time 
            dateTime={post.publishDate} 
            className="mt-2 block text-xs sm:text-sm text-gray-500"
          >
            {formatPublishDate(post.publishDate)}
          </time>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center rounded-full bg-blue-100 px-2 sm:px-3 py-0.5 text-xs font-medium text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.coverImage && (
          <div className="mb-6 sm:mb-8 overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        
        <div className="blog-content-wrapper w-full overflow-x-hidden">
          <div 
            className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:mx-auto prose-img:max-w-full prose-p:text-gray-700 prose-p:text-balance prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-pre:overflow-x-auto prose-table:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        
        <style jsx global>{`
          /* Global responsive styles for blog content */
          .blog-content-wrapper img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem auto;
          }
          
          .blog-content-wrapper iframe {
            max-width: 100%;
            margin: 1.5rem auto;
            border-radius: 0.5rem;
          }
          
          .blog-content-wrapper table {
            display: block;
            overflow-x: auto;
            max-width: 100%;
          }
          
          @media (max-width: 640px) {
            .blog-content-wrapper h1 {
              font-size: 1.5rem;
            }
            .blog-content-wrapper h2 {
              font-size: 1.25rem;
            }
            .blog-content-wrapper h3 {
              font-size: 1.125rem;
            }
            .blog-content-wrapper p, .blog-content-wrapper li {
              font-size: 1rem;
            }
          }
        `}</style>
      </article>
      <InfoFooter />
      <SiteFooter />
    </>
  );
}
