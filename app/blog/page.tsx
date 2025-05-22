import { Metadata } from 'next';
import BlogClient from './blog-client';

export const metadata: Metadata = {
  title: 'Blog | Skluva',
  description: 'Read the latest articles and updates from Skluva.',
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Blog</h1>
        <p className="mt-3 text-lg text-gray-600">
          Stay updated with our latest news and articles
        </p>
      </div>
      
      <BlogClient />
    </div>
  );
}
