import Link from "next/link"

export default function InfoFooter() {
  return (
    <div className="info-footer rounded-xl overflow-hidden bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="footer-logo">
            <span className="text-primary font-bold text-2xl mr-1">Skluva</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              href="#"
              className="mt-2 inline-block bg-primary text-white text-center px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
            >
              Create AD
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
    </div>
  )
}
