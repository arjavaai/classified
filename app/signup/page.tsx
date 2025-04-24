import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import SignupForm from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="bg-white">
      <Header />
      <SignupForm />
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
