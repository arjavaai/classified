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
    <div className="max-w-md mx-auto px-6 py-8 md:py-12 min-h-[calc(100vh-340px)] flex flex-col justify-center">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Log in</h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Enter Email" 
              className="input-field w-full p-4 text-base rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className="input-field w-full p-4 text-base rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
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
              className="w-5 h-5 mr-3 accent-primary rounded"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <label htmlFor="remember" className="text-base">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-5 px-4 rounded-lg hover:bg-primary-light transition text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="/reset-password" className="text-primary font-semibold text-base">
              Forgot Password?
            </Link>
          </div>
        </form>

        {/* Separator Line */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <div className="px-4 text-gray-500">or</div>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-base">
            Don't have an account?
            <Link href="/signup" className="text-primary font-semibold ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
