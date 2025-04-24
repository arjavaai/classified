"use client"

interface StepsProgressProps {
  currentStep: number
}

export default function StepsProgress({ currentStep }: StepsProgressProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        {/* Line connecting the steps */}
        <div className="absolute h-[2px] bg-gray-200 top-1/2 left-[15%] right-[15%] -translate-y-1/2 z-0"></div>

        {/* Step 1 */}
        <StepIndicator step={1} currentStep={currentStep} label="Add information" />

        {/* Step 2 */}
        <StepIndicator step={2} currentStep={currentStep} label="Photos" />

        {/* Step 3 */}
        <StepIndicator step={3} currentStep={currentStep} label="Finish" />
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
