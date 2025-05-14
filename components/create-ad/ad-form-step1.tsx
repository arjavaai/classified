"use client"

import type React from "react"

import { useAdCreation } from "./ad-creation-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getStates, getCitiesByStateCode } from "@/lib/demo-data"
import { useAuth } from "@/lib/context/auth-context"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

// Import nationality data from search modal
const ethnicities = ["Arabian", "Asian", "Ebony", "Caucasian", "Hispanic", "Indian", "Latin", "Mixed race", "Others"]
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

// Import AdFormData type from context
import { AdFormData as AdFormDataType } from "./ad-creation-context"

// Define the local AdFormData interface
interface AdFormData extends Omit<AdFormDataType, 'step' | 'adType' | 'photos' | 'termsAccepted'> {
  // Any additional fields specific to this component can be added here

  ethnicity: string[]
  nationality: string[]
  bodyType: string[]
  breastType: string[]
  hairColor: string[]
  services: string[]
  catersTo: string[]
  placeOfService: string[]
  incallRates: Record<string, string>
  outcallRates: Record<string, string>
}

export default function AdFormStep1() {
  const { state, dispatch } = useAdCreation()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [statesList, setStatesList] = useState<{name: string; abbreviation: string}[]>([])
  const [citiesList, setCitiesList] = useState<{name: string; slug: string}[]>([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Load states when component mounts
  useEffect(() => {
    setStatesList(getStates())
  }, [])

  // Update cities when state changes
  useEffect(() => {
    if (state.state) {
      // Find the state abbreviation from the full state name
      const stateObj = statesList.find(s => s.name === state.state);
      if (stateObj) {
        setCitiesList(getCitiesByStateCode(stateObj.abbreviation));
      } else {
        setCitiesList([]);
      }
    } else {
      setCitiesList([]);
    }
  }, [state.state, statesList])

  const handleChange = (field: keyof AdFormData, value: string | boolean | string[]) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: { [field]: value }
    })
  }

  const handleStateChange = (value: string) => {
    // Find the state object by abbreviation to get the full name
    const stateObj = statesList.find(s => s.abbreviation === value);
    if (stateObj) {
      // Store the full state name instead of the abbreviation
      handleChange("state", stateObj.name);
    } else {
      handleChange("state", value);
    }
    handleChange("city", ""); // Reset city when state changes
  }

  const handleCityChange = (value: string) => {
    handleChange("city", value)
  }

  const handleContactPreferenceChange = (value: "email" | "phone" | "both") => {
    handleChange("contactPreference", value)
  }

  const toggleSelection = (
    field: keyof Pick<
      AdFormData,
      "ethnicity" | "bodyType" | "breastType" | "hairColor" | "services" | "catersTo" | "placeOfService" | "nationality"
    >,
    value: string,
  ) => {
    const currentValues = state[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    handleChange(field, newValues);
  }

  const goToNextStep = () => {
    // Basic validation - only validate required fields
    if (!state.name || !state.age || !state.title || !state.description || !state.state || !state.city) {
      alert("Please fill in all required fields")
      return
    }

    if (Number.parseInt(state.age) < 18) {
      alert("You must be 18 years or older")
      return
    }
    
    // Check if user is logged in
    if (!loading && !user) {
      // User is not logged in, show login prompt
      setShowLoginPrompt(true)
      return
    }

    dispatch({ type: "SET_STEP", payload: 2 })
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleRedirectToLogin = () => {
    // Save the current form state to localStorage before redirecting
    localStorage.setItem('pendingAdData', JSON.stringify(state))
    
    // Redirect to login page
    router.push('/login')
  }

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Two-column layout for basic info on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-lg mb-2">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Name"
              className="p-4 text-base"
            />
          </div>

          {/* Age Field */}
          <div>
            <Label htmlFor="age" className="text-lg mb-2">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="age"
              name="age"
              value={state.age}
              onChange={(e) => handleChange("age", e.target.value)}
              min="18"
              max="99"
              placeholder="Enter Age"
              className="p-4 text-base"
            />
          </div>
        </div>

        {/* Contact Preference Field */}
        <div>
          <Label className="text-lg mb-2">
            How would you like to be connected? <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ContactOption
              id="email-only"
              value="email"
              label="Only Email"
              checked={state.contactPreference === "email"}
              onChange={() => handleContactPreferenceChange("email")}
            />
            <ContactOption
              id="phone-only"
              value="phone"
              label="Only Phone"
              checked={state.contactPreference === "phone"}
              onChange={() => handleContactPreferenceChange("phone")}
            />
            <ContactOption
              id="email-phone"
              value="both"
              label="Email & Phone"
              checked={state.contactPreference === "both"}
              onChange={() => handleContactPreferenceChange("both")}
            />
          </div>
        </div>

        {/* Two-column layout for contact info on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Field */}
          {(state.contactPreference === "email" || state.contactPreference === "both") && (
            <div>
              <Label htmlFor="email" className="text-lg mb-2">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={state.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter Email"
                className="p-4 text-base"
              />
            </div>
          )}

          {/* Phone Field */}
          {(state.contactPreference === "phone" || state.contactPreference === "both") && (
            <div>
              <Label htmlFor="phone" className="text-lg mb-2">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={state.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter Phone Number"
                className="p-4 text-base"
              />
            </div>
          )}
        </div>

        {/* WhatsApp and SMS Options - Only visible when phone is selected */}
        {(state.contactPreference === "phone" || state.contactPreference === "both") && (
          <div className="flex flex-wrap items-center gap-6">
            {/* WhatsApp Toggle */}
            <div className="flex items-center space-x-4">
              <Label className="text-lg">WhatsApp</Label>
              <div 
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${
                  state.whatsapp 
                    ? "bg-[#007bff]" 
                    : "bg-gray-200 border border-[#007bff]"
                }`}
                onClick={() => handleChange("whatsapp", !state.whatsapp)}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform shadow-sm ${
                    state.whatsapp ? "translate-x-8" : "translate-x-0"
                  }`}
                >
                  {state.whatsapp ? (
                    <span className="text-[#007bff] text-xs font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-500 text-xs font-medium">No</span>
                  )}
                </span>
              </div>
            </div>
            
            {/* SMS Toggle */}
            <div className="flex items-center space-x-4">
              <Label className="text-lg">SMS</Label>
              <div 
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors cursor-pointer ${
                  state.sms 
                    ? "bg-[#007bff]" 
                    : "bg-gray-200 border border-[#007bff]"
                }`}
                onClick={() => handleChange("sms", !state.sms)}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform shadow-sm ${
                    state.sms ? "translate-x-8" : "translate-x-0"
                  }`}
                >
                  {state.sms ? (
                    <span className="text-[#007bff] text-xs font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-500 text-xs font-medium">No</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Two-column layout for location on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* State Field */}
          <div>
            <Label htmlFor="state" className="text-lg mb-2">
              All Regions<span className="text-red-500">*</span>
            </Label>
            <Select
              value={statesList.find(s => s.name === state.state)?.abbreviation || ""}
              onValueChange={handleStateChange}
            >
              <SelectTrigger id="state" className="p-4 text-base">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {statesList.map((stateItem) => (
                  <SelectItem key={stateItem.abbreviation} value={stateItem.abbreviation}>
                    {stateItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Field */}
          <div>
            <Label htmlFor="city" className="text-lg mb-2">
              City <span className="text-red-500">*</span>
            </Label>
            <Select
              value={state.city}
              onValueChange={handleCityChange}
              disabled={!state.state}
            >
              <SelectTrigger id="city" className="p-4 text-base">
                <SelectValue placeholder={state.state ? "Select City" : "Select State First"} />
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

        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="text-lg mb-2">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={state.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter your ad title"
            className="p-4 text-base"
          />
        </div>

        {/* Description Field */}
        <div>
          <Label htmlFor="description" className="text-lg mb-2">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={state.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={5}
            placeholder="Tell potential clients about yourself and your services..."
            className="p-4 text-base"
          />
        </div>

        {/* Nationality Field */}
        <div>
          <Label className="text-lg mb-2">
            Nationality
          </Label>
          <div className="flex flex-wrap gap-2">
            {allNationalities.map((nationality) => (
              <FilterChip
                key={nationality}
                label={nationality}
                active={state.nationality.includes(nationality)}
                onClick={() => toggleSelection("nationality", nationality)}
              />
            ))}
          </div>
        </div>

        {/* Ethnicity Field */}
        <div>
          <Label className="text-lg mb-2">
            Ethnicity
          </Label>
          <div className="flex flex-wrap gap-2">
            {ethnicities.map((ethnicity) => (
              <FilterChip
                key={ethnicity}
                label={ethnicity}
                active={state.ethnicity.includes(ethnicity)}
                onClick={() => toggleSelection("ethnicity", ethnicity)}
              />
            ))}
          </div>
        </div>

        {/* Body Type Field */}
        <div>
          <Label className="text-lg mb-2">
            Body Type
          </Label>
          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((bodyType) => (
              <FilterChip
                key={bodyType}
                label={bodyType}
                active={state.bodyType.includes(bodyType)}
                onClick={() => toggleSelection("bodyType", bodyType)}
              />
            ))}
          </div>
        </div>

        {/* Breast Type Field */}
        <div>
          <Label className="text-lg mb-2">
            Breast
          </Label>
          <div className="flex flex-wrap gap-2">
            {breastTypes.map((breastType) => (
              <FilterChip
                key={breastType}
                label={breastType}
                active={state.breastType.includes(breastType)}
                onClick={() => toggleSelection("breastType", breastType)}
              />
            ))}
          </div>
        </div>

        {/* Hair Color Field */}
        <div>
          <Label className="text-lg mb-2">
            Hair
          </Label>
          <div className="flex flex-wrap gap-2">
            {hairColors.map((hairColor) => (
              <FilterChip
                key={hairColor}
                label={hairColor}
                active={state.hairColor.includes(hairColor)}
                onClick={() => toggleSelection("hairColor", hairColor)}
              />
            ))}
          </div>
        </div>

        {/* Services Field */}
        <div>
          <Label className="text-lg mb-2">
            Services
          </Label>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <FilterChip
                key={service}
                label={service}
                active={state.services.includes(service)}
                onClick={() => toggleSelection("services", service)}
              />
            ))}
          </div>
        </div>

        {/* Caters To Field */}
        <div>
          <Label className="text-lg mb-2">
            Caters to
          </Label>
          <div className="flex flex-wrap gap-2">
            {catersTo.map((option) => (
              <FilterChip
                key={option}
                label={option}
                active={state.catersTo.includes(option)}
                onClick={() => toggleSelection("catersTo", option)}
              />
            ))}
          </div>
        </div>

        {/* Place of Services Field */}
        <div>
          <Label className="text-lg mb-2">
            Place of services
          </Label>
          <div className="flex flex-wrap gap-2">
            {["At home", "Events and parties", "Hotel / Motel", "Clubs", "Incall", "Outcall"].map((place) => (
              <FilterChip
                key={place}
                label={place}
                active={state.placeOfService.includes(place)}
                onClick={() => toggleSelection("placeOfService", place)}
              />
            ))}
          </div>
        </div>

        {/* Incall Rates Table */}
        <div>
          <Label className="text-lg mb-2">
            Incall Rates
          </Label>
          <RatesTable
            rates={state.incallRates}
            onChange={(key, value) => {
              const updatedRates = { ...state.incallRates, [key]: value }
              dispatch({ type: "UPDATE_FORM", payload: { incallRates: updatedRates } })
            }}
          />
        </div>

        {/* Outcall Rates Table */}
        <div>
          <Label className="text-lg mb-2">
            Outcall Rates
          </Label>
          <RatesTable
            rates={state.outcallRates}
            onChange={(key, value) => {
              const updatedRates = { ...state.outcallRates, [key]: value }
              dispatch({ type: "UPDATE_FORM", payload: { outcallRates: updatedRates } })
            }}
          />
        </div>

        {/* Login prompt message */}
        {showLoginPrompt && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Login Required</span>
            </div>
            <p className="mb-3">You need to be logged in to create an ad. Please log in to continue.</p>
            <button
              onClick={handleRedirectToLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Go to Login
            </button>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_STEP", payload: 0 })}
            className="bg-[#1f2937] text-white font-bold rounded-[4px] px-4 py-4 sm:px-8 sm:py-6 hover:bg-black border border-gray-700 flex-1 text-base sm:text-lg min-w-[120px] sm:min-w-[140px] h-auto"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goToNextStep}
            className="bg-[#007bff] text-white font-bold rounded-[4px] px-4 py-4 sm:px-8 sm:py-6 hover:bg-blue-700 border border-blue-600 flex-1 text-base sm:text-lg min-w-[120px] sm:min-w-[140px] h-auto"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

interface ContactOptionProps {
  id: string
  value: string
  label: string
  checked: boolean
  onChange: () => void
}

function ContactOption({ id, value, label, checked, onChange }: ContactOptionProps) {
  return (
    <div
      className={`flex items-center border p-4 rounded-lg hover:border-primary cursor-pointer ${
        checked ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
      onClick={onChange}
    >
      <input
        type="radio"
        id={id}
        name="contactPreference"
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-3 w-5 h-5 accent-primary"
      />
      <Label htmlFor={id} className="text-gray-700 text-lg cursor-pointer">
        {label}
      </Label>
    </div>
  )
}

interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      className={`py-2 px-4 rounded-md border transition-colors ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

interface RatesTableProps {
  rates: Record<string, string>
  onChange: (key: string, value: string) => void
}

function RatesTable({ rates, onChange }: RatesTableProps) {
  const timeOptions = [
    { key: "0.5", label: "0.5 Hour" },
    { key: "1", label: "1 Hour" },
    { key: "2", label: "2 Hours" },
    { key: "3", label: "3 Hours" },
    { key: "6", label: "6 Hours" },
    { key: "12", label: "12 Hours" },
    { key: "24", label: "24 Hours" },
    { key: "48", label: "48 Hours" },
    { key: "overnight", label: "Overnight" },
  ]

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-3 bg-primary text-white font-semibold text-center py-3">
        <div>Time</div>
        <div>Rates</div>
        <div>Currency</div>
      </div>
      <div className="divide-y divide-gray-200">
        {timeOptions.map(({ key, label }) => (
          <div key={key} className="grid grid-cols-3 items-center py-3 hover:bg-gray-50">
            <div className="text-primary font-medium text-center">{label}</div>
            <div className="px-4">
              <Input
                type="number"
                value={rates[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder="Enter rate"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="text-center font-medium text-gray-600">USD</div>
          </div>
        ))}
      </div>
    </div>
  )
}
