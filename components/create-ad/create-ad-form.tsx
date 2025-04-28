"use client"
import { AdCreationProvider, useAdCreation } from "./ad-creation-context"
import AdTypeSelection from "./ad-type-selection"
import AdFormStep1 from "./ad-form-step1"
import AdFormStep2 from "./ad-form-step2"
import AdFormStep3 from "./ad-form-step3"
import StepsProgress from "./steps-progress"

export default function CreateAdForm() {
  return (
    <AdCreationProvider>
      <div className="max-w-4xl mx-auto">
        <AdFormContent />
      </div>
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
        <>
          {/* Blue Header */}
          <header className="bg-primary text-white py-5 sm:py-8 px-4 mb-8 text-center rounded-xl max-w-xl mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold">Post Your Ad</h1>
            <p className="mt-2 text-sm sm:text-base">Quick and easy in just a few steps</p>
          </header>

          {/* Steps Progress Bar */}
          <StepsProgress currentStep={step} />

          {/* Form Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {step === 1 && <AdFormStep1 />}
            {step === 2 && <AdFormStep2 />}
            {step === 3 && <AdFormStep3 />}
          </div>
        </>
      )}
    </>
  )
}
