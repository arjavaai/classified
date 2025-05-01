import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import ProfileContent from "@/components/auth/profile-content"
import ProtectedRoute from "@/components/auth/protected-route"

export default function ProfilePage() {
  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ProtectedRoute requireVerified={true}>
          <ProfileContent />
        </ProtectedRoute>
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
} 