import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ResetPasswordForm />
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
} 