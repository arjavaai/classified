"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type CookieOptions = {
  necessary: boolean;
  analytical: boolean;
  advertising: boolean;
}

type CookieOptionKey = keyof CookieOptions;

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetailedOptions, setShowDetailedOptions] = useState(false)
  const [cookieOptions, setCookieOptions] = useState<CookieOptions>({
    necessary: true,
    analytical: false,
    advertising: false
  })

  useEffect(() => {
    // Check if cookie preferences are already set
    const cookiePreferences = localStorage.getItem("cookie-preferences")
    if (cookiePreferences) {
      return // Don't show banner if preferences are already set
    }

    // Check if age verification has been accepted in this session
    const ageVerified = localStorage.getItem("age-verified")
    
    // Method 1: Show immediately if age verified but not on initial load
    if (ageVerified === "true") {
      // Use a delay to ensure the age verification modal has closed
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 300)
      
      return () => clearTimeout(timer)
    }
    
    // Method 2: Listen for the custom event from the age verification modal
    const handleAgeVerification = () => {
      setShowBanner(true)
    }
    
    // Add event listener for the custom event
    window.addEventListener('ageVerificationAccepted', handleAgeVerification)
    
    // Clean up event listener
    return () => {
      window.removeEventListener('ageVerificationAccepted', handleAgeVerification)
    }
  }, [])

  const handleAcceptAll = () => {
    const preferences: CookieOptions = {
      necessary: true,
      analytical: true,
      advertising: true
    }
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    setShowBanner(false)
  }

  const handleAcceptPreferences = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(cookieOptions))
    setShowBanner(false)
  }

  const handleRejectNonEssential = () => {
    const preferences: CookieOptions = {
      necessary: true,
      analytical: false,
      advertising: false
    }
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    setShowBanner(false)
  }

  const handleToggleOption = (option: CookieOptionKey) => {
    if (option === 'necessary') return // Cannot toggle necessary cookies
    setCookieOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const toggleDetailedView = () => {
    setShowDetailedOptions(!showDetailedOptions)
  }

  if (!showBanner) return null

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-in-out ${showBanner ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ animation: showBanner ? 'slideUp 0.5s ease-out' : 'none' }}
    >
      <div className="bg-[#EBF3FA] shadow-lg border-t border-gray-200">
        {!showDetailedOptions ? (
          // Simple Banner View
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-grow md:pr-6">
                <h2 className="text-lg md:text-xl font-bold mb-2">About cookies on this website</h2>
                <p className="text-gray-700 text-sm md:text-base">
                  We use cookies to optimize the performance of this website and provide you with a better user experience.
                </p>
              </div>
              
              <div className="flex flex-row flex-wrap justify-center gap-2 shrink-0">
                <Button 
                  onClick={handleAcceptAll}
                  className="bg-primary hover:bg-primary-light text-white font-semibold py-1.5 px-3 text-xs sm:text-sm rounded-lg transition"
                >
                  Accept All
                </Button>
                
                <Button
                  onClick={toggleDetailedView}
                  className="bg-white hover:bg-gray-100 text-primary border border-primary font-semibold py-1.5 px-3 text-xs sm:text-sm rounded-lg transition"
                >
                  Manage
                </Button>
                
                <Button
                  onClick={handleRejectNonEssential}
                  className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold py-1.5 px-3 text-xs sm:text-sm rounded-lg transition"
                >
                  Reject
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-600 mt-2">
              For more information, please visit our{" "}
              <span className="text-primary font-semibold">
                Cookie Notice
              </span>
              {" "}and our{" "}
              <span className="text-primary font-semibold">
                Privacy Notice
              </span>
            </div>
          </div>
        ) : (
          // Detailed Options View
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-grow">
                <h2 className="text-lg md:text-xl font-bold mb-2">Cookie Preferences</h2>
                <p className="text-gray-700 text-sm mb-4">
                  You can personalize the cookies we use by providing your consent below.
                </p>
                
                <div className="border rounded-lg overflow-hidden mb-4">
                  {/* Strictly Necessary */}
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex-grow">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-primary text-sm">Strictly Necessary</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Required for the website to function properly</p>
                    </div>
                    <div className="shrink-0">
                      <span className="text-xs text-gray-500">Always active</span>
                    </div>
                  </div>
                  
                  {/* Analytical/Performance */}
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex-grow">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-primary text-sm">Analytical/Performance</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Help us improve our website by collecting anonymous data</p>
                    </div>
                    <div className="relative inline-block shrink-0">
                      <input
                        type="checkbox"
                        id="analytical"
                        className="opacity-0 w-0 h-0"
                        checked={cookieOptions.analytical}
                        onChange={() => handleToggleOption('analytical')}
                      />
                      <label
                        htmlFor="analytical"
                        className={`block cursor-pointer ${
                          cookieOptions.analytical ? 'bg-primary' : 'bg-gray-300'
                        } rounded-full transition-all duration-300`}
                        style={{ width: '36px', height: '20px' }}
                      >
                        <span
                          className={`block bg-white rounded-full transition-all duration-300 transform ${
                            cookieOptions.analytical ? 'translate-x-4' : 'translate-x-0'
                          }`}
                          style={{ width: '16px', height: '16px', margin: '2px' }}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Advertising */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex-grow">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-primary text-sm">Advertising</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Allow us to provide personalized advertisements</p>
                    </div>
                    <div className="relative inline-block shrink-0">
                      <input
                        type="checkbox"
                        id="advertising"
                        className="opacity-0 w-0 h-0"
                        checked={cookieOptions.advertising}
                        onChange={() => handleToggleOption('advertising')}
                      />
                      <label
                        htmlFor="advertising"
                        className={`block cursor-pointer ${
                          cookieOptions.advertising ? 'bg-primary' : 'bg-gray-300'
                        } rounded-full transition-all duration-300`}
                        style={{ width: '36px', height: '20px' }}
                      >
                        <span
                          className={`block bg-white rounded-full transition-all duration-300 transform ${
                            cookieOptions.advertising ? 'translate-x-4' : 'translate-x-0'
                          }`}
                          style={{ width: '16px', height: '16px', margin: '2px' }}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row justify-center md:flex-col gap-2 shrink-0 md:min-w-[200px]">
                <Button 
                  onClick={handleAcceptPreferences}
                  className="bg-primary hover:bg-primary-light text-white font-semibold py-1.5 px-3 text-xs sm:text-sm rounded-lg transition"
                >
                  Save
                </Button>
                
                <Button
                  onClick={toggleDetailedView}
                  className="bg-white hover:bg-gray-100 text-primary border border-primary font-semibold py-1.5 px-3 text-xs sm:text-sm rounded-lg transition"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}