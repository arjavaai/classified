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

// City data for dropdown
const cityData: Record<string, string[]> = {
  CA: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Beverly Hills"],
  NY: ["New York City", "Buffalo", "Albany", "Rochester", "Syracuse"],
  TX: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"],
  FL: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
  IL: ["Chicago", "Springfield", "Aurora", "Naperville", "Rockford"],
}

// Define the AdFormData type
interface AdFormData {
  name: string
  age: string
  title: string
  description: string
  state: string
  city: string
  category: string
  contactPreference: "email" | "phone" | "both"
  email: string
  phone: string
  whatsapp: boolean
  ethnicity: string[]
  nationality: string
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
  const [cities, setCities] = useState<string[]>([])
  const [states, setStates] = useState<{name: string; abbreviation: string}[]>([])

  // Load states when component mounts
  useEffect(() => {
    setStates(getStates())
  }, [])

  // Update cities when state changes
  useEffect(() => {
    if (state.state) {
      const citiesData = getCitiesByStateCode(state.state)
      setCities(citiesData.map(city => city.name))
    } else {
      setCities([])
    }
  }, [state.state])

  const handleChange = (field: keyof AdFormData, value: string | boolean | string[]) => {
    dispatch({
      type: "UPDATE_FORM",
      payload: { [field]: value }
    })
  }

  const handleStateChange = (value: string) => {
    handleChange("state", value)
    handleChange("city", "") // Reset city when state changes
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
      "ethnicity" | "bodyType" | "breastType" | "hairColor" | "services" | "catersTo" | "placeOfService"
    >,
    value: string,
  ) => {
    handleChange(field, value)
  }

