import Link from "next/link"
import Image from "next/image"

export default function InfoFooter() {
  return (
    <section className="w-full" style={{ backgroundColor: "#eff6ff" }}>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-start mb-8">
          <div className="footer-logo">
            <Link href="/" className="flex items-center flex-col">
              <Image 
                src="/assets/skluva_logo.png" 
                alt="Skluva Logo" 
                width={140} 
                height={50} 
                className="h-auto"
                priority
              />
              <span className="text-xs font-bold text-gray-700 mt-1">United States</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Legal</h4>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              Terms and Conditions
            </Link>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              Cookie Policy
            </Link>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              Report Trafficking
            </Link>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Information</h4>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              Display-AD & Price
            </Link>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              About
            </Link>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              Contact US
            </Link>
            <Link href="#" className="block mb-3 text-gray-600 hover:text-primary">
              FAQ
            </Link>
            <Link 
              href="/create-ad" 
              className="block mb-3 text-[#007bff] hover:text-blue-700 font-medium"
              data-component-name="LinkComponent"
            >
              Create Ad
            </Link>
            <Link href="#" className="flex items-center mt-3 text-gray-600 hover:text-primary">
              Follow us
              <svg className="w-3 h-3 ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
