"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Camera, Check, ChevronRight, ChevronLeft, X, Upload } from "lucide-react"

// Types
export type AdFormData = {
  adType: "standard" | "premium"
  firstName: string
  category: string
  age: string
  contactPreference: "email" | "phone" | "both"
  email: string
  phone: string
  whatsapp: boolean
  state: string
  city: string
  title: string
  description: string
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
  photos: string[]
  termsAccepted: boolean
}

// City data
const cityData: Record<string, string[]> = {
  CA: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Beverly Hills"],
  NY: ["New York City", "Buffalo", "Albany", "Rochester", "Syracuse"],
  TX: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"],
  FL: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
  IL: ["Chicago", "Springfield", "Aurora", "Naperville", "Rockford"],
}

export default function CreateAdForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<AdFormData>({
    adType: "standard",
    firstName: "",
    category: "escort",
    age: "",
    contactPreference: "email",
    email: "",
    phone: "",
    whatsapp: false,
    state: "",
    city: "",
    title: "",
    description: "",
    ethnicity: [],
    nationality: "",
    bodyType: [],
    breastType: [],
    hairColor: [],
    services: [],
    catersTo: [],
    placeOfService: [],
    incallRates: {},
    outcallRates: {},
    photos: [],
    termsAccepted: false,
  })

  const steps = [
    { title: "Ad Type", description: "Choose your ad type" },
    { title: "Information", description: "Add your details" },
    { title: "Photos", description: "Upload photos" },
    { title: "Finish", description: "Review and publish" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFilterToggle = (category: keyof AdFormData, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[category] as string[]
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      }
    })
  }

  const handleRateChange = (type: "incallRates" | "outcallRates", duration: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [duration]: value,
      },
    }))
  }

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return

    const newPhotos: string[] = []

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, e.target!.result as string].slice(0, 10), // Limit to 10 photos
          }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Ad Type
        return true
      case 1: // Information
        if (!formData.firstName || !formData.age || !formData.title || !formData.description) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive",
          })
          return false
        }
        if (Number.parseInt(formData.age) < 18) {
          toast({
            title: "Age restriction",
            description: "You must be 18 years or older",
            variant: "destructive",
          })
          return false
        }
        if (formData.contactPreference === "email" && !formData.email) {
          toast({
            title: "Missing email",
            description: "Please provide your email address",
            variant: "destructive",
          })
          return false
        }
        if (formData.contactPreference === "phone" && !formData.phone) {
          toast({
            title: "Missing phone",
            description: "Please provide your phone number",
            variant: "destructive",
          })
          return false
        }
        if (formData.contactPreference === "both" && (!formData.email || !formData.phone)) {
          toast({
            title: "Missing contact information",
            description: "Please provide both email and phone",
            variant: "destructive",
          })
          return false
        }
        return true
      case 2: // Photos
        if (formData.photos.length === 0) {
          toast({
            title: "No photos",
            description: "Please upload at least one photo",
            variant: "destructive",
          })
          return false
        }
        return true
      case 3: // Finish
        if (!formData.termsAccepted) {
          toast({
            title: "Terms not accepted",
            description: "Please accept the terms and conditions",
            variant: "destructive",
          })
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    try {
      // Show loading state
      toast({
        title: "Publishing your ad",
        description: "Please wait while we process your submission...",
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      toast({
        title: "Success!",
        description: "Your ad has been published successfully",
        variant: "default",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error publishing your ad. Please try again.",
        variant: "destructive",
      })
    }
  }

  const FilterButton = ({
    label,
    category,
    value,
  }: {
    label: string
    category: keyof Pick<
      AdFormData,
      "ethnicity" | "bodyType" | "breastType" | "hairColor" | "services" | "catersTo" | "placeOfService"
    >
    value: string
  }) => {
    const isActive = (formData[category] as string[]).includes(value)

    return (
      <Button
        type="button"
        variant={isActive ? "default" : "outline"}
        className={`h-auto py-2 px-4 text-sm font-normal justify-start ${isActive ? "bg-primary text-primary-foreground" : ""}`}
        onClick={() => handleFilterToggle(category, value)}
      >
        {label}
      </Button>
    )
  }

  const AdTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Types of Ads</h1>
        <p className="text-muted-foreground">Choose the type of ad you want to create</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Standard Ad Option */}
        <Card
          className={`cursor-pointer transition-all ${formData.adType === "standard" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setFormData((prev) => ({ ...prev, adType: "standard" }))}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">Standard Ad</h3>
                <p className="text-muted-foreground mb-4">Basic visibility with essential features</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border ${formData.adType === "standard" ? "bg-primary border-primary" : "border-gray-300"} flex items-center justify-center`}
              >
                {formData.adType === "standard" && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>

            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Up to 5 photos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Standard listing placement</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Basic ad statistics</span>
              </li>
            </ul>

            <div className="mt-6 text-center">
              <span className="text-xl font-bold">Free</span>
            </div>
          </CardContent>
        </Card>

        {/* Premium Ad Option */}
        <Card
          className={`cursor-pointer transition-all ${formData.adType === "premium" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setFormData((prev) => ({ ...prev, adType: "premium" }))}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">Premium Ad</h3>
                <p className="text-muted-foreground mb-4">Maximum visibility with premium features</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border ${formData.adType === "premium" ? "bg-primary border-primary" : "border-gray-300"} flex items-center justify-center`}
              >
                {formData.adType === "premium" && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>

            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Up to 10 high-quality photos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Featured placement in search results</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Highlighted listing with "Top" badge</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Priority approval process</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Advanced analytics and statistics</span>
              </li>
            </ul>

            <div className="mt-6 text-center">
              <span className="text-xl font-bold">$49.99 / month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Preview */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">How your ad will look after posting</h3>

          <div className="border rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-200 relative">
                {formData.photos.length > 0 ? (
                  <img
                    src={formData.photos[0] || "/placeholder.svg"}
                    alt="Ad preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  <span>{formData.photos.length}</span>
                </div>
              </div>

              <div className="p-4 flex-1 relative">
                <h4 className="text-primary font-bold text-lg mb-2">{formData.title || "Your Ad Title"}</h4>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {formData.description || "Your description will appear here."}
                </p>

                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span className="mr-4">{formData.age ? `${formData.age} years` : "Age"}</span>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <span>{formData.city && formData.state ? `${formData.city}, ${formData.state}` : "Location"}</span>
                  {formData.adType === "premium" && (
                    <span className="ml-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">Top</span>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded font-semibold">
                  $150
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.adType === "premium" && (
        <Card className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">🌟 Premium Advertising Benefits</h3>
              <p className="text-gray-600">Stand Out & Get Noticed</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
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
                      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Maximum Visibility</h4>
                    <p className="text-sm text-gray-600">Your ad appears in a larger format across key pages.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
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
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Scrolling Images</h4>
                    <p className="text-sm text-gray-600">Display your images in an exclusive auto-scrolling format.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Massive Traffic Reach</h4>
                    <p className="text-sm text-gray-600">Benefit from our high daily traffic and engaged user base.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Direct Contact Links</h4>
                    <p className="text-sm text-gray-600">
                      Easy access to call, WhatsApp, or email right from your profile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
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
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <path d="M13 2v7h7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Multiple Listings</h4>
                    <p className="text-sm text-gray-600">Post as many listings as you like without restrictions.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-primary">
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
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Instant Ad Approval</h4>
                    <p className="text-sm text-gray-600">Skip the waiting time with priority moderation.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center mt-8">
        <Button onClick={nextStep} size="lg">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const InformationForm = () => (
    <div className="space-y-6">
      <div className="bg-primary text-primary-foreground p-6 -mx-6 mb-8 text-center">
        <h2 className="text-2xl font-semibold">Publish post in just a few steps!</h2>
      </div>

      <div className="space-y-4">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input value="Escort" disabled className="bg-muted cursor-not-allowed" />
          </div>

          <div>
            <Label htmlFor="age">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="18"
              max="99"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <Label>
            How would you like to be connected? <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.contactPreference}
            onValueChange={(value) => handleSelectChange("contactPreference", value as "email" | "phone" | "both")}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="email" id="email-only" />
              <Label htmlFor="email-only" className="cursor-pointer">
                Only Email
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="phone" id="phone-only" />
              <Label htmlFor="phone-only" className="cursor-pointer">
                Only Phone
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both" className="cursor-pointer">
                Email & Phone
              </Label>
            </div>
          </RadioGroup>

          {(formData.contactPreference === "email" || formData.contactPreference === "both") && (
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          {(formData.contactPreference === "phone" || formData.contactPreference === "both") && (
            <div>
              <Label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="whatsapp"
              checked={formData.whatsapp}
              onCheckedChange={(checked) => handleCheckboxChange("whatsapp", checked as boolean)}
            />
            <Label htmlFor="whatsapp" className="cursor-pointer">
              Available on WhatsApp
            </Label>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <Label>
            Location <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                value={formData.state}
                onValueChange={(value) => {
                  handleSelectChange("state", value)
                  handleSelectChange("city", "")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AL">Alabama</SelectItem>
                  <SelectItem value="AK">Alaska</SelectItem>
                  <SelectItem value="AZ">Arizona</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="CO">Colorado</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="GA">Georgia</SelectItem>
                  <SelectItem value="HI">Hawaii</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={formData.city}
                onValueChange={(value) => handleSelectChange("city", value)}
                disabled={!formData.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {formData.state &&
                    cityData[formData.state]?.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your ad title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell potential clients about yourself and your services..."
              rows={5}
              required
            />
          </div>
        </div>
      </div>

      {/* Physical Attributes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Physical Attributes</h3>

        <div>
          <Label>Ethnicity</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Asian" category="ethnicity" value="asian" />
            <FilterButton label="Black" category="ethnicity" value="black" />
            <FilterButton label="Caucasian" category="ethnicity" value="caucasian" />
            <FilterButton label="Hispanic" category="ethnicity" value="hispanic" />
            <FilterButton label="Indian" category="ethnicity" value="indian" />
            <FilterButton label="Middle Eastern" category="ethnicity" value="middle-eastern" />
            <FilterButton label="Mixed" category="ethnicity" value="mixed" />
          </div>
        </div>

        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            placeholder="Enter your nationality"
          />
        </div>

        <div>
          <Label>Body Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Athletic" category="bodyType" value="athletic" />
            <FilterButton label="Average" category="bodyType" value="average" />
            <FilterButton label="BBW" category="bodyType" value="bbw" />
            <FilterButton label="Curvy" category="bodyType" value="curvy" />
            <FilterButton label="Petite" category="bodyType" value="petite" />
            <FilterButton label="Slim" category="bodyType" value="slim" />
          </div>
        </div>

        <div>
          <Label>Breast Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Natural" category="breastType" value="natural" />
            <FilterButton label="Enhanced" category="breastType" value="enhanced" />
          </div>
        </div>

        <div>
          <Label>Hair Color</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Black" category="hairColor" value="black" />
            <FilterButton label="Blonde" category="hairColor" value="blonde" />
            <FilterButton label="Brunette" category="hairColor" value="brunette" />
            <FilterButton label="Red" category="hairColor" value="red" />
            <FilterButton label="Other" category="hairColor" value="other" />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Services</h3>

        <div>
          <Label>Services Offered</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Massage" category="services" value="massage" />
            <FilterButton label="GFE" category="services" value="gfe" />
            <FilterButton label="Dinner Date" category="services" value="dinner-date" />
            <FilterButton label="Travel Companion" category="services" value="travel-companion" />
            <FilterButton label="Overnight" category="services" value="overnight" />
            <FilterButton label="Couples" category="services" value="couples" />
          </div>
        </div>

        <div>
          <Label>Caters To</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Men" category="catersTo" value="men" />
            <FilterButton label="Women" category="catersTo" value="women" />
            <FilterButton label="Couples" category="catersTo" value="couples" />
          </div>
        </div>

        <div>
          <Label>Place of Service</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <FilterButton label="Incall" category="placeOfService" value="incall" />
            <FilterButton label="Outcall" category="placeOfService" value="outcall" />
          </div>
        </div>
      </div>

      {/* Rates */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rates</h3>

        {formData.placeOfService.includes("incall") && (
          <div>
            <Label>Incall Rates</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="incall-1hr">1 Hour</Label>
                <Input
                  id="incall-1hr"
                  value={formData.incallRates["1hr"] || ""}
                  onChange={(e) => handleRateChange("incallRates", "1hr", e.target.value)}
                  placeholder="e.g. $200"
                />
              </div>
              <div>
                <Label htmlFor="incall-2hr">2 Hours</Label>
                <Input
                  id="incall-2hr"
                  value={formData.incallRates["2hr"] || ""}
                  onChange={(e) => handleRateChange("incallRates", "2hr", e.target.value)}
                  placeholder="e.g. $350"
                />
              </div>
              <div>
                <Label htmlFor="incall-overnight">Overnight</Label>
                <Input
                  id="incall-overnight"
                  value={formData.incallRates["overnight"] || ""}
                  onChange={(e) => handleRateChange("incallRates", "overnight", e.target.value)}
                  placeholder="e.g. $1000"
                />
              </div>
            </div>
          </div>
        )}

        {formData.placeOfService.includes("outcall") && (
          <div>
            <Label>Outcall Rates</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="outcall-1hr">1 Hour</Label>
                <Input
                  id="outcall-1hr"
                  value={formData.outcallRates["1hr"] || ""}
                  onChange={(e) => handleRateChange("outcallRates", "1hr", e.target.value)}
                  placeholder="e.g. $250"
                />
              </div>
              <div>
                <Label htmlFor="outcall-2hr">2 Hours</Label>
                <Input
                  id="outcall-2hr"
                  value={formData.outcallRates["2hr"] || ""}
                  onChange={(e) => handleRateChange("outcallRates", "2hr", e.target.value)}
                  placeholder="e.g. $400"
                />
              </div>
              <div>
                <Label htmlFor="outcall-overnight">Overnight</Label>
                <Input
                  id="outcall-overnight"
                  value={formData.outcallRates["overnight"] || ""}
                  onChange={(e) => handleRateChange("outcallRates", "overnight", e.target.value)}
                  placeholder="e.g. $1200"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const PhotosForm = () => (
    <div className="space-y-6">
      <div className="bg-primary text-primary-foreground p-6 -mx-6 mb-8 text-center">
        <h2 className="text-2xl font-semibold">Upload Your Photos</h2>
        <p className="mt-2">Add up to {formData.adType === "premium" ? "10" : "5"} photos</p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePhotoUpload(e.target.files)}
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-base font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF (Max. {formData.adType === "premium" ? "10" : "5"} photos)
                </p>
              </div>
            </div>
          </label>
        </div>

        {formData.photos.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Uploaded Photos ({formData.photos.length}/{formData.adType === "premium" ? "10" : "5"})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Uploaded photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2">Photo Guidelines</h4>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
            <li>Photos must be clear and of good quality</li>
            <li>No explicit nudity or sexual content</li>
            <li>No watermarks or text overlays</li>
            <li>No photos of minors</li>
            <li>You must have permission to use all photos</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const ReviewForm = () => (
    <div className="space-y-6">
      <div className="bg-primary text-primary-foreground p-6 -mx-6 mb-8 text-center">
        <h2 className="text-2xl font-semibold">Review Your Ad</h2>
        <p className="mt-2">Please review your information before publishing</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ad Type</h3>
              <p>{formData.adType === "premium" ? "Premium Ad" : "Standard Ad"}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {formData.firstName}
                  </div>
                  <div>
                    <span className="font-medium">Age:</span> {formData.age}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {formData.city}, {formData.state}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  {formData.email && (
                    <div>
                      <span className="font-medium">Email:</span> {formData.email}
                    </div>
                  )}
                  {formData.phone && (
                    <div>
                      <span className="font-medium">Phone:</span> {formData.phone}
                    </div>
                  )}
                  {formData.whatsapp && (
                    <div>
                      <span className="font-medium">WhatsApp:</span> Available
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Ad Content</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Title:</span> {formData.title}
                </div>
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="mt-1 text-gray-600">{formData.description}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-md overflow-hidden">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I confirm that I am at least 18 years old and agree to the{" "}
                <a href="#" className="text-primary underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary underline">
                  Privacy Policy
                </a>
                .
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit} disabled={!formData.termsAccepted}>
          Publish Ad
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Steps Progress */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col items-center ${index > 0 ? "flex-1" : ""} relative`}>
              {index > 0 && (
                <div className="absolute top-4 -left-1/2 w-full h-1 bg-gray-200" style={{ zIndex: 0 }}>
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: currentStep >= index ? "100%" : "0%" }}
                  />
                </div>
              )}

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  currentStep >= index ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > index ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
              </div>

              <div className="mt-2 text-center hidden md:block">
                <p className={`text-sm font-medium ${currentStep >= index ? "text-primary" : "text-gray-500"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 0 && <AdTypeSelection />}
          {currentStep === 1 && <InformationForm />}
          {currentStep === 2 && <PhotosForm />}
          {currentStep === 3 && <ReviewForm />}
        </CardContent>
      </Card>
    </div>
  )
}
