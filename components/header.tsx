"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Twitter, Instagram, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { user, signOut } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // When opening the menu, add a class to prevent scrolling
    if (!isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out successfully");
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      
      // Close sidebar when clicking outside (but not on the menu button)
      if (
        isMenuOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[data-menu-toggle]')
      ) {
        setIsMenuOpen(false);
        document.body.classList.remove('overflow-hidden');
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up the body class when component unmounts
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

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
          
          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 focus:outline-none"
              data-menu-toggle
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Desktop Menu (visible on larger screens) */}
          <div className="hidden md:flex items-center pr-4">
            <Link
              href="/create-ad"
              className="bg-[#0066ff] text-white font-medium rounded-[4px] px-8 py-4 mr-6 hover:bg-blue-700 border border-blue-600"
            >
              Create Ad
            </Link>
            
            {user ? (
              <div className="flex items-center relative" ref={dropdownRef}>
                <div className="flex items-center">
                  {/* Filled Profile Icon */}
                  <div className="flex items-center justify-center bg-black rounded-full p-2 mr-3">
                    <svg 
                      className="h-5 w-5 text-white" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  
                  {/* Profile Picture and Name with Border */}
                  <div 
                    className="flex items-center cursor-pointer border border-gray-200 rounded-md px-3 py-2"
                    onClick={toggleProfileDropdown}
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mr-3">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || "User"} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">{user.displayName || user.email?.split('@')[0] || "User"}</span>
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                </div>
                
                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                    <Link 
                      href="/dashboard?tab=overview" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
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
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-500" />
                      Profile Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
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
        </div>
      </div>
      
      {/* Mobile Menu Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-60px)] p-4">
          <Link
            href="/create-ad"
            className="block bg-[#0066ff] text-white font-medium rounded-[4px] px-4 py-3 text-center hover:bg-blue-700 mb-4"
            onClick={toggleMenu}
          >
            Create Ad
          </Link>
          
          {user ? (
            <>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mr-3">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.displayName || user.email?.split('@')[0] || "User"}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                
                <Link 
                  href="/dashboard?tab=overview" 
                  className="flex items-center py-3 hover:bg-gray-50 px-2 rounded"
                  onClick={toggleMenu}
                >
                  <svg
                    className="h-5 w-5 text-[#0066ff] mr-3"
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
                  Dashboard
                </Link>
                
                <Link 
                  href="/profile" 
                  className="flex items-center py-3 hover:bg-gray-50 px-2 rounded"
                  onClick={toggleMenu}
                >
                  <Settings className="h-5 w-5 text-[#0066ff] mr-3" />
                  Profile Settings
                </Link>
                
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center w-full py-3 hover:bg-gray-50 px-2 rounded text-red-500"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
              <Link 
                href="/login" 
                className="block bg-[#1f2937] text-white font-medium rounded-[4px] px-4 py-3 text-center hover:bg-black"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="block bg-[#1f2937] text-white font-medium rounded-[4px] px-4 py-3 text-center hover:bg-black"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="text-center font-medium text-gray-700 mb-2">FOLLOW US</p>
            <div className="flex justify-center mt-1">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  )
}
