import { notFound } from "next/navigation"

export default function CatchAllNotFoundPage() {
  // This will trigger Next.js built-in 404 page
  notFound()
  
  // This part will never be rendered
  return null
}
