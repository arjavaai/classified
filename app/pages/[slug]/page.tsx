import { Metadata } from 'next';
import PageClient from './page-client';

// Use a static metadata for the page template
export const metadata: Metadata = {
  title: 'Page | Skluva',
  description: 'View our page on Skluva.',
};

export default function PageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <PageClient slug={params.slug} />;
}
