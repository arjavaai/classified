"use client"

import { useAdCreation } from "./ad-creation-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { useRouter } from "next/navigation"
import { createAd } from "@/lib/firebase"

export default function AdFormStep3() {
  const { state, dispatch } = useAdCreation()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [uniqueAdId, setUniqueAdId] = useState<string | null>(null)

  const goToPreviousStep = () => {
    dispatch({ type: "SET_STEP", payload: 2 })
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTermsChange = (checked: boolean) => {
    dispatch({ type: "UPDATE_FORM", payload: { termsAccepted: checked } })
  }

  const handleRedirectToLogin = () => {
    // Save the current form state to localStorage before redirecting
    localStorage.setItem('pendingAdData', JSON.stringify(state))
    
    // Redirect to login page
    router.push('/login')
  }

  const handleSubmit = async () => {
    if (!state.termsAccepted) {
      setSubmitError("Please agree to the Terms and Conditions before publishing.")
      return
    }
    
    // Check if user is logged in
    if (!loading && !user) {
      // User is not logged in, show login prompt
      setShowLoginPrompt(true)
      return
    }

    // Reset any previous errors
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      // Ensure user is not null before proceeding
      if (!user) {
        throw new Error("User is not authenticated");
      }
      
      // Prepare the ad data for submission
      const adData = {
        // Basic info
        userId: user.uid,
        adType: state.adType,
        status: state.adType === 'premium' ? 'active' : 'pending',
        
        // Personal info
        name: state.name,
        category: state.category,
        age: state.age,
        contactPreference: state.contactPreference,
        email: state.email,
        phone: state.phone,
        whatsapp: state.whatsapp,
        sms: state.sms,
        
        // Location
        state: state.state,
        city: state.city,
        
        // Ad details
        title: state.title,
        description: state.description,
        
        // Characteristics
        ethnicity: state.ethnicity,
        nationality: state.nationality,
        bodyType: state.bodyType,
        breastType: state.breastType,
        hairColor: state.hairColor,
        services: state.services,
        catersTo: state.catersTo,
        placeOfService: state.placeOfService,
        
        // Rates
        incallRates: state.incallRates,
        outcallRates: state.outcallRates,
        
        // Photos - these should already be uploaded to Firebase Storage
        photos: state.photos,
        
        // Expiration date - 24 hours for free ads, 30 days for premium
        expiresAt: new Date(
          Date.now() + (state.adType === 'premium' ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
        ).toISOString(),
        
        // Terms
        termsAccepted: state.termsAccepted,
        termsAcceptedAt: new Date().toISOString()
      };
      
      // Submit the ad to Firebase
      const result = await createAd(adData);
      
      if (result.success) {
        // Store the Firebase document ID
        setUniqueAdId(result.adId || '');
        
        // Show success message
        setSubmitSuccess(true);
        
        // Reset form after a delay
        setTimeout(() => {
          dispatch({ type: "RESET_FORM" });
          
          // Redirect to search results or dashboard
          router.push('/dashboard');
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to create ad');
      }
    } catch (error: any) {
      console.error("Error submitting ad:", error);
      setSubmitError(error.message || "There was an error submitting your ad. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Terms, Conditions and Privacy Policy</h2>
      
      {/* Success message */}
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Success!</span>
          </div>
          <p className="mb-3">Your ad has been submitted successfully! You will be redirected to your dashboard shortly.</p>
          {uniqueAdId && (
            <div className="mt-2 p-3 bg-white border border-green-100 rounded">
              <p className="font-medium text-gray-700">Your Unique Ad ID:</p>
              <p className="text-lg font-bold text-blue-600">{uniqueAdId}</p>
              <p className="text-xs text-gray-500 mt-1">Please save this ID for your reference.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Error message */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Error</span>
          </div>
          <p className="mb-3">{submitError}</p>
        </div>
      )}
      
      {/* Login prompt message */}
      {showLoginPrompt && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Login Required</span>
          </div>
          <p className="mb-3">You need to be logged in to publish your ad. Please log in to continue.</p>
          <button
            onClick={handleRedirectToLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Go to Login
          </button>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="mb-12">
        <div className="flex flex-row items-start gap-4 mb-6">
          <div className="flex items-center gap-2 min-w-[120px] justify-center">
            <div 
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${
                state.termsAccepted 
                  ? "bg-[#007bff]" 
                  : "bg-gray-200 border border-[#007bff]"
              }`}
              onClick={() => handleTermsChange(!state.termsAccepted)}
            >
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform shadow-sm ${
                  state.termsAccepted ? "translate-x-8" : "translate-x-0"
                }`}
              >
                {state.termsAccepted ? (
                  <span className="text-[#007bff] text-xs font-medium">Yes</span>
                ) : (
                  <span className="text-gray-500 text-xs font-medium">No</span>
                )}
              </span>
            </div>
          </div>
          <div className="flex-1 mt-1">
            <Label htmlFor="terms-switch" className="text-gray-600 text-xs cursor-pointer leading-snug">
              I have read the{" "}
              <a href="#" className="text-primary">Terms and Conditions</a>{" "}
              of use and{" "}
              <a href="#" className="text-primary">Privacy Policy</a>{" "}
              and I hereby authorize the processing of my personal data for the purpose of providing this web service.
            </Label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-3 mt-8">
        <Button
          type="button"
          onClick={goToPreviousStep}
          className="bg-[#1f2937] text-white font-bold rounded-[4px] px-4 py-4 sm:px-8 sm:py-6 hover:bg-black border border-gray-700 flex-1 text-base sm:text-lg min-w-[120px] sm:min-w-[140px] h-auto"
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="bg-[#007bff] text-white font-bold rounded-[4px] px-4 py-4 sm:px-8 sm:py-6 hover:bg-blue-700 border border-blue-600 flex-1 text-base sm:text-lg min-w-[120px] sm:min-w-[140px] h-auto"
          disabled={isSubmitting || !state.termsAccepted || submitSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : submitSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Submitted
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  )
}
