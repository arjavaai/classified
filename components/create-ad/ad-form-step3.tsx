"use client"

import { useAdCreation } from "./ad-creation-context"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function AdFormStep3() {
  const { state, dispatch } = useAdCreation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const goToPreviousStep = () => {
    dispatch({ type: "SET_STEP", payload: 2 })
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

  // Get the 1-hour rate for the preview
  const oneHourRate = state.incallRates["1"] || "150"

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">Terms, Conditions and Privacy Policy</h2>

      {/* Ad Preview */}
      <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold text-lg">Ad Preview</h3>
          <button
            type="button"
            className="text-primary text-sm flex items-center"
            onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>

        <div className="p-4">
          {/* Preview Card */}
          <div className="listing-card flex border border-gray-200 rounded-xl overflow-hidden">
            <div className="relative w-[120px] md:w-[200px] h-[140px] md:h-[200px] flex-shrink-0">
              {state.photos.length > 0 ? (
                <img
                  src={state.photos[0] || "/placeholder.svg"}
                  alt="Ad Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
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
                {state.photos.length}
              </div>
            </div>
            <div className="p-3 md:p-4 flex-grow relative">
              <div className="text-accent-blue font-bold text-sm md:text-base mb-1">
                {state.title || "Your Ad Title"}
              </div>
              <p className="text-gray-700 text-xs mb-2 line-clamp-2">
                {state.description || "Your description will appear here."}
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
                <span>{state.age ? `${state.age} years` : "Age"}</span>
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
                <span>{state.city && state.state ? `${state.city}, ${state.state}` : "Location"}</span>
              </div>
              <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm font-semibold">
                €{oneHourRate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-16 h-8 bg-primary text-white rounded-full">Yes</div>
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={state.termsAccepted} onCheckedChange={handleTermsChange} className="mt-1" />
            <Label htmlFor="terms" className="text-gray-600 text-lg">
              I have read the{" "}
              <a href="#" className="text-primary">
                Terms and Conditions
              </a>{" "}
              of use and{" "}
              <a href="#" className="text-primary">
                Privacy Policy
              </a>{" "}
              and I hereby authorize the processing of my personal data for the purpose of providing this web service.
            </Label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          onClick={goToPreviousStep}
          className="px-12 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-lg"
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="px-12 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-lg"
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
