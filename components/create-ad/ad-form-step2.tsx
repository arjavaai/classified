"use client"

import type React from "react"

import { useAdCreation } from "./ad-creation-context"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import { Trash2, Upload, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { useRouter } from "next/navigation"
import { validateImageSize, processImage, uploadImageToFirebase } from "@/lib/image-utils"
import { storage } from "@/lib/firebase"

export default function AdFormStep2() {
  const { state, dispatch } = useAdCreation()
  const { user, loading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingPhotos, setUploadingPhotos] = useState<{ url: string; progress: number; file?: File; error?: string }[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [watermarkLoaded, setWatermarkLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

  // Check if watermark image exists when component mounts
  useEffect(() => {
    const watermarkImg = new Image();
    watermarkImg.onload = () => setWatermarkLoaded(true);
    watermarkImg.onerror = () => {
      console.error("Watermark image not found");
      setErrorMessage("Watermark image not found. Please contact support.");
    };
    watermarkImg.src = "/assets/skluva_logo.png";
  }, []);

  const handleFiles = async (files: File[]) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    setErrorMessage(null);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const remainingSlots = 10 - state.photos.length - uploadingPhotos.length;
    const filesToProcess = imageFiles.slice(0, remainingSlots);
    
    if (filesToProcess.length === 0) {
      if (imageFiles.length > 0 && remainingSlots === 0) {
        setErrorMessage("Maximum number of photos (10) reached");
      }
      return;
    }
    
    // Process each file
    for (const file of filesToProcess) {
      // Validate file size (2MB limit)
      const sizeValidation = validateImageSize(file);
      if (!sizeValidation.valid) {
        const tempUrl = URL.createObjectURL(file);
        setUploadingPhotos((prev) => [
          ...prev, 
          { url: tempUrl, progress: 0, file, error: sizeValidation.error }
        ]);
        continue;
      }
      
      // Create a temporary URL for preview
      const tempUrl = URL.createObjectURL(file);
      setUploadingPhotos((prev) => [...prev, { url: tempUrl, progress: 0, file }]);
      
      try {
        // Process the image (add watermark, adjust opacity)
        const processedImage = await processImage(file, '/assets/skluva_logo.png');
        
        // Upload to Firebase if user is logged in
        if (user) {
          // Upload the processed image to Firebase Storage
          uploadImageToFirebase(
            user.uid,
            processedImage,
            file.name,
            (progress) => {
              setUploadingPhotos((prev) =>
                prev.map((item) =>
                  item.url === tempUrl ? { ...item, progress } : item
                )
              );
            }
          ).then(downloadURL => {
            // Add the download URL to the form state
            dispatch({ type: "ADD_PHOTO", payload: downloadURL });
            // Remove from uploading list
            setUploadingPhotos((prev) => prev.filter((item) => item.url !== tempUrl));
            URL.revokeObjectURL(tempUrl);
          }).catch(error => {
            console.error("Upload error:", error);
            setUploadingPhotos((prev) =>
              prev.map((item) =>
                item.url === tempUrl ? { ...item, error: "Upload failed. Please try again." } : item
              )
            );
          });
        }
      } catch (error) {
        console.error("Image processing error:", error);
        setUploadingPhotos((prev) =>
          prev.map((item) =>
            item.url === tempUrl ? { ...item, error: "Processing failed. Please try again." } : item
          )
        );
      }
    }
  }

  const removePhoto = (index: number) => {
    dispatch({ type: "REMOVE_PHOTO", payload: index })
  }

  const goToPreviousStep = () => {
    dispatch({ type: "SET_STEP", payload: 1 })
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToNextStep = () => {
    if (state.photos.length === 0) {
      alert("Please upload at least one photo")
      return
    }
    
    // Check if user is logged in
    if (!loading && !user) {
      // User is not logged in, show login prompt
      setShowLoginPrompt(true)
      return
    }

    dispatch({ type: "SET_STEP", payload: 3 })
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleRedirectToLogin = () => {
    // Save the current form state to localStorage before redirecting
    localStorage.setItem('pendingAdData', JSON.stringify(state))
    
    // Redirect to login page
    router.push('/login')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-2">Add Images</h2>
      <p className="text-gray-500 text-center mb-4">(Add up to 10 pictures, Max file size: 2MB)</p>
      
      {/* Error message display */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}
      
      {/* Watermark info message */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6 flex items-center">
        <Info className="w-5 h-5 mr-2" />
        <span>Images will be processed with a watermark and optimized before upload.</span>
      </div>

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
        {/* Always show the upload option */}
        <div 
          className="cursor-pointer py-4"
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-lg text-gray-700 mb-2">Drag and drop files here or click to upload.</p>
          {(state.photos.length > 0 || uploadingPhotos.length > 0) && (
            <p className="text-sm text-blue-600">You can add more images (up to 10 total)</p>
          )}
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {/* Add a visible button to make it more obvious */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center"
        >
          <Upload className="w-4 h-4 mr-2" />
          Select Images
        </button>
        
        {/* Photo Preview Grid - Inside the drop area */}
        {(uploadingPhotos.length > 0 || state.photos.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {/* Uploading images with progress */}
            {uploadingPhotos.map((item, idx) => (
              <div key={item.url} className="flex flex-col items-center">
                <div className="relative aspect-square rounded-lg overflow-hidden w-full">
                  <img src={item.url} alt="Uploading" className="w-full h-full object-cover" />
                  {/* Error overlay if there's an error */}
                  {item.error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 p-3">
                      <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                      <div className="text-xs text-center text-white font-medium">{item.error}</div>
                    </div>
                  ) : (
                    /* Horizontal progress bar overlay - centered and white */
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
                  )}
                </div>
                <button 
                  className="mt-2 text-sm text-gray-700 hover:text-red-500"
                  onClick={() => {
                    setUploadingPhotos((prev) => prev.filter((photo) => photo.url !== item.url));
                    URL.revokeObjectURL(item.url);
                  }}
                >
                  {item.error ? 'Remove' : 'Cancel upload'}
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

      {/* Login prompt message */}
      {showLoginPrompt && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Login Required</span>
          </div>
          <p className="mb-3">You need to be logged in to create an ad. Please log in to continue.</p>
          <button
            onClick={handleRedirectToLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Go to Login
          </button>
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-3 mt-8">
        <Button
          type="button"
          onClick={goToPreviousStep}
          className="bg-[#1f2937] text-white font-bold rounded-[4px] px-4 py-4 sm:px-8 sm:py-6 hover:bg-black border border-gray-700 flex-1 text-base sm:text-lg min-w-[120px] sm:min-w-[140px] h-auto"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={goToNextStep}
          className="bg-[#007bff] text-white font-bold rounded-[4px] px-4 py-4 sm:px-8 sm:py-6 hover:bg-blue-700 border border-blue-600 flex-1 text-base sm:text-lg min-w-[120px] sm:min-w-[140px] h-auto"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
