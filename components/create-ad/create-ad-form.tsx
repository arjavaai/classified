"use client"
import { AdCreationProvider, useAdCreation } from "./ad-creation-context"
import AdTypeSelection from "./ad-type-selection"
import AdFormStep1 from "./ad-form-step1"
import AdFormStep2 from "./ad-form-step2"
import AdFormStep3 from "./ad-form-step3"
import { ChevronRight } from "lucide-react"

export default function CreateAdForm() {
  return (
    <AdCreationProvider>
      <AdFormContent />
    </AdCreationProvider>
  )
}

function AdFormContent() {
  const { state } = useAdCreation()
  const { step } = state

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
                <div className="flex justify-between items-center max-w-3xl mx-auto relative">
                  {/* Step 1 */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-lg font-bold ${
                        step >= 1 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      1
                    </div>
                    <span className={`ml-2 md:ml-3 text-xs md:text-base font-bold ${step >= 1 ? "text-[#007bff]" : "text-gray-500"}`}>
                      Add information
                    </span>
                  </div>

                  {/* Chevron 1 */}
                  <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-300 hidden md:block" />

                  {/* Step 2 */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-lg font-bold ${
                        step >= 2 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      2
                    </div>
                    <span className={`ml-2 md:ml-3 text-xs md:text-base font-bold ${step >= 2 ? "text-[#007bff]" : "text-gray-500"}`}>
                      Photos
                    </span>
                  </div>

                  {/* Chevron 2 */}
                  <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-300 hidden md:block" />

                  {/* Step 3 */}
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-lg font-bold ${
                        step >= 3 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                    <span className={`ml-2 md:ml-3 text-xs md:text-base font-bold ${step >= 3 ? "text-[#007bff]" : "text-gray-500"}`}>
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
