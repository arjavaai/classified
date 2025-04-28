"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useSearch } from "./search-context"
import { FilterSection } from "./filter-section"
import { FilterButton } from "./filter-button"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { getStates, getCitiesByStateCode } from "@/lib/demo-data"

// Filter options data
const ethnicities = ["Arabian", "Asian", "Ebony", "Caucasian", "Hispanic", "Indian", "Latin", "Mixed race", "Others"]
const nationalities = ["Indian", "is South African", "is Russian", "is Kenyan"]
const bodyTypes = ["Slender", "Athletic", "Curvy", "BBW"]
const breastTypes = ["Natural Boobs", "Busty"]
const hairColors = ["Blond Hair", "Brown Hair", "Black Hair", "Red Hair", "Others"]
const ageRanges = ["18-19", "20s", "30s", "40s", "50s", "60+"]
const services = [
  "Oral",
  "Anal",
  "BDSM",
  "Girlfriend experience",
  "Porn activities",
  "Body ejaculation",
  "Erotic massage",
  "Tantric massage",
  "Fetish",
  "French kiss",
  "Role play",
  "Threesome",
  "Sexting",
  "Videocall",
]
const catersTo = ["Men", "Women", "Non-binary", "Couples"]
const placesOfService = ["At home", "Events and parties", "Hotel / Motel", "Clubs", "Incall", "Outcall"]

