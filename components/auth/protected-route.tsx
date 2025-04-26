"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"

type ProtectedRouteProps = {
  children: React.ReactNode
  requireVerified?: boolean
}

export default function ProtectedRoute({ 
  children, 
  requireVerified = false 
}: ProtectedRouteProps) {
  const { user, loading, refreshUser } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkVerification = async () => {
      if (!loading && user) {
        // If verification is required, force refresh user data to get latest status
        if (requireVerified) {
          setIsRefreshing(true)
          try {
            await refreshUser() // Use refreshUser from auth context instead of direct reload
            setIsVerified(user.emailVerified)
            console.log("User data refreshed in protected route, verification status:", user.emailVerified)
            
            if (!user.emailVerified) {
              router.push('/verify-email')
            }
          } catch (error) {
            console.error("Error refreshing user data:", error)
            // Fallback to current cached value
            setIsVerified(user.emailVerified)
            if (!user.emailVerified) {
              router.push('/verify-email')
            }
          } finally {
            setIsRefreshing(false)
          }
        }
      } else if (!loading && !user) {
        // If no user is logged in, redirect to login
        router.push('/login')
      }
    }

    checkVerification()
  }, [user, loading, requireVerified, router, refreshUser])

  // Show loading state while checking authentication
  if (loading || isRefreshing) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If user is not logged in, don't render children
  if (!user) {
    return null
  }

  // If verification is required but user is not verified, don't render children
  if (requireVerified && !isVerified) {
    return null
  }

  // If authenticated (and verified when required), render children
  return <>{children}</>
} 