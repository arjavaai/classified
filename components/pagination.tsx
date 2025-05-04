"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = []
    
    // Always show first page
    pageNumbers.push(1)
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)
    
    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push('...')
    }
    
    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...')
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    
    return pageNumbers
  }

  const pageNumbers = getPageNumbers()
  
  // Helper to generate page URL
  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl
    return `${baseUrl}?page=${page}`
  }

  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center">
        {/* Previous button */}
        {currentPage > 1 ? (
          <Link 
            href={getPageUrl(currentPage - 1)}
            className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <div className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed">
            <ChevronLeft className="h-5 w-5" />
          </div>
        )}
        
        {/* Page numbers */}
        <div className="flex mx-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <div 
                  key={`ellipsis-${index}`} 
                  className="flex items-center justify-center h-10 w-10 text-gray-500"
                >
                  ...
                </div>
              )
            }
            
            const pageNum = page as number
            const isCurrentPage = pageNum === currentPage
            
            return (
              <Link
                key={pageNum}
                href={getPageUrl(pageNum)}
                className={`flex items-center justify-center h-10 w-10 mx-1 rounded-md ${
                  isCurrentPage 
                    ? 'bg-[#007bff] text-white font-medium' 
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>
        
        {/* Next button */}
        {currentPage < totalPages ? (
          <Link 
            href={getPageUrl(currentPage + 1)}
            className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <div className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed">
            <ChevronRight className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}
