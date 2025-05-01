"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Twitter, Instagram, User } from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out successfully");
      toggleMenu();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <header className="bg-white w-full border-b">
      <div className="w-full px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="pl-4">
            <Link href="/" className="flex flex-col items-start">
              <Image 
                src="/assets/skluva_logo.png" 
                alt="Razunga Logo" 
                width={140} 
                height={50} 
                className="h-auto"
                priority
              />
              <span className="text-sm font-bold text-gray-700 mt-1">United States</span>
            </Link>
          </div>
          
          {/* Desktop Menu (visible on larger screens) */}
          <div className="hidden md:flex items-center pr-4">
            <Link
              href="/create-ad"
              className="bg-[#007bff] text-white font-medium rounded-[4px] px-8 py-4 mr-6 hover:bg-blue-700 border border-blue-600"
            >
              Create Ad
            </Link>
            
            {user ? (
              <div className="flex items-center">
                <Link 
                  href="/dashboard?tab=overview" 
                  className="flex items-center gap-2 hover:text-primary font-semibold mr-6"
                >
                  <div className="bg-gray-100 p-2 rounded-full">
                    <svg
                      className="h-5 w-5 text-primary"
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
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 hover:text-primary font-semibold"
                >
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="ml-6 text-red-500 hover:text-red-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href="/login" className="bg-[#1f2937] text-white font-medium rounded-[4px] px-8 py-4 mr-6 hover:bg-black border border-gray-700">
                  Login
                </Link>
                <Link href="/signup" className="bg-[#1f2937] text-white font-medium rounded-[4px] px-8 py-4 hover:bg-black border border-gray-700">
                  Sign Up
                </Link>
              </div>
            )}
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
                  className="block w-full bg-[#007bff] text-white font-medium rounded-[4px] px-4 py-5 mb-6 text-center hover:bg-blue-700 border border-blue-600"
                >
                  Create Ad
                </a>

                {user ? (
                  /* User Profile Section - Show when logged in */
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
                        <p className="font-bold text-xl">{user.email ? user.email.split('@')[0] : 'User'}</p>
                        {/* Safely check for customerId in user metadata */}
                        {user && (user as any).customerId && (
                          <p className="text-sm text-gray-500">ID: {(user as any).customerId}</p>
                        )}
                      </div>
                    </div>

                    {/* User Menu Options */}
                    <Link href="/dashboard?tab=overview" className="flex items-center p-3 mb-3 rounded hover:bg-gray-200 transition">
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
                    <Link href="/dashboard?tab=posts" className="flex items-center p-3 mb-3 rounded hover:bg-gray-200 transition">
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
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <span className="text-lg">My Posts</span>
                    </Link>
                    <Link href="/profile" className="flex items-center p-3 mb-3 rounded hover:bg-gray-200 transition">
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
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center p-3 rounded hover:bg-gray-200 transition"
                    >
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
                    </button>
                  </div>
                ) : (
                  /* Login/Signup Section - Show when not logged in */
                  <div className="mb-6">
                    <Link
                      href="/login"
                      className="block w-full bg-[#1f2937] text-white font-medium rounded-[4px] px-4 py-5 mb-3 text-center hover:bg-black border border-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full bg-[#1f2937] text-white font-medium rounded-[4px] px-4 py-5 text-center hover:bg-black border border-gray-700"
                    >
                      Signup
                    </Link>
                  </div>
                )}

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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
