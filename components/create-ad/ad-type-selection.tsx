"use client"

import { useState, useEffect } from "react"
import { useAdCreation } from "./ad-creation-context"
import { Crown, Check, AlertCircle, Award, Calendar, Image as ImageIcon, MapPin, BarChart, Phone, Zap, RefreshCw, List } from "lucide-react"
import Image from "next/image"
import ReactConfetti from 'react-confetti'

export default function AdTypeSelection() {
  const { dispatch } = useAdCreation()
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
    
    dispatch({ type: "SET_AD_TYPE", payload: selectedAdType })
    dispatch({ type: "SET_STEP", payload: 1 })
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
          <h1 className="text-4xl font-bold">Types of Ads</h1>
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
          {/* Free Ad Card */}
          <div 
            className={`bg-white rounded-xl shadow-sm border ${selectedAdType === 'free' ? 'border-blue-500' : 'border-gray-200'} overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-md`}
            onClick={(e) => {
              e.stopPropagation();
              handleAdTypeSelection('free');
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-700 font-semibold">Free Ad</h2>
                {selectedAdType === 'free' && (
                  <div className="bg-[#007bff] text-white p-1 rounded-full">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-4">Perfect if you want to get noticed fast with no cost</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-600">10 Images included.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-600">One ad per day.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-600">Repost next day.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-600">Expires at 11:59 PM on the same day.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-600">Limited visibility.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-600">Appears in city listings.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto p-4 border-t border-gray-200">
              <button
                className={`w-full py-3 px-4 ${selectedAdType === 'free' ? 'bg-[#007bff] text-white' : 'bg-gray-200 text-gray-700'} font-medium rounded-md transition`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdTypeSelection('free');
                }}
              >
                {selectedAdType === 'free' ? (
                  <span className="flex items-center justify-center">
                    <Check className="h-5 w-5 mr-2" /> Selected
                  </span>
                ) : 'Choose'}
              </button>
            </div>
          </div>
          
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
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Larger Ad Placement</span>
                    <span className="text-gray-700 font-medium"> – Featured prominently across key high-traffic pages.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Massive Traffic Reach</span>
                    <span className="text-gray-700 font-medium"> – Gain exposure.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Direct Contact Links</span>
                    <span className="text-gray-700 font-medium"> – Let clients reach you via call, WhatsApp, or email instantly.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-500 mr-3 mt-0.5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-bold">Instant Ad Approval</span>
                    <span className="text-gray-700 font-medium"> – Get listed quickly with priority moderation.</span>
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
              <button
                className={`w-full py-3 px-4 ${selectedAdType === 'premium' ? 'bg-[#007bff] text-white' : 'bg-blue-100 text-blue-700'} font-medium rounded-md transition`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdTypeSelection('premium');
                }}
              >
                {selectedAdType === 'premium' ? (
                  <span className="flex items-center justify-center">
                    <Check className="h-5 w-5 mr-2" /> Selected
                  </span>
                ) : 'Choose'}
              </button>
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
          
          {/* Next button moved to the right */}
          <div className="w-full flex justify-end">
            <button
              className="bg-[#007bff] text-white font-bold text-lg rounded-[4px] px-10 py-5 hover:bg-blue-700 border border-blue-600 w-full md:w-64"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
