import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Age Verification and Site Access</h2>
              <p className="text-gray-700">
                By accessing this website, you confirm that you are at least 18 years of age (or the legal age of majority in your jurisdiction, whichever is greater), and that you are voluntarily choosing to view and access such content.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. User Responsibilities</h2>
              <p className="text-gray-700">
                Users of this site agree to abide by all applicable local, state, national, and international laws and regulations. Users are solely responsible for all content they post, upload, or otherwise make available on the platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Service Description</h2>
              <p className="text-gray-700">
                This platform serves as a classified advertisement service that allows advertisers to post advertisements for escort and adult services. The site does not participate in any transactions or arrangements between users and advertisers.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Disclaimer</h2>
              <p className="text-gray-700">
                The website serves solely as a platform for advertisers to publish their advertisements. We do not endorse, support, or guarantee the accuracy, completeness, or reliability of any content or advertisements posted. Users engage with advertisers at their own risk.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Privacy Policy</h2>
              <p className="text-gray-700">
                We respect your privacy and are committed to protecting your personal data. Our Privacy Policy outlines our practices concerning the collection, use, and disclosure of your information. By using our site, you consent to our Privacy Policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Modifications to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms and Conditions at any time. Your continued use of the site after any changes indicates your acceptance of the modified Terms and Conditions.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      {/* Full-width info footer */}
      <InfoFooter />
      
      {/* Full-width site footer */}
      <SiteFooter />
    </div>
  )
} 