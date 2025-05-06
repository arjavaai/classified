"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import ProtectedRoute from "@/components/auth/protected-route"
import { User, Mail, Phone, ArrowLeft, Camera } from "lucide-react"

export default function EditProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock user data - in a real app, this would come from your database
  const [formData, setFormData] = useState({
    name: user?.displayName || "Sam",
    email: user?.email || "angelahopkins2@hotmail.com",
    phone: "0991014946"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // In a real app, you would update the user profile in your database here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast.success("Profile updated successfully")
      router.push("/profile")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="max-w-3xl mx-auto px-4 py-6">
        <ProtectedRoute requireVerified={true}>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <button 
                onClick={() => router.push('/profile')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Edit Profile</h1>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={formData.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Click the camera icon to change your profile picture</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      disabled={user?.email ? true : false}
                    />
                    {user?.email && (
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/profile')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </ProtectedRoute>
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