export default function SearchModal() {
  const { filters, dispatch, isModalOpen, closeModal } = useSearch()
  const router = useRouter()
  const [statesList, setStatesList] = useState<{name: string; abbreviation: string}[]>([])
  const [citiesList, setCitiesList] = useState<{name: string; slug: string}[]>([])

  // Load states when component mounts
  useEffect(() => {
    setStatesList(getStates())
  }, [])

  // Load cities when state changes
  useEffect(() => {
    if (filters.state) {
      setCitiesList(getCitiesByStateCode(filters.state))
    } else {
      setCitiesList([])
    }
  }, [filters.state])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  const handleSearch = () => {
    // Build query string from filters
    const params = new URLSearchParams()

    if (filters.searchText) {
      params.append("q", filters.searchText)
    }

    if (filters.state) {
      params.append("state", filters.state)
    }

    if (filters.city) {
      params.append("city", filters.city)
    }

    // Add other filter parameters
    if (filters.ethnicity.length) {
      params.append("ethnicity", filters.ethnicity.join(","))
    }

    if (filters.nationality.length) {
      params.append("nationality", filters.nationality.join(","))
    }

    if (filters.bodyType.length) {
      params.append("bodyType", filters.bodyType.join(","))
    }

    if (filters.breastType.length) {
      params.append("breastType", filters.breastType.join(","))
    }

    if (filters.hairColor.length) {
      params.append("hairColor", filters.hairColor.join(","))
    }

    if (filters.ageRange.length) {
      params.append("ageRange", filters.ageRange.join(","))
    }

    if (filters.services.length) {
      params.append("services", filters.services.join(","))
    }

    if (filters.catersTo.length) {
      params.append("catersTo", filters.catersTo.join(","))
    }

    if (filters.placeOfService.length) {
      params.append("placeOfService", filters.placeOfService.join(","))
    }

    // Navigate to search results with filters
    router.push(`/search-results?${params.toString()}`)
    closeModal()
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">Search</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category and Location Dropdowns */}
            <div className="mb-4">
              <div className="border border-gray-200 rounded p-2 mb-2 bg-gray-50">
                <span className="text-gray-700">Escorts</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  className="border border-gray-200 rounded p-2 w-full"
                  value={filters.state}
                  onChange={(e) => dispatch({ type: "SET_STATE", payload: e.target.value })}
                  aria-label="Select state"
                >
                  <option value="">States</option>
                  {statesList.map((state) => (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <select
                  className="border border-gray-200 rounded p-2 w-full"
                  value={filters.city}
                  onChange={(e) => dispatch({ type: "SET_CITY", payload: e.target.value })}
                  disabled={!filters.state}
                  aria-label="Select city"
                >
                  <option value="">All the cities</option>
                  {citiesList.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                type="text"
                placeholder="Search here..."
                value={filters.searchText}
                onChange={(e) => dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })}
                className="w-full mt-2 mb-4"
                aria-label="Search text"
              />
            </div>

            {/* Filters Header */}
            <div className="flex items-center mb-3">
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
                className="text-primary mr-2"
              >
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              <span className="text-sm font-medium">Filters</span>
            </div>

            {/* Ethnicity Filter */}
            <FilterSection title="Ethnicity" selectedCount={filters.ethnicity.length}>
              <div className="flex flex-wrap gap-2">
                {ethnicities.map((ethnicity) => (
                  <FilterButton
                    key={ethnicity}
                    isSelected={filters.ethnicity.includes(ethnicity)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "ethnicity", value: ethnicity } })
                    }
                  >
                    {ethnicity}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Nationality Filter */}
            <FilterSection title="Nationality" selectedCount={filters.nationality.length}>
              <div className="flex flex-wrap gap-2">
                {nationalities.map((nationality) => (
                  <FilterButton
                    key={nationality}
                    isSelected={filters.nationality.includes(nationality)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "nationality", value: nationality } })
                    }
                  >
                    {nationality}
                  </FilterButton>
                ))}
              </div>
              <button className="text-xs text-primary mt-2 hover:underline focus:outline-none focus:underline">
                + Show all
              </button>
            </FilterSection>

            {/* Body Type Filter */}
            <FilterSection title="Body type" selectedCount={filters.bodyType.length}>
              <div className="flex flex-wrap gap-2">
                {bodyTypes.map((bodyType) => (
                  <FilterButton
                    key={bodyType}
                    isSelected={filters.bodyType.includes(bodyType)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "bodyType", value: bodyType } })
                    }
                  >
                    {bodyType}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Breast Filter */}
            <FilterSection title="Breast" selectedCount={filters.breastType.length}>
              <div className="flex flex-wrap gap-2">
                {breastTypes.map((breastType) => (
                  <FilterButton
                    key={breastType}
                    isSelected={filters.breastType.includes(breastType)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "breastType", value: breastType } })
                    }
                  >
                    {breastType}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Hair Filter */}
            <FilterSection title="Hair" selectedCount={filters.hairColor.length}>
              <div className="flex flex-wrap gap-2">
                {hairColors.map((hairColor) => (
                  <FilterButton
                    key={hairColor}
                    isSelected={filters.hairColor.includes(hairColor)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "hairColor", value: hairColor } })
                    }
                  >
                    {hairColor}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Age Filter */}
            <FilterSection title="Age" selectedCount={filters.ageRange.length}>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((ageRange) => (
                  <FilterButton
                    key={ageRange}
                    isSelected={filters.ageRange.includes(ageRange)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "ageRange", value: ageRange } })
                    }
                  >
                    {ageRange}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Rate Filter */}
            <FilterSection title="Rate">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">${filters.priceRange[0]}</span>
                  <span className="text-gray-700">
                    {filters.priceRange[1] >= 1000 ? "$1000+" : `$${filters.priceRange[1]}`}
                  </span>
                </div>
                <div className="relative">
                  <Slider
                    value={filters.priceRange}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={(value) => dispatch({ type: "SET_PRICE_RANGE", payload: value as [number, number] })}
                    className="mt-2"
                  />
                </div>
              </div>
            </FilterSection>

            {/* Services Filter */}
            <FilterSection title="Services" selectedCount={filters.services.length}>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <FilterButton
                    key={service}
                    isSelected={filters.services.includes(service)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "services", value: service } })
                    }
                  >
                    {service}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Caters To Filter */}
            <FilterSection title="Caters to" selectedCount={filters.catersTo.length}>
              <div className="flex flex-wrap gap-2">
                {catersTo.map((caterTo) => (
                  <FilterButton
                    key={caterTo}
                    isSelected={filters.catersTo.includes(caterTo)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "catersTo", value: caterTo } })
                    }
                  >
                    {caterTo}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            {/* Place of Service Filter */}
            <FilterSection title="Place of service" selectedCount={filters.placeOfService.length}>
              <div className="flex flex-wrap gap-2">
                {placesOfService.map((place) => (
                  <FilterButton
                    key={place}
                    isSelected={filters.placeOfService.includes(place)}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_FILTER", payload: { category: "placeOfService", value: place } })
                    }
                  >
                    {place}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Footer */}
          <motion.div
            className="sticky bottom-0 bg-white border-t p-4 flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => dispatch({ type: "CLEAR_ALL" })}
              className="flex-1 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              CLEAR ALL
            </button>
            <button
              onClick={handleSearch}
              className="flex-1 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              SEARCH
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
