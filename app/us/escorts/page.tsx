import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import Link from "next/link"
import { getAllStatesWithCities, getStateUrl } from "@/lib/route-utils"

export default function USEscortsPage() {
  const statesWithCities = getAllStatesWithCities();

  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb text-sm mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Skluva United States
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <span className="text-accent-blue font-medium">US Escorts</span>
        </div>

        {/* US Escorts Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
          United States Escorts
        </h1>

        {/* States Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Browse Escorts by State</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statesWithCities.map((state) => (
              <div key={state.slug} className="border border-gray-200 rounded-lg p-4">
                <Link 
                  href={getStateUrl(state.slug)}
                  className="text-lg font-semibold text-accent-blue hover:underline"
                >
                  {state.name} Escorts
                </Link>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {state.cities.slice(0, 5).map((city) => (
                    <Link
                      key={city.slug}
                      href={`${getStateUrl(state.slug)}/${city.slug}`}
                      className="text-sm text-gray-600 hover:text-accent-blue hover:underline"
                    >
                      {city.name}
                    </Link>
                  ))}
                  {state.cities.length > 5 && (
                    <Link
                      href={getStateUrl(state.slug)}
                      className="text-sm text-accent-blue font-medium hover:underline"
                    >
                      +{state.cities.length - 5} more
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
}
