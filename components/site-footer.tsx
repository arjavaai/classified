import Image from "next/image"
import Link from "next/link"

export default function SiteFooter() {
  return (
    <section className="w-full" style={{ backgroundColor: "#eff6ff" }}>
      <div className="max-w-7xl mx-auto p-6 mt-0">
        <div className="flex items-start">{/* Empty div to match the original layout */}</div>

        {/* Added Statutory Declaration */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-700 leading-relaxed">
            This website is an advertising platform and not an escort agency. We are not responsible for third-party
            content or transactions. Advertisers are fully responsible for their ads, including legality and accuracy. We
            do not intervene in agreements or verify ad content. For more information, please refer to our Terms and
            Conditions and Policy page.
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-300 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="handprint flex-shrink-0 self-center md:self-auto">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10"
              >
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-800 font-bold text-sm">STOP</span>
              </div>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <p className="text-sm text-gray-800 mb-2">
              <span className="text-primary">Human trafficking is abhorrent</span>
            </p>
          </div>
          <div className="flex space-x-4 self-center md:self-auto">
            <Link href="https://www.asacp.org/" target="_blank" rel="noopener noreferrer" className="transition-all hover:brightness-110">
              <Image 
                src="/assets/ASACP_BADGE.png" 
                alt="ASACP Badge" 
                width={120} 
                height={50} 
                className="h-auto rounded-[2px] border border-gray-200"
              />
            </Link>
            <Link href="https://www.rtalabel.org/" target="_blank" rel="noopener noreferrer" className="transition-all hover:brightness-110">
              <Image 
                src="/assets/RTA_BADGE.png" 
                alt="RTA Badge" 
                width={120} 
                height={50} 
                className="h-auto rounded-[2px] border border-gray-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
