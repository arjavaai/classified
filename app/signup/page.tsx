import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import SignupForm from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        <SignupForm />
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
