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

  return (
    <>
      <form onSubmit={handleSearch} className="mt-4 relative flex items-center">
        <div className="flex-grow relative">
          <div className="absolute left-3 top-3 text-primary">
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search By City"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm text-black"
            value={filters.searchText}
            onChange={(e) => dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })}
            onClick={openModal}
          />
        </div>
        <button
          type="submit"
          className="ml-2 bg-primary text-white p-3 rounded-full flex items-center justify-center"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      <SearchModal />
    </>
  )
}
