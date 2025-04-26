"use client"

interface StepsProgressProps {
  currentStep: number
}

export default function StepsProgress({ currentStep }: StepsProgressProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex justify-between items-center max-w-3xl mx-auto relative">

        {/* Step indicators with equal width containers */}
        <div className="flex-1 flex justify-center">
          <StepIndicator step={1} currentStep={currentStep} label="Add information" />
        </div>

        <div className="flex-1 flex justify-center">
          <StepIndicator step={2} currentStep={currentStep} label="Photos" />
        </div>

        <div className="flex-1 flex justify-center">
          <StepIndicator step={3} currentStep={currentStep} label="Finish" />
        </div>
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  step: number
  currentStep: number
  label: string
}

function StepIndicator({ step, currentStep, label }: StepIndicatorProps) {
  const isActive = step <= currentStep

  return (
    <div className="flex flex-col items-center z-10">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
          isActive ? "bg-primary text-white" : "bg-white border-2 border-gray-200 text-gray-400"
        }`}
      >
        {step}
      </div>
      <p className={isActive ? "text-primary font-medium" : "text-gray-400 font-medium"}>{label}</p>
    </div>
  )
}
