import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import PromoteAdForm from "../../components/promote-ad/promote-ad-form"

export default function PromoteAdPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="w-full">
        <PromoteAdForm />
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
