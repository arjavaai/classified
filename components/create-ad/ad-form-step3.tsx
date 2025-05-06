"use client"

import { useAdCreation } from "./ad-creation-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function AdFormStep3() {
  const { state, dispatch } = useAdCreation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goToPreviousStep = () => {
    dispatch({ type: "SET_STEP", payload: 2 })
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTermsChange = (checked: boolean) => {
    dispatch({ type: "UPDATE_FORM", payload: { termsAccepted: checked } })
  }

  const handleSubmit = async () => {
    if (!state.termsAccepted) {
      alert("Please agree to the Terms and Conditions before publishing.")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      alert("Your ad has been submitted for review!")

      // Reset form and go back to step 0
      dispatch({ type: "RESET_FORM" })

      // Redirect to home page or search results
      window.location.href = "/search-results"
    } catch (error) {
      console.error("Error submitting ad:", error)
      alert("There was an error submitting your ad. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Terms, Conditions and Privacy Policy</h2>

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
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={goToPreviousStep}
          className="bg-[#1f2937] text-white font-bold text-lg rounded-[4px] px-10 py-5 hover:bg-black border border-gray-700"
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="bg-[#007bff] text-white font-bold text-lg rounded-[4px] px-10 py-5 hover:bg-blue-700 border border-blue-600"
          disabled={isSubmitting || !state.termsAccepted}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  )
}
