"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Log in</h1>

      <form className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-xl font-medium mb-2">
            Email
          </label>
          <Input type="email" id="email" placeholder="Enter Email" className="input-field w-full p-4 text-base" />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-xl font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              className="input-field w-full p-4 text-base"
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
          <Checkbox id="remember" className="w-5 h-5 mr-3 accent-primary" />
          <label htmlFor="remember" className="text-lg">
            Remember me
          </label>
        </div>

        {/* reCAPTCHA */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <Checkbox id="recaptcha" className="w-5 h-5 mr-3" />
            <label htmlFor="recaptcha" className="text-lg">
              I'm not a robot
            </label>
            <img
              src="/placeholder.svg?height=48&width=120&query=recaptcha logo"
              alt="reCAPTCHA"
              className="h-12 ml-auto"
            />
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-6 px-4 rounded-lg hover:bg-primary-light transition text-xl"
        >
          Log in
        </Button>

        {/* Forgot Password */}
        <div className="text-right">
          <Link href="#" className="text-primary font-semibold text-lg">
            Forgot Password?
          </Link>
        </div>
      </form>

      {/* Separator Line */}
      <div className="flex items-center my-8">
        <div className="flex-grow h-px bg-gray-200"></div>
        <div className="px-4 text-gray-500">or</div>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-xl">
          Don't have an account?
          <Link href="/signup" className="text-primary font-semibold ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
