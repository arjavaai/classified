"use client"

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import Header from "@/components/header";
import SiteFooter from "@/components/site-footer";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
}

export default function PageClient({ slug }: { slug: string }) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        if (!db) {
          throw new Error("Firestore is not initialized");
        }
        
        const pagesCollection = collection(db, 'pages');
        const pagesQuery = query(
          pagesCollection,
          where('slug', '==', slug),
          where('published', '==', true)
        );
        
        const pagesSnapshot = await getDocs(pagesQuery);
        
        if (pagesSnapshot.empty) {
          setPage(null);
          setLoading(false);
          return;
        }
        
        const doc = pagesSnapshot.docs[0];
        const pageData = {
          id: doc.id,
          ...doc.data(),
        } as Page;
        
        setPage(pageData);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching page with slug "${slug}":`, err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading page...</p>
        </div>
        <SiteFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center py-10">
          <p className="text-red-600">Error loading page: {error}</p>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
        <SiteFooter />
      </>
    );
  }

  if (!page) {
    notFound();
    return null;
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{page.title}</h1>
        </div>
        
        <div 
          className="prose prose-lg mx-auto max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
      <SiteFooter />
    </>
  );
}
