"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { signUp } from "@/lib/firebase"
import { toast } from "sonner"

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperLower: false,
    hasNumber: false,
    hasSpecial: false,
    hasMinLength: false
  })
  
  const router = useRouter()

  // Validate password as user types
  useEffect(() => {
    setPasswordValidation({
      hasUpperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      hasNumber: /(?=.*\d)/.test(password),
      hasSpecial: /(?=.*[!@#$%^&*])/.test(password),
      hasMinLength: password.length >= 8
    })
  }, [password])

  const processSignup = async () => {
    console.log("Processing signup")
    
    // Validate inputs
    if (password !== confirmPassword) {
      console.log("Passwords don't match")
      toast.error("Passwords don't match")
      return
    }
    
    if (!termsAccepted) {
      console.log("Terms not accepted")
      toast.error("You must accept the terms and conditions")
      return
    }
    
    // Check password strength
    const isPasswordValid = Object.values(passwordValidation).every(Boolean)
    if (!isPasswordValid) {
      console.log("Password doesn't meet requirements", passwordValidation)
      toast.error("Password doesn't meet the requirements")
      return
    }
    
    setIsLoading(true)
    console.log("Attempting to create account with email:", email)

    try {
      const result = await signUp(email, password)
      console.log("Signup result:", result)
      
      if (result.success) {
        // Store the customer ID
        if (result.customerId) {
          setCustomerId(result.customerId)
          // Store in localStorage for future reference
          localStorage.setItem("lastCustomerId", result.customerId)
        }
        
        toast.success(`Account created successfully! Your Customer ID is: ${result.customerId}`)
        // Show success message with customer ID
        toast.success("Please verify your email to continue.")
        
        // Redirect to verification page after a short delay to allow user to see the customer ID
        setTimeout(() => {
          router.push("/verify-email")
        }, 5000)
      } else {
        console.error("Signup error:", result.error)
        toast.error(result.error || "Failed to create account")
      }
    } catch (error) {
      console.error("Unexpected error during signup:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup form submitted")
    await processSignup()
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    console.log("Signup button clicked directly")
    // The form's onSubmit should handle the submission
    // This is just an additional handler for debugging
  }

  // Debug logging
  useEffect(() => {
    console.log("SignupForm component loaded")
  }, [])

  return (
    <div className="max-w-md mx-auto px-6 py-8 md:py-12 min-h-[calc(100vh-340px)] flex flex-col justify-center bg-white">
      <h1 className="text-2xl font-bold text-center mb-8 text-black">Sign up</h1>

      <form className="space-y-6" onSubmit={handleSignup}>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-base font-bold mb-2 text-black">
            Email
          </label>
          <Input 
            type="email" 
            id="email" 
            placeholder="Enter email" 
            className="w-full p-4 text-base rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-base font-bold mb-2 text-black">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              className="w-full p-4 text-base rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
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
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
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
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-base font-bold mb-2 text-black">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full p-4 text-base rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
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
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <h3 className="text-base font-bold mb-2 text-black">Password must include:</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${passwordValidation.hasUpperLower ? 'text-green-500' : 'text-gray-300'} mr-3`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sm font-bold text-black">Upper & lowercase letters</span>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-300'} mr-3`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sm font-bold text-black">A number</span>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${passwordValidation.hasSpecial ? 'text-green-500' : 'text-gray-300'} mr-3`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sm font-bold text-black">A special character</span>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-gray-300'} mr-3`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sm font-bold text-black">Minimum 8 characters</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <Checkbox 
            id="terms" 
            className="mt-1 w-5 h-5 mr-3 rounded border-gray-300"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            required
          />
          <label htmlFor="terms" className="text-sm font-bold text-black">
            I acknowledge and agree that I have read and understand the <Link href="/terms" className="text-[#007bff]">terms and conditions</Link> of use and the <Link href="/privacy-policy" className="text-[#007bff]">privacy policy</Link>. By this action, I authorize the processing of my personal information to provide this web service.
          </label>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="w-full bg-[#007bff] text-white font-medium rounded-[4px] px-12 py-4 hover:bg-blue-700 border border-blue-600"
          disabled={isLoading}
          onClick={handleButtonClick}
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-base font-bold text-black">
          Already have an account? <Link href="/login" className="text-[#007bff]">Log in</Link>
        </p>
      </div>
    </div>
  )
}
