"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Twitter, Instagram } from "lucide-react"
// Add the search form component import
import SearchForm from "@/components/search/search-form"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/skluva_logo.png" 
              alt="Skluva Logo" 
              width={120} 
              height={40} 
              className="h-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" id="menuContainer">
            {/* Desktop Menu (visible on larger screens) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/create-ad"
                className="bg-primary text-white text-center px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
              >
                Create AD
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-primary font-semibold">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-primary font-semibold">
                Signup
              </Link>
            </div>

            {/* Mobile Menu Toggle (visible on mobile) */}
            <button onClick={toggleMenu} className="md:hidden text-black" aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>

            {/* Full-screen Menu (for mobile) */}
            {isMenuOpen && (
              <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:hidden">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700" aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="container mx-auto px-6 py-4">
                  {/* Post Your Ad Button */}
                  <a
                    href="/create-ad"
                    className="block w-full bg-primary text-white text-center font-bold py-4 px-4 mb-6 rounded-md hover:bg-primary/90 transition text-lg"
                  >
                    Create AD
                  </a>

                  {/* User Profile Section */}
                  <div className="bg-gray-100 p-6 mb-6 rounded-md">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <img
                          src="/diverse-professional-profiles.png"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-xl">Jr</p>
                      </div>
                    </div>

                    {/* User Menu Options */}
                    <Link href="#" className="flex items-center p-3 mb-3 rounded hover:bg-gray-200 transition">
                      <div className="text-primary mr-3 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="7" height="7" x="3" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="14" rx="1" />
                          <rect width="7" height="7" x="3" y="14" rx="1" />
                        </svg>
                      </div>
                      <span className="text-lg">Dashboard</span>
                    </Link>
                    <Link href="#" className="flex items-center p-3 mb-3 rounded hover:bg-gray-200 transition">
                      <div className="text-primary mr-3 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 7.5v3a1.5 1.5 0 0 1-1.5 1.5H16" />
                          <path d="M12 2v8" />
                          <path d="M7.5 7H5a1.5 1.5 0 0 0-1.5 1.5v3" />
                          <path d="M16 16.5V18a1.5 1.5 0 0 1-1.5 1.5H12" />
                          <path d="M12 22v-8" />
                          <path d="M7.5 17H5A1.5 1.5 0 0 1 3.5 15.5V14" />
                          <circle cx="12" cy="12" r="1" />
                        </svg>
                      </div>
                      <span className="text-lg">Profile Setting</span>
                    </Link>
                    <Link href="#" className="flex items-center p-3 rounded hover:bg-gray-200 transition">
                      <div className="text-primary mr-3 text-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                      </div>
                      <span className="text-lg">Logout</span>
                    </Link>
                  </div>

                  {/* Login/Signup Section */}
                  <div className="mb-6">
                    <Link
                      href="/login"
                      className="block w-full bg-gray-200 text-center font-semibold py-3 px-4 mb-3 rounded-md hover:bg-gray-300 transition text-lg"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full bg-gray-200 text-center font-semibold py-3 px-4 rounded-md hover:bg-gray-300 transition text-lg"
                    >
                      Signup
                    </Link>
                  </div>

                  {/* Social Media Section */}
                  <div className="pb-8">
                    <p className="font-bold mb-3 text-xl">Follow Us</p>
                    <div className="flex flex-col space-y-3">
                      <Link href="#" className="flex items-center hover:text-primary p-2">
                        <Twitter className="mr-3 h-5 w-5" />
                        <span className="text-lg">Twitter</span>
                      </Link>
                      <Link href="#" className="flex items-center hover:text-primary p-2">
                        <Instagram className="mr-3 h-5 w-5" />
                        <span className="text-lg">Instagram</span>
                      </Link>
                      <Link href="#" className="flex items-center hover:text-primary p-2">
                        <div className="mr-3 h-5 w-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                            <path d="M7 2H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                            <path d="M17 12h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z" />
                            <path d="M7 12H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z" />
                          </svg>
                        </div>
                        <span className="text-lg">Tumblr</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Replace the search input with the SearchForm component */}
      <SearchForm />
    </header>
  )
}
