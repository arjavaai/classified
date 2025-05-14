"use client"

import type React from "react"
import { Search } from "lucide-react"
import { useSearch } from "./search-context"
import { useRouter } from "next/navigation"
import SearchModal from "./search-modal"

export default function SearchForm() {
  const { filters, dispatch, openModal } = useSearch()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filters.searchText.trim()) {
      router.push(`/search-results?q=${encodeURIComponent(filters.searchText)}`)
    }
  }

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openModal()
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex items-center w-full">
        <div className="bg-white rounded-lg shadow-sm flex items-center w-full">
          <div 
            className="flex-1 flex items-center pl-6 py-1 cursor-pointer"
            onClick={handleInputClick}
          >
            <Search className="h-6 w-6 text-black mr-3" />
            <input
              type="text"
              placeholder="Search by City"
              className="w-full py-4 border-none focus:outline-none text-base text-black font-medium cursor-pointer"
              value={filters.searchText}
              onChange={(e) => dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })}
              readOnly // Make it read-only to prevent keyboard from showing on mobile
            />
          </div>
          <button
            type="submit"
            className="bg-[#007bff] hover:bg-blue-600 text-white px-4 sm:px-8 py-2 sm:py-2.5 rounded-[4px] font-medium text-base h-[60%] self-center mr-2 sm:mr-3 border border-blue-600 my-4"
            data-component-name="SearchForm"
          >
            Search
          </button>
        </div>
      </form>

      <SearchModal />
    </>
  )
}
