"use client"

import { useState, useRef } from 'react'
import { processImage, validateImageSize } from '@/lib/image-utils'
import Header from '@/components/header'
import SiteFooter from '@/components/site-footer'
import { Loader2, AlertCircle, CheckCircle, Upload, Info } from 'lucide-react'

export default function ImageTestPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      
      // Validate file size
      const sizeValidation = validateImageSize(file)
      if (!sizeValidation.valid) {
        setError(sizeValidation.error)
        return
      }
      
      // Create URL for original image preview
      const originalUrl = URL.createObjectURL(file)
      setOriginalImage(originalUrl)
      
      // Process the image
      setIsProcessing(true)
      setError(null)
      
      try {
        // Process the image with watermark
        const processedImageBlob = await processImage(file, '/assets/skluva_logo.png')
        
        // Create URL for processed image preview
        const processedUrl = URL.createObjectURL(processedImageBlob)
        setProcessedImage(processedUrl)
      } catch (error: any) {
        console.error('Image processing error:', error)
        setError(error.message || 'Failed to process image')
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Image Processing Test</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Test Image Watermarking</h2>
            <p className="text-gray-600 mb-4">
              Upload an image to test the watermarking process. The image will be processed with a watermark
              and its opacity will be reduced.
            </p>
            
            {/* Info message */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              <span>Images must be less than 2MB in size.</span>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Upload button */}
            <div className="flex justify-center mb-6">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                onClick={handleButtonClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md flex items-center"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Select Image
                  </>
                )}
              </button>
            </div>
            
            {/* Image previews */}
            {(originalImage || processedImage) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original image */}
                {originalImage && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Original Image</h3>
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <img 
                        src={originalImage} 
                        alt="Original" 
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Processed image */}
                {processedImage && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Processed Image</h3>
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                    <div className="mt-2 flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Watermark applied successfully</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  )
}
