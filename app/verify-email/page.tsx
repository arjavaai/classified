import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import { VerifyEmailContent } from "@/components/auth/verify-email-content"

export default function VerifyEmailPage() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        <VerifyEmailContent />
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
} 