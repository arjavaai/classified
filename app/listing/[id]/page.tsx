"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Check,
  Calendar,
  Ruler,
  Globe,
  Users,
  MapPin,
  Languages,
  List,
  Tags,
  Clock,
  Phone,
  MessageSquare,
} from "lucide-react"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"

export default function ListingDetailPage() {
  const [showMobileButtons, setShowMobileButtons] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('page-footer');
      const contactInfo = document.getElementById('contact-info-section');
      
      if (footer && contactInfo) {
        const footerPosition = footer.getBoundingClientRect().top;
        const contactPosition = contactInfo.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Hide the buttons when the contact section or footer is visible
        setShowMobileButtons(contactPosition > windowHeight - 100 && footerPosition > windowHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb text-sm mb-4">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Skluva United States
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <Link href="#" className="text-gray-600 hover:text-primary">
            California Escorts
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <Link href="/search-results" className="text-gray-600 hover:text-primary">
            Los Angeles Escorts
          </Link>
          <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
          <span className="text-accent-blue font-medium">Elite Companion Services</span>
        </div>

        {/* Mobile Companion Info - Only visible on mobile */}
        <div className="md:hidden bg-white p-4 rounded-xl shadow-sm mb-4 text-center">
          <h2 className="text-xl font-bold text-primary mb-1">Julia Rose</h2>
          <p className="text-sm text-gray-600">Elite Companion in Los Angeles</p>
        </div>

        {/* Content Section with two columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left Column (Photos and Details) */}
          <div className="md:col-span-2">
            {/* Ad Title */}
            <h1 className="text-2xl font-bold text-black mb-3">Elite Companion Services in LA - Cash Payment Only</h1>

            {/* Ad Meta */}
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded">
                <Check className="inline-block w-3 h-3 mr-1" /> Verified
              </span>
              <span className="bg-green-50 text-green-600 px-2 py-1 rounded">
                <span className="inline-block mr-1">★</span> Top Rated
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                <Calendar className="inline-block w-3 h-3 mr-1" /> Posted: 2 days ago
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block w-3 h-3 mr-1"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>{" "}
                Views: 321
              </span>
            </div>

            {/* Main Photo Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-3">
                  <div className="rounded-lg overflow-hidden h-80">
                    <Image
                      src="/sophisticated-evening.png"
                      alt="Elite Companion"
                      width={634}
                      height={634}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="photo-gallery-item h-40 relative overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src="/confident-professional.png"
                    alt="Elite Companion"
                    width={634}
                    height={634}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="photo-gallery-item h-40 relative overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src="/sapphire-serenity.png"
                    alt="Elite Companion"
                    width={634}
                    height={634}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="photo-gallery-item h-40 relative overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src="/elegant-gaze.png"
                    alt="Elite Companion"
                    width={634}
                    height={634}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold text-lg">
                    <span>+2 More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-700 mb-5 leading-relaxed">
                High-end companionship service providing elegant, educated escorts for social events and private moments.
                Genuine photos and professional service guaranteed. I pride myself on being discreet, professional, and
                attentive to your needs.
              </p>
              <p className="text-gray-700 mb-5 leading-relaxed">
                I offer a truly exceptional girlfriend experience for distinguished gentlemen seeking quality
                companionship. Whether you desire a dinner date, travel companion, or intimate encounter, I provide an
                unforgettable experience tailored to your preferences.
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <Calendar className="text-primary mr-2 h-4 w-4" /> Age
                  </div>
                  <div className="text-gray-700">24 years</div>
                </div>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <Ruler className="text-primary mr-2 h-4 w-4" /> Height
                  </div>
                  <div className="text-gray-700">5'7" (170cm)</div>
                </div>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <Globe className="text-primary mr-2 h-4 w-4" /> Nationality
                  </div>
                  <div className="text-gray-700">American</div>
                </div>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <Users className="text-primary mr-2 h-4 w-4" /> Caters to
                  </div>
                  <div className="text-gray-700">Men, Women, Couples</div>
                </div>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <MapPin className="text-primary mr-2 h-4 w-4" /> Location
                  </div>
                  <div className="text-gray-700">Los Angeles / Santa Monica</div>
                </div>
                <div className="border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <Languages className="text-primary mr-2 h-4 w-4" /> Languages
                  </div>
                  <div className="text-gray-700">English, Spanish</div>
                </div>
              </div>

              {/* Services */}
              <div className="mt-5">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <List className="text-primary mr-2 h-4 w-4" /> Services Offered
                </div>
                <div className="flex flex-wrap mt-2">
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Girlfriend experience
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Massage
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Role play
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Dinner dates
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Travel companion
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Outcall
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Incall
                  </span>
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                    Events
                  </span>
                </div>
              </div>

              {/* Rates */}
              <div className="mt-5">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <Tags className="text-primary mr-2 h-4 w-4" /> Rates
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">1 Hour</div>
                    <div className="font-bold text-green-600">$250</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">2 Hours</div>
                    <div className="font-bold text-green-600">$450</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Overnight</div>
                    <div className="font-bold text-green-600">$1200</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Weekend</div>
                    <div className="font-bold text-green-600">$2800</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Contact and Other Ads) */}
          <div>
            {/* Contact Card */}
            <div id="contact-info-section" className="bg-white p-5 rounded-xl shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="mb-4 text-center">
                <div className="text-xl font-bold text-primary mb-1">Julia Rose</div>
                <div className="text-sm text-gray-600">Elite Companion in Los Angeles</div>
              </div>

              {/* Contact Buttons */}
              <Link
                href="tel:+11234567890"
                className="block w-full bg-primary text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-primary-light transition mb-3"
              >
                <Phone className="inline-block mr-2 h-4 w-4" /> Call Now: (123) 456-7890
              </Link>
              <Link
                href="#"
                className="block w-full bg-green-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block mr-2 h-4 w-4"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9 14a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z" />
                </svg>{" "}
                WhatsApp
              </Link>
              <Link
                href="#"
                className="block w-full bg-gray-200 text-gray-700 text-center font-semibold py-3 px-4 rounded-md hover:bg-gray-300 transition"
              >
                <MessageSquare className="inline-block mr-2 h-4 w-4" /> Send Message
              </Link>

              {/* Availability */}
              <div className="mt-4">
                <div className="text-sm font-semibold mb-2">Availability:</div>
                <div className="text-sm text-gray-700 mb-1">
                  <Clock className="inline-block text-primary mr-2 h-4 w-4" /> Available 7 days a week
                </div>
                <div className="text-sm text-gray-700">
                  <Clock className="inline-block text-primary mr-2 h-4 w-4" /> Hours: 10:00 AM - 2:00 AM
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                <div className="font-semibold mb-1">Important Notice:</div>
                <p>
                  Cash payment only, no advance payments required. Please book at least 1 hour in advance. First meeting
                  at designated location only.
                </p>
              </div>
            </div>

            {/* Similar Ads */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Similar Profiles</h2>

              {/* Similar Ad 1 */}
              <Link href="#" className="block mb-4">
                <div className="flex">
                  <div className="w-20 h-20 rounded-md overflow-hidden mr-3">
                    <Image
                      src="/confident-african-professional.png"
                      alt="Similar Ad"
                      width={634}
                      height={634}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-accent-blue font-medium text-sm">African Escort - Premium Service</div>
                    <div className="text-xs text-gray-600">Los Angeles / Hollywood</div>
                    <div className="text-xs font-bold text-green-600 mt-1">$180</div>
                  </div>
                </div>
              </Link>

              {/* Similar Ad 2 */}
              <Link href="#" className="block mb-4">
                <div className="flex">
                  <div className="w-20 h-20 rounded-md overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=634&width=634&query=college age woman smiling"
                      alt="Similar Ad"
                      width={634}
                      height={634}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-accent-blue font-medium text-sm">High Profile College Girl Available</div>
                    <div className="text-xs text-gray-600">Beverly Hills</div>
                    <div className="text-xs font-bold text-green-600 mt-1">$200</div>
                  </div>
                </div>
              </Link>

              {/* Similar Ad 3 */}
              <Link href="#" className="block">
                <div className="flex">
                  <div className="w-20 h-20 rounded-md overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=634&width=634&query=young woman professional headshot"
                      alt="Similar Ad"
                      width={634}
                      height={634}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-accent-blue font-medium text-sm">GENUINE Cash In Hand Payment Service</div>
                    <div className="text-xs text-gray-600">Los Angeles / Downtown</div>
                    <div className="text-xs font-bold text-green-600 mt-1">$150</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div id="page-footer">
          <InfoFooter />
          <SiteFooter />
        </div>
      </div>

      {/* Fixed Mobile Contact Buttons */}
      {showMobileButtons && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-between z-50 md:hidden">
          <Link
            href="tel:+11234567890"
            className="flex-1 flex items-center justify-center bg-blue-500 text-white text-center py-4 rounded-2xl mx-1"
          >
            <Phone className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="flex-1 flex items-center justify-center bg-green-500 text-white text-center py-4 rounded-2xl mx-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M9 14a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="flex-1 flex items-center justify-center bg-gray-200 text-gray-700 text-center py-4 rounded-2xl mx-1"
          >
            <MessageSquare className="h-6 w-6" />
          </Link>
        </div>
      )}
    </div>
  )
}
