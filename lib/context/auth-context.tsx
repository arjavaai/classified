"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  reload,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<User | null>
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => null,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log("Auth context initializing...")
    
    // Skip auth state monitoring if auth is null (happens during SSR)
    if (!auth) {
      console.log("Auth is not initialized, skipping auth state monitoring")
      setLoading(false)
      return () => {}
    }
    
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("Auth state changed:", authUser ? `User ${authUser.email} logged in` : "No user")
      setUser(authUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    if (!auth) {
      console.error("Auth not initialized")
      return
    }
    
    try {
      await firebaseSignOut(auth)
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Function to refresh user data and return the updated user
  const refreshUser = async (): Promise<User | null> => {
    if (user && auth) {
      try {
        console.log("Refreshing user data...")
        await reload(user)
        console.log("User data refreshed, verification status:", user.emailVerified)
        return user
      } catch (error) {
        console.error("Error refreshing user data:", error)
      }
    }
    return user
  }

  const value = {
    user,
    loading,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}