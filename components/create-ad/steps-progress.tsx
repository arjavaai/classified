"use client"

interface StepsProgressProps {
  currentStep: number
}

export default function StepsProgress({ currentStep }: StepsProgressProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex justify-between items-start max-w-3xl mx-auto relative">
        {/* Progress line connecting steps */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

        {/* Step indicators with equal width containers */}
        <div className="flex-1 flex flex-col items-center">
          <StepIndicator step={1} currentStep={currentStep} label="Add information" />
        </div>

        <div className="flex-1 flex flex-col items-center">
          <StepIndicator step={2} currentStep={currentStep} label="Photos" />
        </div>

        <div className="flex-1 flex flex-col items-center">
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
          isActive ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
        }`}
      >
        {step}
      </div>
      <p className={`text-center ${isActive ? "text-primary font-medium" : "text-gray-400"}`}>{label}</p>
    </div>
  )
}
