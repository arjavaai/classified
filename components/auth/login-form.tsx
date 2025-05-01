"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn, auth } from "@/lib/firebase"
import { toast } from "sonner"
import { useAuth } from "@/lib/context/auth-context"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const verificationStatus = searchParams.get('email_verified')
  const { refreshUser } = useAuth()

  useEffect(() => {
    // Show success message if user was redirected from email verification
    if (verificationStatus === 'success') {
      toast.success("Email verified successfully! You can now log in.")
    }
  }, [verificationStatus])

  // Check for remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail")
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn(email, password)
      
      if (result.success) {
        // Store in localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email)
        } else {
          localStorage.removeItem("rememberedEmail")
        }
        
        // Force refresh user to get the latest email verification status
        if (auth.currentUser) {
          try {
            // Reload user to get fresh data from Firebase
            await refreshUser();
            console.log("User data refreshed, email verified status:", auth.currentUser.emailVerified);
            
            if (auth.currentUser.emailVerified) {
              toast.success("Logged in successfully as verified user")
              // Redirect to profile page since user is verified
              router.push("/profile")
            } else {
              toast.success("Logged in successfully, but email is not verified")
              // Redirect to verification page since email is not verified
              router.push("/verify-email")
            }
          } catch (reloadError) {
            console.error("Error reloading user data:", reloadError);
            toast.success("Logged in successfully")
            router.push("/profile") // Default fallback in case of reload error
          }
        } else {
          toast.success("Logged in successfully")
          router.push("/profile")
        }
      } else {
        toast.error(result.error || "Invalid email or password")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-8 md:py-12 min-h-[calc(100vh-340px)] flex flex-col justify-center bg-white">
      <h1 className="text-2xl font-bold text-center mb-8 text-black">Log in</h1>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-base font-bold mb-2 text-black">
            Email
          </label>
          <Input 
            type="email" 
            id="email" 
            placeholder="Enter Email" 
            className="w-full p-4 text-base rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-base font-bold mb-2 text-black">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
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

        {/* Remember Me */}
        <div className="flex items-center">
          <Checkbox 
            id="remember" 
            className="w-5 h-5 mr-3 rounded border-gray-300"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <label htmlFor="remember" className="text-base font-bold text-black">
            Remember me
          </label>
        </div>

        {/* reCAPTCHA */}
        <div className="w-full">
          <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI">
            {/* This is just a placeholder for the reCAPTCHA UI */}
            <div className="border border-gray-200 rounded w-full h-[78px] flex items-center justify-center bg-gray-50">
              <div className="flex items-center">
                <Checkbox 
                  id="recaptcha" 
                  className="w-5 h-5 mr-3 rounded border-gray-300"
                />
                <label htmlFor="recaptcha" className="text-base font-bold text-black">
                  I'm not a robot
                </label>
                <div className="ml-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M27.5 16C27.5 22.3513 22.3513 27.5 16 27.5C9.64873 27.5 4.5 22.3513 4.5 16C4.5 9.64873 9.64873 4.5 16 4.5C22.3513 4.5 27.5 9.64873 27.5 16Z" stroke="#CCCCCC"/>
                    <path d="M16 2.5C8.54416 2.5 2.5 8.54416 2.5 16C2.5 23.4558 8.54416 29.5 16 29.5C23.4558 29.5 29.5 23.4558 29.5 16C29.5 8.54416 23.4558 2.5 16 2.5ZM16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0Z" fill="#CCCCCC"/>
                    <path d="M25 16.5C25 21.1944 21.1944 25 16.5 25C11.8056 25 8 21.1944 8 16.5C8 11.8056 11.8056 8 16.5 8C21.1944 8 25 11.8056 25 16.5Z" fill="#F5F5F5"/>
                    <path d="M24.5 14.5C24.5 14.5 22 18.5 16.5 18.5C11 18.5 8.5 14.5 8.5 14.5" stroke="#CCCCCC"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-[#007bff] text-white font-medium rounded-[4px] px-12 py-4 hover:bg-blue-700 border border-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <Link href="/reset-password" className="text-[#007bff] text-base font-bold">
            Forgot Password?
          </Link>
        </div>
        
        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-base font-bold text-black">
            Don't have an account? <Link href="/signup" className="text-[#007bff]">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}
