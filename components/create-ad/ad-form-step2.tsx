"use client"

import type React from "react"

import { useAdCreation } from "./ad-creation-context"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { Trash2, Upload, CheckCircle } from "lucide-react"

export default function AdFormStep2() {
  const { state, dispatch } = useAdCreation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingPhotos, setUploadingPhotos] = useState<{ url: string; progress: number }[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    const remainingSlots = 10 - state.photos.length - uploadingPhotos.length
    const filesToProcess = imageFiles.slice(0, remainingSlots)
    if (filesToProcess.length === 0) {
      if (imageFiles.length > 0 && remainingSlots === 0) {
        alert("Maximum number of photos (10) reached")
      }
      return
    }
    filesToProcess.forEach((file) => {
      const tempUrl = URL.createObjectURL(file)
      setUploadingPhotos((prev) => [...prev, { url: tempUrl, progress: 0 }])
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadingPhotos((prev) =>
          prev.map((item) =>
            item.url === tempUrl ? { ...item, progress: Math.min(progress, 100) } : item
          )
        )
        if (progress >= 100) {
          clearInterval(interval)
          // Read file as data URL
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              dispatch({ type: "ADD_PHOTO", payload: e.target.result.toString() })
              setUploadingPhotos((prev) => prev.filter((item) => item.url !== tempUrl))
              URL.revokeObjectURL(tempUrl)
            }
          }
          reader.readAsDataURL(file)
        }
      }, 100)
    })
  }

  const removePhoto = (index: number) => {
    dispatch({ type: "REMOVE_PHOTO", payload: index })
  }

  const goToPreviousStep = () => {
    dispatch({ type: "SET_STEP", payload: 1 })
  }

  const goToNextStep = () => {
    if (state.photos.length === 0) {
      alert("Please upload at least one photo")
      return
    }

    dispatch({ type: "SET_STEP", payload: 3 })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-2">Add Images</h2>
      <p className="text-gray-500 text-center mb-8">(Add up to 10 pictures, Max file size: 2MB)</p>

      {/* Drop Area with Image Preview Grid Inside */}
      <div
        className={
          "border-4 border-dashed rounded-none p-6 text-center mb-8 transition-colors border-blue-500 bg-white" +
          (dragActive ? " border-primary bg-blue-50" : "")
        }
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Only show this text when no images are uploaded */}
        {state.photos.length === 0 && uploadingPhotos.length === 0 && (
          <div 
            className="cursor-pointer py-8"
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-lg text-gray-700 mb-2">Drag and drop files here or click to upload.</p>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {/* Photo Preview Grid - Inside the drop area */}
        {(uploadingPhotos.length > 0 || state.photos.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {/* Uploading images with progress */}
            {uploadingPhotos.map((item, idx) => (
              <div key={item.url} className="flex flex-col items-center">
                <div className="relative aspect-square rounded-lg overflow-hidden w-full">
                  <img src={item.url} alt="Uploading" className="w-full h-full object-cover" />
                  {/* Horizontal progress bar overlay - centered and white */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="w-3/4">
                      <div className="h-3 bg-gray-200 bg-opacity-70 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-center mt-1 text-white font-medium">{item.progress}%</div>
                    </div>
                  </div>
                </div>
                <button 
                  className="mt-2 text-sm text-gray-700 hover:text-red-500"
                  onClick={() => {
                    setUploadingPhotos((prev) => prev.filter((photo) => photo.url !== item.url));
                    URL.revokeObjectURL(item.url);
                  }}
                >
                  Cancel upload
                </button>
              </div>
            ))}
            {/* Uploaded images with tick */}
            {state.photos.map((photo, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative aspect-square rounded-lg overflow-hidden w-full">
                  <img src={photo || "/placeholder.svg"} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  {/* Large white checkmark in the middle of the image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <CheckCircle className="w-14 h-14 text-white" />
                  </div>
                </div>
                <button
                  className="mt-2 text-sm text-gray-700 hover:text-red-500"
                  onClick={() => removePhoto(index)}
                >
                  Remove file
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={goToPreviousStep}
          className="bg-[#1f2937] text-white font-bold text-lg rounded-[4px] px-10 py-5 hover:bg-black border border-gray-700"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={goToNextStep}
          className="bg-[#007bff] text-white font-bold text-lg rounded-[4px] px-10 py-5 hover:bg-blue-700 border border-blue-600"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
