"use client"

import type React from "react"
import { createContext, useContext, useReducer } from "react"

// Define types for our state
export type AdFormData = {
  step: number
  adType: string | null
  name: string
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

type AdCreationAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_AD_TYPE"; payload: string }
  | { type: "UPDATE_FORM"; payload: Partial<AdFormData> }
  | { type: "ADD_PHOTO"; payload: string }
  | { type: "REMOVE_PHOTO"; payload: number }
  | {
      type: "TOGGLE_SELECTION"
      payload: {
        field: keyof Pick<
          AdFormData,
          "ethnicity" | "bodyType" | "breastType" | "hairColor" | "services" | "catersTo" | "placeOfService"
        >
        value: string
      }
    }
  | { type: "RESET_FORM" }

const initialState: AdFormData = {
  step: 0, // 0 = ad type selection, 1-3 = form steps
  adType: null,
  name: "",
  category: "Escort",
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
  incallRates: {
    "0.5": "",
    "1": "",
    "2": "",
    "3": "",
    "6": "",
    "12": "",
    "24": "",
    "48": "",
    additional24: "",
  },
  outcallRates: {
    "0.5": "",
    "1": "",
    "2": "",
    "3": "",
    "6": "",
    "12": "",
    "24": "",
    "48": "",
    additional24: "",
  },
  photos: [],
  termsAccepted: false,
}

function adCreationReducer(state: AdFormData, action: AdCreationAction): AdFormData {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload }
    case "SET_AD_TYPE":
      return { ...state, adType: action.payload }
    case "UPDATE_FORM":
      return { ...state, ...action.payload }
    case "ADD_PHOTO":
      if (state.photos.length >= 10) {
        return state
      }
      return { ...state, photos: [...state.photos, action.payload] }
    case "REMOVE_PHOTO":
      return {
        ...state,
        photos: state.photos.filter((_, index) => index !== action.payload),
      }
    case "TOGGLE_SELECTION":
      const { field, value } = action.payload
      const currentValues = state[field]
      if (Array.isArray(currentValues)) {
        return {
          ...state,
          [field]: currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value],
        }
      }
      return state
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

type AdCreationContextType = {
  state: AdFormData
  dispatch: React.Dispatch<AdCreationAction>
}

const AdCreationContext = createContext<AdCreationContextType | undefined>(undefined)

export function AdCreationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adCreationReducer, initialState)

  return <AdCreationContext.Provider value={{ state, dispatch }}>{children}</AdCreationContext.Provider>
}

export function useAdCreation() {
  const context = useContext(AdCreationContext)
  if (context === undefined) {
    throw new Error("useAdCreation must be used within an AdCreationProvider")
  }
  return context
}
