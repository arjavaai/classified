import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="bg-white">
      <Header />
      <LoginForm />
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
