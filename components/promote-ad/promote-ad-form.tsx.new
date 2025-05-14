"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Check, 
  AlertCircle, 
  Award, 
  Calendar, 
  Image as ImageIcon, 
  MapPin, 
  BarChart, 
  Phone, 
  Zap, 
  RefreshCw, 
  List, 
  Crown, 
  TrendingUp,
  Eye,
  Clock,
  Repeat,
  Star
} from "lucide-react"
import Image from "next/image"
import ReactConfetti from 'react-confetti'

export default function PromoteAdForm() {
  const router = useRouter()
  const [selectedAdType, setSelectedAdType] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (selectedAdType === 'premium') {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [selectedAdType])

  const handleAdTypeSelection = (adType: string) => {
    setSelectedAdType(adType)
    setShowError(false)
  }

  const handleNext = () => {
    if (!selectedAdType) {
      setShowError(true)
      return
    }
    
    // Store the selected ad type in localStorage to pass it to the create-ad form
    localStorage.setItem('promotedAdType', selectedAdType)
    
    // Navigate to create-ad page
    router.push('/create-ad')
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            colors={['#007bff', '#ffd700', '#ff6b6b', '#4ecdc4', '#9c88ff']}
          />
        </div>
      )}
      {/* Header with Logo */}
      <header className="bg-[#007bff] text-white py-6 w-full">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Promote your Ad</h1>
        </div>
      </header>

      {/* Ad Types Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Premium Image Card */}
        <div className="bg-white rounded-xl shadow-md border border-blue-200 overflow-hidden mb-8">
          <div className="relative w-full h-96 md:h-[450px] lg:h-[500px]">
            <Image 
              src="/assets/premium_placeholder.png" 
              alt="Premium Ad Example" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-6 mb-8">
          {/* Premium Ad Card */}
          <div 
            className={`bg-white rounded-xl shadow-md border ${selectedAdType === 'premium' ? 'border-blue-500' : 'border-blue-200'} overflow-hidden flex flex-col relative cursor-pointer transition-all hover:shadow-md`}
            onClick={(e) => {
              e.stopPropagation();
              handleAdTypeSelection('premium');
            }}
          >
            <div className="bg-blue-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-yellow-400 p-1.5 rounded-full">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl text-gray-800 font-bold">Premium Ad – $12.95</h2>
                  </div>
                  <p className="text-gray-700 font-bold">Maximize your ad's exposure with premium features, staying visible for 30 days.</p>
                </div>
                {selectedAdType === 'premium' && (
                  <div className="bg-[#007bff] text-white p-1 rounded-full ml-4">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">30 Days Active</span>
                    <span className="text-gray-700 font-medium"> – Your ad stays live for a full 30 days.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Scrolling Image Gallery</span>
                    <span className="text-gray-700 font-medium"> – Showcase up to 10 high-quality images in an auto-scrolling display.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Regional Targeting</span>
                    <span className="text-gray-700 font-medium"> – Choose specific cities or states for focused visibility.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Analytics Dashboard</span>
                    <span className="text-gray-700 font-medium"> – Track views, clicks, and engagement with your ad.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Contact Management</span>
                    <span className="text-gray-700 font-medium"> – Easily manage inquiries and messages from potential clients.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Instant Publishing</span>
                    <span className="text-gray-700 font-medium"> – Your ad goes live immediately after approval.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Repost Feature</span>
                    <span className="text-gray-700 font-medium"> – Bump your ad anytime in $1 to stay fresh and visible.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <List className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Unlimited Listings</span>
                    <span className="text-gray-700 font-medium"> – Post as many ads as you want, with no restrictions.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto p-4 border-t border-blue-100 bg-blue-50">
              {selectedAdType === 'premium' && (
                <div className="flex items-center justify-center text-[#007bff] font-medium">
                  <Check className="h-5 w-5 mr-2" /> Selected
                </div>
              )}
            </div>
          </div>

          {/* Promote Your Ad Card */}
          <div 
            className={`bg-white rounded-xl shadow-md border ${selectedAdType === 'promote' ? 'border-blue-500' : 'border-blue-200'} overflow-hidden flex flex-col relative cursor-pointer transition-all hover:shadow-md`}
            onClick={(e) => {
              e.stopPropagation();
              handleAdTypeSelection('promote');
            }}
          >
            <div className="bg-blue-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-500 p-1.5 rounded-full">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl text-gray-800 font-bold">Promote Your Ad – $1.00</h2>
                  </div>
                  <p className="text-gray-700 font-bold">Boost your visibility and attract more clients with our promotion feature.</p>
                </div>
                {selectedAdType === 'promote' && (
                  <div className="bg-[#007bff] text-white p-1 rounded-full ml-4">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Feature Card 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 transform transition-transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-500 p-2 rounded-full mr-3">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-blue-800 font-bold">Top Placement</h3>
                  </div>
                  <p className="text-blue-700">Bump your ad to the top of your city's listings for just $1.</p>
                </div>
                
                {/* Feature Card 2 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 transform transition-transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-500 p-2 rounded-full mr-3">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-purple-800 font-bold">Maximum Visibility</h3>
                  </div>
                  <p className="text-purple-700">Gain maximum visibility and attract more clients.</p>
                </div>
                
                {/* Feature Card 3 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 transform transition-transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500 p-2 rounded-full mr-3">
                      <Repeat className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-green-800 font-bold">Anytime Refresh</h3>
                  </div>
                  <p className="text-green-700">Use anytime to refresh your position and stay ahead of the competition.</p>
                </div>
                
                {/* Feature Card 4 */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 transform transition-transform hover:scale-105">
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-500 p-2 rounded-full mr-3">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-amber-800 font-bold">Consistent Prominence</h3>
                  </div>
                  <p className="text-amber-700">Ideal for those who want consistent top placement.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-800">
                    <span className="font-bold"></span>
                    Your ad stays live for 30 days. To maintain top visibility as new listings are added, bump your ad to the top anytime for just $1!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto p-4 border-t border-blue-100 bg-blue-50">
              {selectedAdType === 'promote' && (
                <div className="flex items-center justify-center text-[#007bff] font-medium">
                  <Check className="h-5 w-5 mr-2" /> Selected
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
          {/* Error notification moved to the left */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center whitespace-nowrap">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Please select an ad type to continue</span>
              </div>
            )}
          </div>
          
          {/* Promote button centered in desktop view */}
          <div className="w-full flex justify-center">
            <button
              className="bg-[#007bff] text-white font-bold text-lg rounded-[4px] px-10 py-5 hover:bg-blue-700 border border-blue-600 w-full md:w-64"
              onClick={handleNext}
            >
              Promote your Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
