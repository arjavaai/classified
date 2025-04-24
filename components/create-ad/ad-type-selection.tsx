"use client"

import { useAdCreation } from "./ad-creation-context"

export default function AdTypeSelection() {
  const { dispatch } = useAdCreation()

  const startCreateAd = () => {
    dispatch({ type: "SET_AD_TYPE", payload: "standard" })
    dispatch({ type: "SET_STEP", payload: 1 })
  }

  return (
    <>
      {/* Header with Logo */}
      <header className="bg-primary text-white py-8 -mx-4 px-4 mb-10 text-center">
        <h1 className="text-4xl font-bold">Types of Ads</h1>
      </header>

      {/* Ad Preview Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold">How your ad will look like after posting</h2>
        </div>

        {/* Ad Preview Card */}
        <div className="listing-card flex border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="relative w-[120px] md:w-[200px] h-[140px] md:h-[200px] flex-shrink-0">
            <img src="/placeholder.svg?key=ebsk5" alt="Ad Preview" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-primary mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              5
            </div>
          </div>
          <div className="p-3 md:p-4 flex-grow relative">
            <div className="text-accent-blue font-bold text-sm md:text-base mb-1">
              GENUINE Cash in hand payment HIGH PROFILE SERVICE AVAILABLE IN LA
            </div>
            <p className="text-gray-700 text-xs mb-2 line-clamp-2">
              Call me for HAND PAYMENT ONLY genuine Escorts Services Safe & Secure High Class Services Affordable Rate
              100% satisfaction guaranteed
            </p>
            <div className="flex items-center text-xs text-gray-600 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-gray-400 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>21 years</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-gray-400 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Los Angeles / Beverly Hills</span>
              <span className="bg-green-500 text-white text-[10px] px-1 py-0.5 rounded ml-2 font-semibold">Top</span>
            </div>
            <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm font-semibold">
              $150
            </div>
          </div>
        </div>

        {/* Premium Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">🌟 Premium Advertising Benefits</h3>
            <p className="text-gray-600">Stand Out & Get Noticed</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <BenefitItem
                icon="expand"
                title="Maximum Visibility"
                description="Your ad appears in a larger format across key pages, ensuring it instantly catches attention."
              />
              <BenefitItem
                icon="images"
                title="Scrolling Images"
                description="Display your images in an exclusive auto-scrolling format for maximum exposure."
              />
              <BenefitItem
                icon="camera"
                title="10 High-Quality Images"
                description="Attract more attention with up to 10 stunning, high-resolution images."
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <BenefitItem
                icon="map-marker-alt"
                title="Regional Targeting"
                description="Target specific cities or states to reach your local audience effectively."
              />
              <BenefitItem
                icon="chart-line"
                title="Massive Traffic Reach"
                description="Benefit from our high daily traffic and engaged user base."
              />
              <BenefitItem
                icon="phone-alt"
                title="Direct Contact Links"
                description="Easy access to call, WhatsApp, or email right from your profile."
              />
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <BenefitItem
                icon="bolt"
                title="Instant Ad Approval"
                description="Skip the waiting time with priority moderation."
              />
              <BenefitItem
                icon="redo"
                title="Repost Feature"
                description="Keep your ad fresh by easily reposting it without creating new listings."
              />
              <BenefitItem
                icon="list"
                title="Multiple Listings"
                description="Post as many listings as you like without restrictions."
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-light transition text-lg"
            onClick={startCreateAd}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

interface BenefitItemProps {
  icon: string
  title: string
  description: string
}

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex items-start">
      <i className={`fas fa-${icon} text-primary mt-1 mr-3`}></i>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
