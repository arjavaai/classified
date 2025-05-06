"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"
import Link from "next/link"
import { LayoutDashboard, Mail, MapPin, User, Pencil } from "lucide-react"

export default function ProfileContent() {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Mock user data - in a real app, this would come from your database
  const userData = {
    name: user?.displayName || "Sam",
    email: user?.email || "angelahopkins2@hotmail.com",
    phone: "0991014946",
    id: user?.uid || "USR-29384"
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut();
      toast.success("Logged out successfully")
      // The router navigation is handled by the auth context
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-bold">Your Profile</h1>
          <Button 
            variant="default" 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
            onClick={() => router.push('/profile/edit')}
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={userData.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg 
                className="h-5 w-5 text-gray-500 mt-0.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-500 text-sm">Customer ID</p>
                <p className="font-medium">{userData.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
          <Link href="/dashboard" className="w-full block">
            <Button 
              className="w-full bg-gray-800 text-white hover:bg-gray-900 flex items-center gap-2"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Go to Dashboard</span>
            </Button>
          </Link>
          
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50"
          >
            {isLoading ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </div>
    </div>
  )
}