"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { sendEmailVerification } from "firebase/auth"
import { useAuth } from "@/lib/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export function VerifyEmailContent() {
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isCheckingVerification, setIsCheckingVerification] = useState(true)
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Check verification status when component loads
  useEffect(() => {
    const checkVerification = async () => {
      if (!user) {
        router.push("/login")
        return
      }

      try {
        setIsCheckingVerification(true)
        // Allow time for Firebase to process verification
        await new Promise((resolve) => setTimeout(resolve, 1500))
        
        // Refresh user data to get updated verification status
        const updatedUser = await refreshUser()
        
        if (updatedUser?.emailVerified) {
          setIsVerified(true)
          toast({
            title: "Email verified",
            description: "Your email has been verified successfully. Redirecting...",
            variant: "default",
          })
          
          // Redirect after verification
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        } else {
          setIsVerified(false)
        }
      } catch (error) {
        console.error("Error checking verification:", error)
      } finally {
        setIsCheckingVerification(false)
      }
    }

    checkVerification()
  }, [user, router, refreshUser, toast])

  // Periodically check if email has been verified
  useEffect(() => {
    if (!user || isVerified) return

    const intervalId = setInterval(async () => {
      try {
        const updatedUser = await refreshUser()
        if (updatedUser?.emailVerified) {
          setIsVerified(true)
          clearInterval(intervalId)
          toast({
            title: "Email verified",
            description: "Your email has been verified successfully. Redirecting...",
            variant: "default",
          })
          
          // Redirect after verification
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      } catch (error) {
        console.error("Error checking verification status:", error)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [user, isVerified, router, refreshUser, toast])

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      await sendEmailVerification(user)
      setCountdown(60) // Set 60 seconds countdown
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and spam folder.",
        variant: "default",
      })
    } catch (error: any) {
      toast({
        title: "Error sending verification email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingVerification) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-bold">Checking email verification status...</h1>
        <p>Please wait while we verify your email status.</p>
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-bold">Email Verified!</h1>
        <p>Your email has been verified successfully. Redirecting to dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-2xl font-bold">Verify Your Email</h1>
      <p>
        We've sent a verification email to <span className="font-medium">{user?.email}</span>.
        Please check your inbox and click the link to verify your email address.
      </p>
      <p className="text-sm text-muted-foreground">
        If you don't see the email, check your spam folder.
      </p>
      <Button
        onClick={handleResendEmail}
        disabled={countdown > 0 || isLoading}
        className="mt-4"
      >
        {isLoading
          ? "Sending..."
          : countdown > 0
          ? `Resend in ${countdown}s`
          : "Resend verification email"}
      </Button>
    </div>
  )
} 