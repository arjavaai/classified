"use client"

import { notFound } from "next/navigation"

export default function CityNotFoundPage() {
  // This will trigger Next.js built-in 404 page
  notFound()
  
  // This part will never be rendered
  return null
}
