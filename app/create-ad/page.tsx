import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import CreateAdForm from "@/components/create-ad/create-ad-form"

export default function CreateAdPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="w-full">
        <CreateAdForm />
      </div>
      
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
