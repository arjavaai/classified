import { Metadata } from 'next';
import BlogPostClient from './blog-post-client';

// Use a static metadata for the blog post template
export const metadata: Metadata = {
  title: 'Blog Post | Skluva',
  description: 'Read our latest blog post on Skluva.',
};

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BlogPostClient slug={params.slug} />;
}
