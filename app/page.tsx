import Header from "@/components/header"
import AboutSection from "@/components/about-section"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"

export default function Home() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />

        {/* United States Escorts Classified Heading */}
        <h1 className="text-3xl font-bold text-center text-black my-8">United States Escorts Classified</h1>

        <AboutSection />
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
