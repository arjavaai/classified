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

export default function CookieConsentModal() {
  const [showModal, setShowModal] = useState(false)
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
      return // Don't show modal if preferences are already set
    }

    // Check if age verification has been accepted in this session
    const ageVerified = localStorage.getItem("age-verified")
    
    // Method 1: Show immediately if age verified but not on initial load
    if (ageVerified === "true") {
      // Use a delay to ensure the age verification modal has closed
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 300)
      
      return () => clearTimeout(timer)
    }
    
    // Method 2: Listen for the custom event from the age verification modal
    const handleAgeVerification = () => {
      setShowModal(true)
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
    setShowModal(false)
  }

  const handleAcceptPreferences = () => {
    localStorage.setItem("cookie-preferences", JSON.stringify(cookieOptions))
    setShowModal(false)
  }

  const handleRejectNonEssential = () => {
    const preferences: CookieOptions = {
      necessary: true,
      analytical: false,
      advertising: false
    }
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    setShowModal(false)
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

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-lg overflow-hidden">
        {!showDetailedOptions ? (
          // Simple View
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">About cookies on this website</h2>
            
            <p className="text-gray-700 mb-6 text-center">
              We use cookies to optimize the performance of this website and provide you with a better user experience in a personalized way. In the options you can choose your preferences for the use of cookies.
            </p>
            
            <div className="flex flex-col gap-3 mb-2">
              <Button 
                onClick={handleAcceptAll}
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-lg transition"
              >
                ACCEPT ALL
              </Button>
              
              <Button
                onClick={toggleDetailedView}
                className="w-full bg-white hover:bg-gray-100 text-primary border border-primary font-semibold py-3 rounded-lg transition"
              >
                MANAGE COOKIES
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-600 mt-4">
              For more information, please visit our{" "}
              <Link href="/cookie-policy" className="text-primary font-semibold">
                Cookie Notice
              </Link>
              {" "}and our{" "}
              <Link href="/privacy-policy" className="text-primary font-semibold">
                Privacy Notice
              </Link>
            </div>
          </div>
        ) : (
          // Detailed View
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Cookie Preferences</h2>
            
            <p className="text-gray-700 mb-6 text-sm">
              You can personalise the cookies we use by providing your consent to enable their use by us by exercising your choice using the buttons below.
            </p>
            
            <div className="border rounded-lg overflow-hidden mb-6">
              {/* Strictly Necessary */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">Strictly Necessary cookies</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Always active</span>
                </div>
              </div>
              
              {/* Analytical/Performance */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">Analytical/Performance Cookies</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="analytical"
                    className="opacity-0 w-0 h-0"
                    checked={cookieOptions.analytical}
                    onChange={() => handleToggleOption('analytical')}
                  />
                  <label
                    htmlFor="analytical"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${
                      cookieOptions.analytical ? 'bg-primary' : 'bg-gray-300'
                    } rounded-full transition-all duration-300`}
                    style={{ width: '36px', height: '20px' }}
                  >
                    <span
                      className={`absolute bg-white rounded-full transition-all duration-300 transform ${
                        cookieOptions.analytical ? 'translate-x-4' : 'translate-x-0'
                      }`}
                      style={{ width: '16px', height: '16px', top: '2px', left: '2px' }}
                    ></span>
                  </label>
                </div>
              </div>
              
              {/* Advertising */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">Advertising Cookies</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="advertising"
                    className="opacity-0 w-0 h-0"
                    checked={cookieOptions.advertising}
                    onChange={() => handleToggleOption('advertising')}
                  />
                  <label
                    htmlFor="advertising"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${
                      cookieOptions.advertising ? 'bg-primary' : 'bg-gray-300'
                    } rounded-full transition-all duration-300`}
                    style={{ width: '36px', height: '20px' }}
                  >
                    <span
                      className={`absolute bg-white rounded-full transition-all duration-300 transform ${
                        cookieOptions.advertising ? 'translate-x-4' : 'translate-x-0'
                      }`}
                      style={{ width: '16px', height: '16px', top: '2px', left: '2px' }}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mb-2">
              <Button 
                onClick={handleAcceptAll}
                className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-lg transition"
              >
                ACCEPT ALL
              </Button>
              
              <Button
                onClick={handleAcceptPreferences}
                className="w-full bg-white hover:bg-gray-100 text-primary border border-primary font-semibold py-3 rounded-lg transition"
              >
                ACCEPT MY PREFERENCES
              </Button>
              
              <button
                onClick={handleRejectNonEssential}
                className="w-full text-center py-2 text-primary font-medium hover:underline"
              >
                Reject all non-necessary cookies
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-600 mt-4">
              For more information, please visit our{" "}
              <Link href="/cookie-policy" className="text-primary font-semibold">
                Cookie Notice
              </Link>
              {" "}and our{" "}
              <Link href="/privacy-policy" className="text-primary font-semibold">
                Privacy Notice
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 