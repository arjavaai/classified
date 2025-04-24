import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import CreateAdForm from "@/components/create-ad-form"

export default function CreateAdPage() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        <CreateAdForm />
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
