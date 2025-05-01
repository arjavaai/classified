"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem("age-verified")
    if (hasAccepted) {
      return // Don't show modal if already accepted
    }

    // Function to handle user interaction
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        setShowModal(true)
        
        // Remove all event listeners after showing the modal
        window.removeEventListener('scroll', handleInteraction)
        window.removeEventListener('click', handleInteraction)
        window.removeEventListener('keydown', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
        document.removeEventListener('mousemove', handleDelayedInteraction)
      }
    }
    
    // For mouse movement, we want to delay a bit to avoid triggering immediately
    let mouseMoveTimer: NodeJS.Timeout | null = null
    const handleDelayedInteraction = () => {
      if (mouseMoveTimer) clearTimeout(mouseMoveTimer)
      mouseMoveTimer = setTimeout(() => {
        handleInteraction()
      }, 1000) // 1 second delay for mouse movement
    }

    // Add event listeners for various user interactions
    window.addEventListener('scroll', handleInteraction)
    window.addEventListener('click', handleInteraction)
    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    document.addEventListener('mousemove', handleDelayedInteraction)

    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      document.removeEventListener('mousemove', handleDelayedInteraction)
      if (mouseMoveTimer) clearTimeout(mouseMoveTimer)
    }
  }, [hasInteracted])

  const handleAccept = () => {
    localStorage.setItem("age-verified", "true")
    setShowModal(false)
    
    // Add a small delay then dispatch a custom event to trigger the cookie modal
    setTimeout(() => {
      // Create and dispatch a custom event that the cookie modal will listen for
      const event = new CustomEvent('ageVerificationAccepted')
      window.dispatchEvent(event)
    }, 100)
  }

  const handleDecline = () => {
    // Redirect to google or another safe site
    window.location.href = "https://www.google.com"
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-lg overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="bg-gray-100 rounded-full p-1 flex items-center justify-center overflow-hidden">
              <Image 
                src="/assets/favicon.png"
                alt="Skluva Logo"
                width={100}
                height={40}
                className="h-auto"
                priority
              />
            </div>
            <div className="absolute top-0 right-0 bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white font-bold shadow-md">
              18+
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-3">
            Age Verification Required
          </h2>
          
          <div className="text-center mb-6 text-gray-700">
            <p className="mb-4">By continuing, I confirm that I am at least 18 years old and consent to viewing adult content including explicit texts and images.</p>
            
            <p>I have read and agree to the <Link href="/terms" className="text-primary font-semibold">Terms and Conditions</Link> of this website.</p>
          </div>

          <div className="w-full space-y-3">
            <Button 
              onClick={handleAccept}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-4 px-4 rounded-lg transition"
            >
              Accept
            </Button>
            
            <button
              onClick={handleDecline}
              className="w-full text-center py-2 text-primary font-medium hover:underline"
            >
              Exit Site
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}