  const goToNextStep = () => {
    // Basic validation
    if (!state.name || !state.age || !state.title || !state.description || !state.state || !state.city) {
      alert("Please fill in all required fields")
      return
    }

    if (Number.parseInt(state.age) < 18) {
      alert("You must be 18 years or older")
      return
    }

    dispatch({ type: "SET_STEP", payload: 2 })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

        {/* Category Field (Fixed) */}
        <div>
          <Label className="text-lg mb-2">Category</Label>
          <Input type="text" value={state.category} disabled className="p-4 text-base bg-gray-50 cursor-not-allowed" />
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

        {/* Contact Preference Field */}
        <div>
          <Label className="text-lg mb-2">
            How would you like to be connected? <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-3">
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

        {/* WhatsApp Option */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="whatsapp"
            checked={state.whatsapp}
            onCheckedChange={(checked) => handleChange("whatsapp", !!checked)}
          />
          <Label htmlFor="whatsapp">Available on WhatsApp</Label>
        </div>

        {/* Location Fields */}
        <div>
          <Label className="text-lg mb-2">
            Location <span className="text-red-500">*</span>
          </Label>
          {/* State Dropdown */}
          <div className="mb-3">
            <Select value={state.state} onValueChange={handleStateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* City Dropdown */}
          <div>
            <Select value={state.city} onValueChange={handleCityChange} disabled={!state.state}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
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

        {/* Ethnicity Field */}
        <div>
          <Label className="text-lg mb-2">Ethnicity</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <FilterChip
              label="African"
              active={state.ethnicity.includes("African")}
              onClick={() => toggleSelection("ethnicity", "African")}
            />
            <FilterChip
              label="Arab"
              active={state.ethnicity.includes("Arab")}
              onClick={() => toggleSelection("ethnicity", "Arab")}
            />
            <FilterChip
              label="Asian"
              active={state.ethnicity.includes("Asian")}
              onClick={() => toggleSelection("ethnicity", "Asian")}
            />
            <FilterChip
              label="Caucasian"
              active={state.ethnicity.includes("Caucasian")}
              onClick={() => toggleSelection("ethnicity", "Caucasian")}
            />
            <FilterChip
              label="Indian"
              active={state.ethnicity.includes("Indian")}
              onClick={() => toggleSelection("ethnicity", "Indian")}
            />
            <FilterChip
              label="Latin"
              active={state.ethnicity.includes("Latin")}
              onClick={() => toggleSelection("ethnicity", "Latin")}
            />
          </div>
        </div>

        {/* Nationality Field */}
        <div>
          <Label className="text-lg mb-2">Nationality</Label>
          <Select
            value={state.nationality}
            onValueChange={(value) => handleChange("nationality", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Your Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="albanian">Albanian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="argentinian">Argentinian</SelectItem>
              <SelectItem value="australian">Australian</SelectItem>
              <SelectItem value="brazilian">Brazilian</SelectItem>
              <SelectItem value="canadian">Canadian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="colombian">Colombian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Body Type Field */}
        <div>
          <Label className="text-lg mb-2">Body Type</Label>
          <div className="grid grid-cols-2 gap-3">
            <FilterChip
              label="Curvy"
              active={state.bodyType.includes("Curvy")}
              onClick={() => toggleSelection("bodyType", "Curvy")}
            />
            <FilterChip
              label="Slim"
              active={state.bodyType.includes("Slim")}
              onClick={() => toggleSelection("bodyType", "Slim")}
            />
          </div>
        </div>

        {/* Breast Type Field */}
        <div>
          <Label className="text-lg mb-2">Breast</Label>
          <div className="grid grid-cols-2 gap-3">
            <FilterChip
              label="Busty"
              active={state.breastType.includes("Busty")}
              onClick={() => toggleSelection("breastType", "Busty")}
            />
            <FilterChip
              label="Natural Boobs"
              active={state.breastType.includes("Natural Boobs")}
              onClick={() => toggleSelection("breastType", "Natural Boobs")}
            />
          </div>
        </div>

        {/* Hair Color Field */}
        <div>
          <Label className="text-lg mb-2">Hair</Label>
          <div className="grid grid-cols-2 gap-3">
            <FilterChip
              label="Black Hair"
              active={state.hairColor.includes("Black Hair")}
              onClick={() => toggleSelection("hairColor", "Black Hair")}
            />
            <FilterChip
              label="Blond Hair"
              active={state.hairColor.includes("Blond Hair")}
              onClick={() => toggleSelection("hairColor", "Blond Hair")}
            />
            <FilterChip
              label="Brown Hair"
              active={state.hairColor.includes("Brown Hair")}
              onClick={() => toggleSelection("hairColor", "Brown Hair")}
            />
            <FilterChip
              label="Red Hair"
              active={state.hairColor.includes("Red Hair")}
              onClick={() => toggleSelection("hairColor", "Red Hair")}
            />
          </div>
        </div>

        {/* Services Field */}
        <div>
          <Label className="text-lg mb-2">Services</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Anal",
              "BDSM",
              "Body ejaculation",
              "Dinner dates",
              "Erotic massage",
              "Fetish",
              "French kiss",
              "Girlfriend experience",
              "Oral",
              "Porn actresses",
              "Role playing",
              "Sexting",
              "Tantric massage",
              "Threesome",
              "Travel companion",
              "Videocall",
            ].map((service) => (
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
          <Label className="text-lg mb-2">Caters to</Label>
          <div className="grid grid-cols-2 gap-3">
            {["Couples", "Disabled", "Men", "Women"].map((option) => (
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
          <Label className="text-lg mb-2">Place of services</Label>
          <div className="grid grid-cols-2 gap-3">
            {["At home", "Clubs", "Events and parties", "Hotels", "Incall", "Outcall"].map((place) => (
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
            Incall Rates <span className="text-red-500">*</span>
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
            Outcall Rates <span className="text-red-500">*</span>
          </Label>
          <RatesTable
            rates={state.outcallRates}
            onChange={(key, value) => {
              const updatedRates = { ...state.outcallRates, [key]: value }
              dispatch({ type: "UPDATE_FORM", payload: { outcallRates: updatedRates } })
            }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={goToNextStep}
            className="bg-primary text-white font-semibold py-6 px-6 rounded-lg hover:bg-primary/90 transition text-lg"
          >
            Next: Add Photos
          </Button>
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
            <div className="text-gray-600 text-center">$</div>
          </div>
        ))}
      </div>
    </div>
  )
}
