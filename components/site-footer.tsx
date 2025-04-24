export default function SiteFooter() {
  return (
    <footer className="site-footer rounded-xl overflow-hidden bg-gray-900 text-white p-6 mt-6">
      <div className="flex items-start">{/* Empty div to match the original layout */}</div>

      {/* Added Statutory Declaration */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-white opacity-80 leading-relaxed">
          This website is an advertising platform and not an escort agency. We are not responsible for third-party
          content or transactions. Advertisers are fully responsible for their ads, including legality and accuracy. We
          do not intervene in agreements or verify ad content. For more information, please refer to our Terms and
          Conditions and Policy page.
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center">
        <div className="handprint mr-3 flex-shrink-0">
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
              <span className="text-white font-bold text-sm">STOP</span>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <p className="text-sm text-white mb-2">
            <span className="text-primary">Human trafficking is abhorrent</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="h-4 bg-gray-700 px-2 flex items-center rounded text-xs text-white">ASACP</div>
          <div className="h-4 bg-gray-700 px-2 flex items-center rounded text-xs text-white">RTA</div>
        </div>
      </div>
    </footer>
  )
}
