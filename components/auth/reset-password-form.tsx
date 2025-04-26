"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPassword } from "@/lib/firebase"
import { toast } from "sonner"

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await resetPassword(email)
      
      if (result.success) {
        setIsSuccess(true)
        toast.success("Password reset email sent. Please check your inbox.")
      } else {
        toast.error(result.error || "Failed to send reset email")
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
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Reset Password</h1>

        {isSuccess ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
              <p>Password reset email sent!</p>
              <p className="mt-2">Please check your email for reset instructions.</p>
            </div>
            <Link href="/login" className="text-primary font-semibold">
              Return to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleResetPassword}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email
              </label>
              <Input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                className="input-field w-full p-4 text-base rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Reset Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-5 px-4 rounded-lg hover:bg-primary-light transition text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link href="/login" className="text-primary font-semibold">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 