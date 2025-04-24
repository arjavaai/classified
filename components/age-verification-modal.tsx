"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem("age-verified")
    if (!hasAccepted) {
      setShowModal(true)
    }
  }, [])

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
          <div className="w-20 h-20 relative mb-4">
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <div className="relative">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="35" r="14" fill="#D4256B" opacity="0.8" />
                  <circle cx="50" cy="35" r="14" fill="#007bfd" opacity="0.8" />
                </svg>
                <div className="absolute top-0 right-0 bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white font-bold shadow-md">
                  18+
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-3">
            Please read the following warning before continuing
          </h2>
          
          <div className="text-center mb-6 text-gray-700">
            <p className="mb-4">I am over 18 years old and I accept the viewing of explicit texts and images intended for an <strong>adult audience</strong>.</p>
            
            <p>I have read and accept the <Link href="/terms" className="text-primary font-semibold">Terms and Conditions</Link></p>
          </div>

          <div className="w-full space-y-3">
            <Button 
              onClick={handleAccept}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-4 px-4 rounded-lg transition"
            >
              ACCEPT
            </Button>
            
            <button
              onClick={handleDecline}
              className="w-full text-center py-2 text-primary font-medium hover:underline"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 