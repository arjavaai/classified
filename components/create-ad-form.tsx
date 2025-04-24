"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CreateAdForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [contactPreference, setContactPreference] = useState("email")
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])

  const goToStep = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
    setUploadedPhotos([...uploadedPhotos, ...newPhotos])
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = [...uploadedPhotos]
    updatedPhotos.splice(index, 1)
    setUploadedPhotos(updatedPhotos)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Logo */}
      <header className="bg-primary text-white py-8 -mx-4 px-4 mb-10 text-center rounded-xl">
        <h1 className="text-4xl font-bold">Publish post in just a few steps!</h1>
      </header>

      {/* Steps Progress Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          {/* Line connecting the steps */}
          <div className="absolute h-[2px] bg-gray-200 top-1/2 left-[15%] right-[15%] -translate-y-1/2 z-0"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
                currentStep >= 1 ? "bg-primary text-white" : "bg-white border-2 border-gray-200 text-gray-400"
              }`}
            >
              1
            </div>
            <p className={currentStep >= 1 ? "text-primary font-medium" : "text-gray-400 font-medium"}>
              Add information
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
                currentStep >= 2 ? "bg-primary text-white" : "bg-white border-2 border-gray-200 text-gray-400"
              }`}
            >
              2
            </div>
            <p className={currentStep >= 2 ? "text-primary font-medium" : "text-gray-400 font-medium"}>Photos</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
                currentStep >= 3 ? "bg-primary text-white" : "bg-white border-2 border-gray-200 text-gray-400"
              }`}
            >
              3
            </div>
            <p className={currentStep >= 3 ? "text-primary font-medium" : "text-gray-400 font-medium"}>Finish</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              {/* First Name Field */}
              <div>
                <Label htmlFor="firstName" className="text-lg mb-2">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input type="text" id="firstName" placeholder="Enter First Name" className="p-4 text-base" />
              </div>

              {/* Category Field (Fixed) */}
              <div>
                <Label className="text-lg mb-2">Category</Label>
                <Input type="text" value="Escort" disabled className="p-4 text-base bg-gray-50 cursor-not-allowed" />
              </div>

              {/* Age Field */}
              <div>
                <Label htmlFor="age" className="text-lg mb-2">
                  Age <span className="text-red-500">*</span>
                </Label>
                <Input type="number" id="age" min="18" max="99" placeholder="Enter Age" className="p-4 text-base" />
              </div>

              {/* Contact Preference Field */}
              <div>
                <Label className="text-lg mb-2">
                  How would you like to be connected? <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={contactPreference} onValueChange={setContactPreference} className="space-y-3">
                  <div className="flex items-center space-x-2 border border-gray-200 p-4 rounded-lg hover:border-primary">
                    <RadioGroupItem value="email" id="email-only" />
                    <Label htmlFor="email-only" className="cursor-pointer flex-1">
                      Only Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-gray-200 p-4 rounded-lg hover:border-primary">
                    <RadioGroupItem value="phone" id="phone-only" />
                    <Label htmlFor="phone-only" className="cursor-pointer flex-1">
                      Only Phone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-gray-200 p-4 rounded-lg hover:border-primary">
                    <RadioGroupItem value="both" id="email-phone" />
                    <Label htmlFor="email-phone" className="cursor-pointer flex-1">
                      Email & Phone
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Email Field */}
              {(contactPreference === "email" || contactPreference === "both") && (
                <div>
                  <Label htmlFor="email" className="text-lg mb-2">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input type="email" id="email" placeholder="Enter Email" className="p-4 text-base" />
                </div>
              )}

              {/* Phone Field */}
              {(contactPreference === "phone" || contactPreference === "both") && (
                <div>
                  <Label htmlFor="phone" className="text-lg mb-2">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input type="tel" id="phone" placeholder="Enter Phone Number" className="p-4 text-base" />
                </div>
              )}

              {/* WhatsApp Option */}
              <div className="flex items-center space-x-2">
                <Checkbox id="whatsapp" />
                <Label htmlFor="whatsapp">Available on WhatsApp</Label>
              </div>

              {/* Location Fields */}
              <div>
                <Label className="text-lg mb-2">
                  Location <span className="text-red-500">*</span>
                </Label>
                {/* State Dropdown */}
                <div className="mb-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* City Dropdown */}
                <div>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="la">Los Angeles</SelectItem>
                      <SelectItem value="sf">San Francisco</SelectItem>
                      <SelectItem value="sd">San Diego</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Title Field */}
              <div>
                <Label htmlFor="title" className="text-lg mb-2">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input type="text" id="title" placeholder="Enter your ad title" className="p-4 text-base" />
              </div>

              {/* Description Field */}
              <div>
                <Label htmlFor="description" className="text-lg mb-2">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder="Tell potential clients about yourself and your services..."
                  className="p-4 text-base"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="bg-primary text-white font-semibold py-6 px-6 rounded-lg hover:bg-primary/90 transition text-lg"
                >
                  Next: Add Photos
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Photos Upload */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-2">Add Images</h2>
            <p className="text-gray-500 text-center mb-8">(Add up to 10 pictures, Max file size: 2MB)</p>

            {/* Drop Area */}
            <div
              className="border-2 border-dashed border-primary rounded-lg p-12 text-center mb-8 cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => document.getElementById("photoUpload")?.click()}
            >
              <p className="text-xl text-gray-700 mb-2">Drag and drop files here or click to upload.</p>
              <input
                type="file"
                id="photoUpload"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            {/* Photo Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => removePhoto(index)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                onClick={() => goToStep(1)}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={() => goToStep(3)}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview and Publish */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Terms, Conditions and Privacy Policy</h2>

            {/* Terms and Conditions */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-8 bg-primary text-white rounded-full">Yes</div>
                <p className="text-gray-600 text-lg">
                  I have read the Terms and Conditions of use and Privacy Policy and I hereby authorize the processing
                  of my personal data for the purpose of providing this web service.
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                onClick={() => goToStep(2)}
                className="px-12 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-lg"
              >
                Previous
              </Button>
              <Button
                type="button"
                className="px-12 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-lg"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
