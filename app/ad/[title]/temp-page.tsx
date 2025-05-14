import { Metadata } from "next"
import { sampleAds } from "@/lib/ads-data"
import AdDetail from "./ad-detail"

type AdPageProps = {
  params: {
    title: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AdPageProps): Promise<Metadata> {
  const adTitle = decodeURIComponent(params.title);
  const ad = sampleAds.find(ad => ad.title.toLowerCase().replace(/\s+/g, '-') === adTitle);
  
  if (!ad) {
    return {
      title: "Ad Not Found",
      description: "The ad you're looking for doesn't exist or has been removed."
    };
  }
  
  return {
    title: ad.title,
    description: ad.description.substring(0, 160),
    openGraph: {
      title: ad.title,
      description: ad.description.substring(0, 160),
      images: [ad.images[0]],
    },
  };
}

export default function AdPage({ params }: AdPageProps) {
  // Find the ad data based on the URL parameter
  const adTitle = decodeURIComponent(params.title);
  const ad = sampleAds.find(ad => ad.title.toLowerCase().replace(/\s+/g, '-') === adTitle);
  
  // Similar ads (for recommendation)
  const similarAds = sampleAds
    .filter(a => a.id !== (ad?.id || "not-found"))
    .slice(0, 4);
  
  return <AdDetail ad={ad || null} similarAds={similarAds} />;
}
