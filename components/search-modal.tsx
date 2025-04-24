"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (filters: any) => void
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [searchText, setSearchText] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Filter selections
  const [selectedEthnicity, setSelectedEthnicity] = useState<string[]>([])
  const [selectedNationality, setSelectedNationality] = useState<string[]>([])
  const [selectedBodyType, setSelectedBodyType] = useState<string[]>([])
  const [selectedBreastType, setSelectedBreastType] = useState<string[]>([])
  const [selectedHairColor, setSelectedHairColor] = useState<string[]>([])
  const [selectedAgeRange, setSelectedAgeRange] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedCatersTo, setSelectedCatersTo] = useState<string[]>([])
  const [selectedPlaceOfService, setSelectedPlaceOfService] = useState<string[]>([])

  // Filter options
  const ethnicities = ["Arabian", "Asian", "Ebony", "Caucasian", "Hispanic", "Indian", "Latin", "Mixed race", "Others"]
  const nationalities = ["is Indian", "is South African", "is Russian", "is Kenyan"]
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

  // Toggle selection in array
  const toggleSelection = (
    item: string,
    currentItems: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (currentItems.includes(item)) {
      setItems(currentItems.filter((i) => i !== item))
    } else {
      setItems([...currentItems, item])
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchText("")
    setSelectedState("")
    setSelectedCity("")
    setPriceRange([0, 1000])
    setSelectedEthnicity([])
    setSelectedNationality([])
    setSelectedBodyType([])
    setSelectedBreastType([])
    setSelectedHairColor([])
    setSelectedAgeRange([])
    setSelectedServices([])
    setSelectedCatersTo([])
    setSelectedPlaceOfService([])
  }

  // Handle search
  const handleSearch = () => {
    onSearch({
      searchText,
      state: selectedState,
      city: selectedCity,
      priceRange,
      ethnicity: selectedEthnicity,
      nationality: selectedNationality,
      bodyType: selectedBodyType,
      breastType: selectedBreastType,
      hairColor: selectedHairColor,
      ageRange: selectedAgeRange,
      services: selectedServices,
      catersTo: selectedCatersTo,
      placeOfService: selectedPlaceOfService,
    })
    onClose()
  }

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">States</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
            </select>

            <select
              className="border border-gray-200 rounded p-2 w-full"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All the cities</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="san-francisco">San Francisco</option>
              <option value="san-diego">San Diego</option>
              <option value="new-york">New York</option>
              <option value="miami">Miami</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
            </select>
          </div>

          <Input
            type="text"
            placeholder="Search here..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full mt-2 mb-4"
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
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Ethnicity</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {ethnicities.map((ethnicity) => (
              <button
                key={ethnicity}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedEthnicity.includes(ethnicity)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(ethnicity, selectedEthnicity, setSelectedEthnicity)}
              >
                {ethnicity}
              </button>
            ))}
          </div>
        </div>

        {/* Nationality Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Nationality</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {nationalities.map((nationality) => (
              <button
                key={nationality}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedNationality.includes(nationality)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(nationality, selectedNationality, setSelectedNationality)}
              >
                {nationality}
              </button>
            ))}
          </div>
          <button className="text-xs text-primary mt-2">+ Show all</button>
        </div>

        {/* Body Type Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Body type</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((bodyType) => (
              <button
                key={bodyType}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedBodyType.includes(bodyType)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(bodyType, selectedBodyType, setSelectedBodyType)}
              >
                {bodyType}
              </button>
            ))}
          </div>
        </div>

        {/* Breast Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Breast</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {breastTypes.map((breastType) => (
              <button
                key={breastType}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedBreastType.includes(breastType)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(breastType, selectedBreastType, setSelectedBreastType)}
              >
                {breastType}
              </button>
            ))}
          </div>
        </div>

        {/* Hair Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Hair</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {hairColors.map((hairColor) => (
              <button
                key={hairColor}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedHairColor.includes(hairColor)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(hairColor, selectedHairColor, setSelectedHairColor)}
              >
                {hairColor}
              </button>
            ))}
          </div>
        </div>

        {/* Age Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Age</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {ageRanges.map((ageRange) => (
              <button
                key={ageRange}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedAgeRange.includes(ageRange)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(ageRange, selectedAgeRange, setSelectedAgeRange)}
              >
                {ageRange}
              </button>
            ))}
          </div>
        </div>

        {/* Rate Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Rate</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">${priceRange[0]}</span>
              <span className="text-gray-700">{priceRange[1] >= 1000 ? "$1000+" : `$${priceRange[1]}`}</span>
            </div>
            <div className="relative">
              <Slider value={priceRange} min={0} max={1000} step={10} onValueChange={setPriceRange} className="mt-2" />
            </div>
          </div>
        </div>

        {/* Services Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Services</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <button
                key={service}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedServices.includes(service)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(service, selectedServices, setSelectedServices)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Caters To Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Caters to</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {catersTo.map((caterTo) => (
              <button
                key={caterTo}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedCatersTo.includes(caterTo)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(caterTo, selectedCatersTo, setSelectedCatersTo)}
              >
                {caterTo}
              </button>
            ))}
          </div>
        </div>

        {/* Place of Service Filter */}
        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Place of service</h3>
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
              className="text-primary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {placesOfService.map((place) => (
              <button
                key={place}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedPlaceOfService.includes(place)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleSelection(place, selectedPlaceOfService, setSelectedPlaceOfService)}
              >
                {place}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex gap-4">
        <button onClick={clearAllFilters} className="flex-1 py-2 bg-gray-200 text-gray-700 font-medium rounded-md">
          CLEAR ALL
        </button>
        <button onClick={handleSearch} className="flex-1 py-2 bg-primary text-white font-medium rounded-md">
          SEARCH
        </button>
      </div>
    </div>
  )
}
