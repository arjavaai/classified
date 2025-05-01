"use client"

import { ChevronRight } from "lucide-react"

interface StepsProgressProps {
  currentStep: number
}

export default function StepsProgress({ currentStep }: StepsProgressProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-8 border border-gray-100">
      <div className="flex justify-between items-center max-w-3xl mx-auto relative">
        {/* Step 1 */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
              currentStep >= 1 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <span className={`ml-3 font-bold ${currentStep >= 1 ? "text-[#007bff]" : "text-gray-500"}`}>
            Add information
          </span>
        </div>

        {/* Chevron 1 */}
        <ChevronRight className="h-6 w-6 text-gray-300 hidden md:block" />

        {/* Step 2 */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
              currentStep >= 2 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <span className={`ml-3 font-bold ${currentStep >= 2 ? "text-[#007bff]" : "text-gray-500"}`}>
            Photos
          </span>
        </div>

        {/* Chevron 2 */}
        <ChevronRight className="h-6 w-6 text-gray-300 hidden md:block" />

        {/* Step 3 */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
              currentStep >= 3 ? "bg-[#007bff] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <span className={`ml-3 font-bold ${currentStep >= 3 ? "text-[#007bff]" : "text-gray-500"}`}>
            Finish
          </span>
        </div>
      </div>
    </div>
  )
}
