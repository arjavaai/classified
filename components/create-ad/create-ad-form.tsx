"use client"
import { AdCreationProvider, useAdCreation } from "./ad-creation-context"
import AdTypeSelection from "./ad-type-selection"
import AdFormStep1 from "./ad-form-step1"
import AdFormStep2 from "./ad-form-step2"
import AdFormStep3 from "./ad-form-step3"
import { ChevronRight } from "lucide-react"
import { useEffect } from "react"

export default function CreateAdForm() {
  return (
    <AdCreationProvider>
      <AdFormContent />
    </AdCreationProvider>
  )
}

function AdFormContent() {
  const { state, dispatch } = useAdCreation()
  const { step } = state
  
  // Check if coming from promote-ad page
  useEffect(() => {
    const promotedAdType = typeof window !== 'undefined' ? localStorage.getItem('promotedAdType') : null
    
    if (promotedAdType) {
      // Set the ad type from localStorage
      dispatch({ type: "SET_AD_TYPE", payload: promotedAdType })
      // Skip to step 1
      dispatch({ type: "SET_STEP", payload: 1 })
      // Clear the localStorage item to prevent this from happening on refresh
      localStorage.removeItem('promotedAdType')
    }
  }, [dispatch])

  return (
    <>
      {step === 0 ? (
        <AdTypeSelection />
      ) : (
        <div className="bg-gray-50 min-h-screen">
          {/* Blue Header - Matching Types of Ads header */}
          <header className="bg-[#007bff] text-white py-6 w-full">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold">Post Your Ad</h1>
              <p className="mt-2 text-lg font-medium">Quick and easy in just a few steps</p>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Combined Card with Steps Progress and Form Content */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              {/* Steps Progress inside the card */}
              <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-2 md:flex md:justify-between md:items-center md:gap-8 max-w-3xl mx-auto relative">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center justify-center text-center md:flex-row">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold ${
                          step >= 1 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        1
                      </div>
                      <span className={`mt-2 text-xs font-medium ${step >= 1 ? "text-[#007bff]" : "text-gray-500"} md:hidden max-w-[100px] text-center leading-tight whitespace-nowrap`}>
                      Add information
                      </span>
                    </div>
                    <span className={`ml-0 md:ml-3 text-xs md:text-base font-bold ${step >= 1 ? "text-[#007bff]" : "text-gray-500"} hidden md:block whitespace-nowrap`}>
                      Add information
                    </span>
                  </div>

                  {/* Chevron 1 */}
                  <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-300 hidden md:block" />

                  {/* Step 2 */}
                  <div className="flex flex-col items-center justify-center text-center md:flex-row">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold ${
                          step >= 2 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <span className={`mt-2 text-xs font-medium ${step >= 2 ? "text-[#007bff]" : "text-gray-500"} md:hidden max-w-[100px] text-center leading-tight whitespace-nowrap`}>
                        Photos
                      </span>
                    </div>
                    <span className={`ml-0 md:ml-3 text-xs md:text-base font-bold ${step >= 2 ? "text-[#007bff]" : "text-gray-500"} hidden md:block whitespace-nowrap`}>
                      Photos
                    </span>
                  </div>

                  {/* Chevron 2 */}
                  <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-300 hidden md:block" />

                  {/* Step 3 */}
                  <div className="flex flex-col items-center justify-center text-center md:flex-row">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold ${
                          step >= 3 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        3
                      </div>
                      <span className={`mt-2 text-xs font-medium ${step >= 3 ? "text-[#007bff]" : "text-gray-500"} md:hidden max-w-[100px] text-center leading-tight whitespace-nowrap`}>
                        Finish
                      </span>
                    </div>
                    <span className={`ml-0 md:ml-3 text-xs md:text-base font-bold ${step >= 3 ? "text-[#007bff]" : "text-gray-500"} hidden md:block whitespace-nowrap`}>
                      Finish
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {step === 1 && <AdFormStep1 />}
                {step === 2 && <AdFormStep2 />}
                {step === 3 && <AdFormStep3 />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
