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
          <header className="bg-primary text-white py-8 -mx-4 px-4 mb-8 text-center rounded-xl">
            <h1 className="text-4xl font-bold">Publish post in just a few steps!</h1>
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
