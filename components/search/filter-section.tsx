"use client"

import React from "react"
import { ChevronDown, Globe, Users, Droplet, Scissors, User, BookOpen, Heart, MapPin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  selectedCount?: number;
  icon?: React.ReactNode;
}

export function FilterSection({ 
  title, 
  children, 
  defaultOpen = false, 
  className,
  selectedCount = 0,
  icon
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  // Function to get icon based on title
  const getIconByTitle = () => {
    if (icon) return icon;
    
    switch (title) {
      case "Ethnicity":
        return <Globe className="w-5 h-5 mr-2" />;
      case "Nationality":
        return <Users className="w-5 h-5 mr-2" />;
      case "Breast Type":
        return <Droplet className="w-5 h-5 mr-2" />;
      case "Hair Color":
        return <Scissors className="w-5 h-5 mr-2" />;
      case "Body Type":
        return <User className="w-5 h-5 mr-2" />;
      case "Services":
        return <BookOpen className="w-5 h-5 mr-2" />;
      case "Caters To":
        return <Heart className="w-5 h-5 mr-2" />;
      case "Place of Service":
        return <MapPin className="w-5 h-5 mr-2" />;
      case "Age Range":
        return <Clock className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("border-b border-gray-100 py-1", className)}>
      <button
        className="flex justify-between items-center w-full h-10"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {getIconByTitle()}
          <h3 className="font-bold text-left">{title}</h3>
          {selectedCount > 0 && (
            <span className="ml-2 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn("h-5 w-5 text-primary transition-transform font-bold", isOpen ? "rotate-180" : "")}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </button>
      <div className={cn("transition-all duration-200", isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden")}>
        {isOpen && children}
      </div>
    </div>
  )
}
