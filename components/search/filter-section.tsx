"use client"

import React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function FilterSection({ title, children, defaultOpen = true, className }: FilterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("border-b border-gray-100 py-4", className)}>
      <button
        className="flex justify-between items-center w-full mb-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-left">{title}</h3>
        <ChevronDown
          className={cn("h-4 w-4 text-primary transition-transform", isOpen ? "rotate-180" : "")}
          aria-hidden="true"
        />
      </button>
      <div className={cn("transition-all duration-200", isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden")}>
        {isOpen && children}
      </div>
    </div>
  )
}
