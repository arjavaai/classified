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
    <div className="max-w-md mx-auto px-6 py-8 md:py-12 min-h-[calc(100vh-340px)] flex flex-col justify-center bg-white">
      <h1 className="text-2xl font-bold text-center mb-8 text-black">Reset Password</h1>

      {isSuccess ? (
        <div className="text-center">
          <div className="bg-green-50 text-green-700 p-4 rounded border border-green-200 mb-6">
            <p className="font-bold">Password reset email sent!</p>
            <p className="mt-2">Please check your email for reset instructions.</p>
          </div>
          <Link href="/login" className="text-[#007bff] font-bold text-base">
            Return to Login
          </Link>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleResetPassword}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-base font-bold mb-2 text-black">
              Email
            </label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              className="w-full p-4 text-base rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-14"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Reset Button */}
          <Button
            type="submit"
            className="w-full bg-[#007bff] text-white font-medium rounded-[4px] px-12 py-4 hover:bg-blue-700 border border-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <Link href="/login" className="text-[#007bff] font-bold text-base">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  )
} 