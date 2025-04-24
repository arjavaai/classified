"use client"

import React, { createContext, useContext, useReducer, type ReactNode } from "react"

// Define types for our search state
export interface SearchFilters {
  searchText: string
  state: string
  city: string
  priceRange: [number, number]
  ethnicity: string[]
  nationality: string[]
  bodyType: string[]
  breastType: string[]
  hairColor: string[]
  ageRange: string[]
  services: string[]
  catersTo: string[]
  placeOfService: string[]
}

// Define the initial state
export const initialFilters: SearchFilters = {
  searchText: "",
  state: "",
  city: "",
  priceRange: [0, 1000],
  ethnicity: [],
  nationality: [],
  bodyType: [],
  breastType: [],
  hairColor: [],
  ageRange: [],
  services: [],
  catersTo: [],
  placeOfService: [],
}

// Define action types
type ActionType =
  | { type: "SET_SEARCH_TEXT"; payload: string }
  | { type: "SET_STATE"; payload: string }
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "TOGGLE_FILTER"; payload: { category: keyof SearchFilters; value: string } }
  | { type: "CLEAR_ALL" }

// Create the reducer function
function searchReducer(state: SearchFilters, action: ActionType): SearchFilters {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload }
    case "SET_STATE":
      return { ...state, state: action.payload }
    case "SET_CITY":
      return { ...state, city: action.payload }
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload }
    case "TOGGLE_FILTER": {
      const { category, value } = action.payload
      if (Array.isArray(state[category])) {
        const currentValues = state[category] as string[]
        const newValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value]
        return { ...state, [category]: newValues }
      }
      return state
    }
    case "CLEAR_ALL":
      return initialFilters
    default:
      return state
  }
}

// Create the context
interface SearchContextType {
  filters: SearchFilters
  dispatch: React.Dispatch<ActionType>
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

// Create the provider component
export function SearchProvider({ children }: { children: ReactNode }) {
  const [filters, dispatch] = useReducer(searchReducer, initialFilters)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <SearchContext.Provider value={{ filters, dispatch, isModalOpen, openModal, closeModal }}>
      {children}
    </SearchContext.Provider>
  )
}

// Create a custom hook to use the context
export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
