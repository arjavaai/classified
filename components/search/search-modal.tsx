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
const nationalities = ["Indian", "South African", "Russian", "Kenyan"]
const allNationalities = [
  "Albanian", "American", "Arabic", "Argentinian", "Australian", "Austrian", 
  "Bangladeshi", "Belgian", "Bolivian", "Bosnian", "Brazilian", "Bulgarian", 
  "Canadian", "Chilean", "Chinese", "Colombian", "Costa Rican", "Croatian", 
  "Cuban", "Czech", "Danisn", "Dominican", "Dutch", "Ecuadorian", "English", 
  "Estonian", "Filipino", "Finnish", "French", "German", "Greek", "Guatemalan", 
  "Haitian", "Honduran", "Hungarian", "Indian", "Indonesian", "Irish", "Italian", 
  "Jamaican", "Japanese", "Kenyan", "Letvian", "Lithuanian", "Malaysian", 
  "Maldivian", "Mexican", "Moldovan", "Moroccan", "NewZealander", "Nicaraguan", 
  "Nigerian", "Norwegian", "Pakistani", "Panamanian", "Paraguayan", "Peruvian", 
  "Polish", "Portuguese", "Romanian", "Russian", "Senegalese", "Serbian", 
  "Singaporean", "South African", "Spanish", "Swedish", "Swiss", "Thai", 
  "Tunisian", "Turkish", "Ukrainian", "Uruguayan", "Venezuelan", "Vietnamese"
]
const bodyTypes = ["Slender", "Athletic", "Curvy", "BBW"]
const breastTypes = ["Natural Boobs", "Busty"]
const hairColors = ["Blond Hair", "Brown Hair", "Black Hair", "Red Hair", "Others"]
const ageRanges = ["18-19", "20s", "30s", "40s", "50s", "60+"]
const services = [
  "Oral",
  "Anal",
  "BDSM",
  "Girlfriend experience",
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
  const [showAllNationalities, setShowAllNationalities] = useState(false)

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

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30" 
        onClick={closeModal}
      />
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-md shadow-lg w-[800px] max-w-[95vw] max-h-[90vh] z-50 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h2 className="text-lg font-semibold">Search</h2>
            </div>
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
        <div className="p-4 px-6 overflow-y-auto">
          {/* Category and Location Dropdowns */}
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="border border-gray-200 rounded-md p-3 w-full h-12"
                value={filters.state}
                onChange={(e) => dispatch({ type: "SET_STATE", payload: e.target.value })}
                aria-label="Select state"
              >
                <option value="">All Regions</option>
                {statesList.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                className="border border-gray-200 rounded-md p-3 w-full h-12"
                value={filters.city}
                onChange={(e) => dispatch({ type: "SET_CITY", payload: e.target.value })}
                disabled={!filters.state}
                aria-label="Select city"
              >
                <option value="">Cities {!filters.state ? "not available" : ""}</option>
                {citiesList.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</h3>
            <Slider
              defaultValue={[0, 1000]}
              min={0}
              max={1000}
              step={50}
              value={filters.priceRange}
              onValueChange={(value) => dispatch({ type: "SET_PRICE_RANGE", payload: value as [number, number] })}
              className="my-4"
            />
          </div>

          {/* Filter Sections */}
          <div className="space-y-0">
            {/* Filters Header */}
            <div className="flex items-center justify-between mb-1 border-b pb-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <span className="text-base font-bold">Filters</span>
              </div>
              <button
                onClick={() => dispatch({ type: "CLEAR_ALL" })}
                className="text-primary hover:text-primary-dark font-medium"
              >
                All Clear
              </button>
            </div>

            <FilterSection title="Ethnicity" selectedCount={filters.ethnicity.length}>
              <div className="flex flex-wrap gap-2">
                {ethnicities.map((ethnicity) => (
                  <FilterButton
                    key={ethnicity}
                    isSelected={filters.ethnicity.includes(ethnicity)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "ethnicity", value: ethnicity },
                      })
                    }
                  >
                    {ethnicity}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Nationality" selectedCount={filters.nationality.length}>
              <div className="flex flex-wrap gap-2 mb-2">
                {nationalities.map((nationality) => (
                  <FilterButton
                    key={nationality}
                    isSelected={filters.nationality.includes(nationality)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "nationality", value: nationality },
                      })
                    }
                  >
                    {nationality}
                  </FilterButton>
                ))}
                
                <AnimatePresence>
                  {showAllNationalities && (
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {allNationalities
                        .filter(nat => !nationalities.includes(nat))
                        .map((nationality) => (
                          <FilterButton
                            key={nationality}
                            isSelected={filters.nationality.includes(nationality)}
                            onClick={() =>
                              dispatch({
                                type: "TOGGLE_FILTER",
                                payload: { category: "nationality", value: nationality },
                              })
                            }
                          >
                            {nationality}
                          </FilterButton>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setShowAllNationalities(!showAllNationalities)}
                className="text-primary hover:text-primary-dark font-medium text-sm mt-1"
              >
                {showAllNationalities ? "Show Less" : "Show More"}
              </button>
            </FilterSection>

            <FilterSection title="Body Type" selectedCount={filters.bodyType.length}>
              <div className="flex flex-wrap gap-2">
                {bodyTypes.map((bodyType) => (
                  <FilterButton
                    key={bodyType}
                    isSelected={filters.bodyType.includes(bodyType)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "bodyType", value: bodyType },
                      })
                    }
                  >
                    {bodyType}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Breast Type" selectedCount={filters.breastType.length}>
              <div className="flex flex-wrap gap-2">
                {breastTypes.map((breastType) => (
                  <FilterButton
                    key={breastType}
                    isSelected={filters.breastType.includes(breastType)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "breastType", value: breastType },
                      })
                    }
                  >
                    {breastType}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Hair Color" selectedCount={filters.hairColor.length}>
              <div className="flex flex-wrap gap-2">
                {hairColors.map((hairColor) => (
                  <FilterButton
                    key={hairColor}
                    isSelected={filters.hairColor.includes(hairColor)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "hairColor", value: hairColor },
                      })
                    }
                  >
                    {hairColor}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Age Range" selectedCount={filters.ageRange.length}>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((ageRange) => (
                  <FilterButton
                    key={ageRange}
                    isSelected={filters.ageRange.includes(ageRange)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "ageRange", value: ageRange },
                      })
                    }
                  >
                    {ageRange}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Services" selectedCount={filters.services.length}>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <FilterButton
                    key={service}
                    isSelected={filters.services.includes(service)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "services", value: service },
                      })
                    }
                  >
                    {service}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Caters To" selectedCount={filters.catersTo.length}>
              <div className="flex flex-wrap gap-2">
                {catersTo.map((caterTo) => (
                  <FilterButton
                    key={caterTo}
                    isSelected={filters.catersTo.includes(caterTo)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "catersTo", value: caterTo },
                      })
                    }
                  >
                    {caterTo}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Place of Service" selectedCount={filters.placeOfService.length}>
              <div className="flex flex-wrap gap-2">
                {placesOfService.map((place) => (
                  <FilterButton
                    key={place}
                    isSelected={filters.placeOfService.includes(place)}
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FILTER",
                        payload: { category: "placeOfService", value: place },
                      })
                    }
                  >
                    {place}
                  </FilterButton>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>

        {/* Footer with Search Button */}
        <div className="sticky bottom-0 bg-white border-t p-4 px-6 mt-auto">
          <div className="flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-[#007bff] text-white font-medium rounded-[4px] px-8 py-4 hover:bg-blue-700 border border-blue-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
