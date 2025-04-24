import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"

export default function CookiePolicyPage() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. What Are Cookies</h2>
              <p className="text-gray-700">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Cookies</h2>
              <p className="text-gray-700 mb-3">
                We use cookies for a variety of purposes. Some cookies are necessary for technical reasons; some enable a personalized experience for both visitors and registered users; and some allow for the display of advertising from selected third-party networks.
              </p>
              <p className="text-gray-700">
                We may use cookies to remember your preferences, such as your language preferences or whether you've accepted our terms and conditions. This prevents you from having to re-enter this information when you return to our site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">Necessary Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are essential for enabling user movement around our website and providing access to features such as secure areas of the website. These cookies do not gather information about you that could be used for marketing purposes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Analytical/Performance Cookies</h3>
                  <p className="text-gray-700">
                    These cookies collect information about how visitors use our website, for instance which pages visitors go to most often, and if they get error messages from web pages. They help us to improve how our website works. These cookies don't collect information that identifies a visitor.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Advertising Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaigns.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Managing Cookies</h2>
              <p className="text-gray-700 mb-3">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
              </p>
              <p className="text-gray-700">
                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Changes to Our Cookie Policy</h2>
              <p className="text-gray-700">
                We may update our Cookie Policy from time to time. Any changes we make to our Cookie Policy in the future will be posted on this page and, where appropriate, notified to you. Please check back frequently to see any updates or changes to our Cookie Policy.
              </p>
            </section>
          </div>
        </div>
        
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  )
} 