import Header from "@/components/header"
import AboutSection from "@/components/about-section"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import SearchForm from "@/components/search/search-form"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      {/* Full-width search bar with light blue background */}
      <div className="w-full bg-[#EBF3FA]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="max-w-full">
            <SearchForm />
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* United States Escorts Classified Heading */}
        <h1 className="text-3xl font-bold text-center text-black my-8">United States Escorts Classified</h1>

        <AboutSection />
      </div>
      
      {/* Full-width footers */}
      <InfoFooter />
      <SiteFooter />
    </div>
  )
}
