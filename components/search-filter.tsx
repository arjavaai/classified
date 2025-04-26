"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Filter, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { getStates, getCitiesByStateCode } from "@/lib/demo-data"

export default function SearchFilter({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [ageRange, setAgeRange] = useState([18, 50])
  const [priceRange, setPriceRange] = useState([50, 500])
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedEthnicity, setSelectedEthnicity] = useState<string[]>([])
  const [selectedNationality, setSelectedNationality] = useState<string[]>([])
  const [selectedBodyType, setSelectedBodyType] = useState<string[]>([])
  const [selectedBreastType, setSelectedBreastType] = useState<string[]>([])
  const [selectedHairColor, setSelectedHairColor] = useState<string[]>([])
  const [selectedCatersTo, setSelectedCatersTo] = useState<string[]>([])
  const [selectedPlaceOfService, setSelectedPlaceOfService] = useState<string[]>([])
  const [searchText, setSearchText] = useState("")
  const [statesList, setStatesList] = useState<{name: string; abbreviation: string}[]>([])
  const [citiesList, setCitiesList] = useState<{name: string; slug: string}[]>([])

  // Load states when component mounts
  useEffect(() => {
    setStatesList(getStates())
  }, [])

  // Load cities when state changes
  useEffect(() => {
    if (selectedState) {
      setCitiesList(getCitiesByStateCode(selectedState))
      setSelectedCity("") // Reset city when state changes
    } else {
      setCitiesList([])
    }
  }, [selectedState])

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
    "Dinner dates",
    "Travel companion",
    "Outcall",
    "Incall",
    "Events",
  ]

  const ethnicities = ["Arabian", "Asian", "Ebony", "Caucasian", "Hispanic", "Indian", "Latin", "Mixed race", "Others"]

  const nationalities = [
    "American",
    "Indian",
    "South African",
    "Russian",
    "Kenyan",
    "Brazilian",
    "Thai",
    "Japanese",
    "Chinese",
    "European",
  ]

  const bodyTypes = ["Slender", "Athletic", "Curvy", "BBW"]
  const breastTypes = ["Natural Boobs", "Busty"]
  const hairColors = ["Blond Hair", "Brown Hair", "Black Hair", "Red Hair", "Others"]
  const catersTo = ["Men", "Women", "Non-binary", "Couples"]
  const placesOfService = ["At home", "Events and parties", "Hotel / Motel", "Clubs", "Incall", "Outcall"]

  const toggleItem = (
    item: string,
    currentItems: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setItems(currentItems.includes(item) ? currentItems.filter((i) => i !== item) : [...currentItems, item])
  }

  const handleApplyFilters = () => {
    onApplyFilters({
      searchText,
      ageRange,
      priceRange,
      city: selectedCity,
      state: selectedState,
      services: selectedServices,
      ethnicity: selectedEthnicity,
      nationality: selectedNationality,
      bodyType: selectedBodyType,
      breastType: selectedBreastType,
      hairColor: selectedHairColor,
      catersTo: selectedCatersTo,
      placeOfService: selectedPlaceOfService,
    })
    setIsFilterOpen(false)
  }

  const handleClearFilters = () => {
    setAgeRange([18, 50])
    setPriceRange([50, 500])
    setSelectedCity("")
    setSelectedState("")
    setSelectedServices([])
    setSelectedEthnicity([])
    setSelectedNationality([])
    setSelectedBodyType([])
    setSelectedBreastType([])
    setSelectedHairColor([])
    setSelectedCatersTo([])
    setSelectedPlaceOfService([])
    setSearchText("")
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Search Results</h2>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      {isFilterOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filter Options</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Text */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full mb-4"
            />
          </div>

          <Accordion type="multiple" className="w-full">
            {/* Location Filter */}
            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {statesList.map((state) => (
                          <SelectItem key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select 
                      value={selectedCity} 
                      onValueChange={setSelectedCity}
                      disabled={!selectedState}
                    >
                      <SelectTrigger id="city">
                        <SelectValue placeholder={selectedState ? "Select city" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {citiesList.map((city) => (
                          <SelectItem key={city.slug} value={city.slug}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Ethnicity Filter */}
            <AccordionItem value="ethnicity">
              <AccordionTrigger>Ethnicity</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {ethnicities.map((ethnicity) => (
                    <div key={ethnicity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ethnicity-${ethnicity}`}
                        checked={selectedEthnicity.includes(ethnicity)}
                        onCheckedChange={() => toggleItem(ethnicity, selectedEthnicity, setSelectedEthnicity)}
                      />
                      <Label htmlFor={`ethnicity-${ethnicity}`} className="text-sm">
                        {ethnicity}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Nationality Filter */}
            <AccordionItem value="nationality">
              <AccordionTrigger>Nationality</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {nationalities.map((nationality) => (
                    <div key={nationality} className="flex items-center space-x-2">
                      <Checkbox
                        id={`nationality-${nationality}`}
                        checked={selectedNationality.includes(nationality)}
                        onCheckedChange={() => toggleItem(nationality, selectedNationality, setSelectedNationality)}
                      />
                      <Label htmlFor={`nationality-${nationality}`} className="text-sm">
                        {nationality}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Body Type Filter */}
            <AccordionItem value="bodyType">
              <AccordionTrigger>Body Type</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {bodyTypes.map((bodyType) => (
                    <div key={bodyType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`bodyType-${bodyType}`}
                        checked={selectedBodyType.includes(bodyType)}
                        onCheckedChange={() => toggleItem(bodyType, selectedBodyType, setSelectedBodyType)}
                      />
                      <Label htmlFor={`bodyType-${bodyType}`} className="text-sm">
                        {bodyType}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Breast Type Filter */}
            <AccordionItem value="breastType">
              <AccordionTrigger>Breast</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {breastTypes.map((breastType) => (
                    <div key={breastType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`breastType-${breastType}`}
                        checked={selectedBreastType.includes(breastType)}
                        onCheckedChange={() => toggleItem(breastType, selectedBreastType, setSelectedBreastType)}
                      />
                      <Label htmlFor={`breastType-${breastType}`} className="text-sm">
                        {breastType}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Hair Color Filter */}
            <AccordionItem value="hairColor">
              <AccordionTrigger>Hair</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {hairColors.map((hairColor) => (
                    <div key={hairColor} className="flex items-center space-x-2">
                      <Checkbox
                        id={`hairColor-${hairColor}`}
                        checked={selectedHairColor.includes(hairColor)}
                        onCheckedChange={() => toggleItem(hairColor, selectedHairColor, setSelectedHairColor)}
                      />
                      <Label htmlFor={`hairColor-${hairColor}`} className="text-sm">
                        {hairColor}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Age Range Filter */}
            <AccordionItem value="age">
              <AccordionTrigger>Age Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="filter-chips flex flex-wrap gap-2">
                    <Button
                      variant={ageRange[0] === 18 && ageRange[1] === 19 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAgeRange([18, 19])}
                      className="text-xs"
                    >
                      18-19
                    </Button>
                    <Button
                      variant={ageRange[0] === 20 && ageRange[1] === 29 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAgeRange([20, 29])}
                      className="text-xs"
                    >
                      20s
                    </Button>
                    <Button
                      variant={ageRange[0] === 30 && ageRange[1] === 39 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAgeRange([30, 39])}
                      className="text-xs"
                    >
                      30s
                    </Button>
                    <Button
                      variant={ageRange[0] === 40 && ageRange[1] === 49 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAgeRange([40, 49])}
                      className="text-xs"
                    >
                      40s
                    </Button>
                    <Button
                      variant={ageRange[0] === 50 && ageRange[1] === 59 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAgeRange([50, 59])}
                      className="text-xs"
                    >
                      50s
                    </Button>
                    <Button
                      variant={ageRange[0] === 60 && ageRange[1] === 99 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAgeRange([60, 99])}
                      className="text-xs"
                    >
                      60+
                    </Button>
                  </div>
                  <div className="pt-2">
                    <Slider value={ageRange} min={18} max={99} step={1} onValueChange={setAgeRange} className="mt-6" />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">{ageRange[0]} years</span>
                      <span className="text-sm">{ageRange[1]} years</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range Filter */}
            <AccordionItem value="price">
              <AccordionTrigger>Rate</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={setPriceRange}
                    className="mt-6"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">{priceRange[1] >= 1000 ? "$1000+" : `$${priceRange[1]}`}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Services Filter */}
            <AccordionItem value="services">
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => toggleItem(service, selectedServices, setSelectedServices)}
                      />
                      <Label htmlFor={service} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Caters To Filter */}
            <AccordionItem value="catersTo">
              <AccordionTrigger>Caters to</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {catersTo.map((caterTo) => (
                    <div key={caterTo} className="flex items-center space-x-2">
                      <Checkbox
                        id={`caterTo-${caterTo}`}
                        checked={selectedCatersTo.includes(caterTo)}
                        onCheckedChange={() => toggleItem(caterTo, selectedCatersTo, setSelectedCatersTo)}
                      />
                      <Label htmlFor={`caterTo-${caterTo}`} className="text-sm">
                        {caterTo}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Place of Service Filter */}
            <AccordionItem value="placeOfService">
              <AccordionTrigger>Place of service</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {placesOfService.map((place) => (
                    <div key={place} className="flex items-center space-x-2">
                      <Checkbox
                        id={`place-${place}`}
                        checked={selectedPlaceOfService.includes(place)}
                        onCheckedChange={() => toggleItem(place, selectedPlaceOfService, setSelectedPlaceOfService)}
                      />
                      <Label htmlFor={`place-${place}`} className="text-sm">
                        {place}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button variant="outline" onClick={handleClearFilters}>
              CLEAR ALL
            </Button>
            <Button onClick={handleApplyFilters}>SEARCH</Button>
          </div>
        </div>
      )}
    </div>
  )
}
