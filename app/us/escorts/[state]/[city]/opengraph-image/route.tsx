import { ImageResponse } from 'next/og';
import { getStateNameFromSlug, getCityNameFromSlug } from '@/lib/route-utils';
import { getCityPageContent } from '@/lib/location-content';
 
export const runtime = 'edge';
 
export async function GET(
  request: Request,
  { params }: { params: { state: string; city: string } }
) {
  const state = params.state;
  const city = params.city;
  
  const stateName = getStateNameFromSlug(state) || state;
  const cityName = getCityNameFromSlug(state, city) || city;
  
  // Try to get custom content from Firestore
  let title = `Escorts in ${cityName}, ${stateName} | Find Local Escorts`;
  try {
    const content = await getCityPageContent(state, city);
    if (content?.title) {
      title = content.title;
    }
  } catch (error) {
    console.error('Error fetching city page content for OG image:', error);
  }
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'white',
          background: 'linear-gradient(to bottom, #4F46E5, #2563EB)',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 30, opacity: 0.8, marginBottom: 24 }}>
            Skluva Escorts
          </div>
          <div style={{ fontWeight: 'bold' }}>{title}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
