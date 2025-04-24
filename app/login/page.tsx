import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        <LoginForm />
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
