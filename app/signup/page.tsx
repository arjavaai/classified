import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import SignupForm from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <SignupForm />
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
