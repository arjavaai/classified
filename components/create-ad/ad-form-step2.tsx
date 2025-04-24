"use client"

import type React from "react"

import { useAdCreation } from "./ad-creation-context"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { Trash2, Upload } from "lucide-react"

export default function AdFormStep2() {
  const { state, dispatch } = useAdCreation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
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
    // Filter for images only
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    // Limit to remaining slots (max 10 photos)
    const remainingSlots = 10 - state.photos.length
    const filesToProcess = imageFiles.slice(0, remainingSlots)

    if (filesToProcess.length === 0) {
      if (imageFiles.length > 0 && remainingSlots === 0) {
        alert("Maximum number of photos (10) reached")
      }
      return
    }

    // Process each file
    filesToProcess.forEach((file) => {
      // Show progress
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return 0
          const newProgress = prev + 10
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => setUploadProgress(null), 500)
            return 100
          }
          return newProgress
        })
      }, 100)

      // Read file as data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          dispatch({
            type: "ADD_PHOTO",
            payload: e.target.result.toString(),
          })
        }
      }
      reader.readAsDataURL(file)
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

      {/* Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center mb-8 cursor-pointer transition-colors ${
          dragActive ? "border-primary bg-blue-50" : "border-gray-200 hover:border-primary hover:bg-blue-50"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <p className="text-xl text-gray-700 mb-2">Drag and drop files here or click to upload.</p>
        <p className="text-gray-500 text-sm mb-4">or</p>
        <Button className="bg-primary hover:bg-primary/90">Browse Files</Button>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Progress */}
      {uploadProgress !== null && (
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Uploading...</span>
            <span className="text-sm text-gray-600">{uploadProgress}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Photo Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {state.photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
            <img src={photo || "/placeholder.svg"} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  removePhoto(index)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={goToPreviousStep}
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={goToNextStep}
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
