"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SEOContentProps {
  title: string;
  content: string;
  initialHeight?: number;
}

export default function SEOContent({ title, content, initialHeight = 80 }: SEOContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [content])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <div className="relative">
        {/* Content container */}
        <div 
          ref={contentRef}
          className="prose max-w-none overflow-hidden transition-all duration-500 ease-in-out"
          style={{ 
            maxHeight: isExpanded ? `${contentHeight || 5000}px` : `${initialHeight}px`,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        
        {/* Gradient overlay */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
      
      {/* Button container - separate from content to ensure it's always clickable */}
      <div className="relative z-10 mt-4">
        <button
          onClick={toggleExpand}
          className="flex items-center justify-center w-full text-accent-blue hover:text-blue-700 font-medium transition-colors py-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
          aria-expanded={isExpanded}
          type="button"
        >
          {isExpanded ? (
            <>
              <span className="mr-2">Show Less</span>
              <ChevronUp className="h-5 w-5" />
            </>
          ) : (
            <>
              <span className="mr-2">Show More</span>
              <ChevronDown className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
