import type React from "react"
import { cn } from "@/lib/utils"

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean
  children: React.ReactNode
}

export function FilterButton({ isSelected, children, className, ...props }: FilterButtonProps) {
  return (
    <button
      className={cn(
        "px-3 py-2 text-sm rounded-md border transition-colors h-10",
        isSelected
          ? "bg-primary text-white border-primary"
          : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
