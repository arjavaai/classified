"use client"

import { useState, useEffect, useRef } from "react"
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
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import { WhatsAppIcon, EmailIcon, PhoneIcon } from "@/lib/icons"
import { contactInfo } from "@/lib/config"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "./styles.css"

export default function ListingDetailPage() {
  const [showMobileButtons, setShowMobileButtons] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  
  // Image gallery
  const galleryImages = [
    {
      src: "/sophisticated-evening.png",
      alt: "Elite Companion",
      width: 180
    },
    {
      src: "/confident-professional.png",
      alt: "Elite Companion",
      width: 250
    },
    {
      src: "/sapphire-serenity.png",
      alt: "Elite Companion",
      width: 150
    },
    {
      src: "/elegant-gaze.png",
      alt: "Elite Companion",
      width: 180
    },
    {
      src: "/confident-african-professional.png",
      alt: "Elite Companion",
      width: 250
    }
  ];

  const handleOpenFullscreen = (index: number): void => {
    setFullscreenIndex(index);
    setFullscreenActive(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseFullscreen = (): void => {
    setFullscreenActive(false);
    document.body.style.overflow = '';
  };

  const handlePrevImage = (): void => {
    setFullscreenIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = (): void => {
    setFullscreenIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!fullscreenActive) return;
      
      if (e.key === 'Escape') {
        handleCloseFullscreen();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenActive]);

  // Mobile scrolling effect for buttons
  useEffect(() => {
    const handleScroll = (): void => {
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

  // Touch handling for fullscreen swipe
  const touchStartRef = useRef(0);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>): void => {
    touchStartRef.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStartRef.current - touchEnd;
    
    // Swipe threshold
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe left - next image
        handleNextImage();
      } else {
        // Swipe right - previous image
        handlePrevImage();
      }
    }
  };

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

            {/* Full-width Gallery */}
            <div className="mb-8 relative bg-gray-900 p-0 rounded-xl overflow-hidden">              
              <div className="full-width-gallery-container">
                <Swiper
                  modules={[Navigation, Pagination, FreeMode]}
                  spaceBetween={0}
                  slidesPerView={4}
                  breakpoints={{
                    320: { slidesPerView: 1.25, spaceBetween: 0 },
                    640: { slidesPerView: 2.5, spaceBetween: 0 },
                    1024: { slidesPerView: 3, spaceBetween: 0 },
                    1280: { slidesPerView: 4, spaceBetween: 0 },
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  pagination={{
                    clickable: true,
                    bulletClass: 'custom-bullet',
                    bulletActiveClass: 'custom-bullet-active',
                  }}
                  onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                  className="full-width-gallery"
                >
                  {galleryImages.map((image, index) => (
                    <SwiperSlide 
                      key={index}
                      className="full-width-slide"
                      onClick={() => handleOpenFullscreen(index)}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Custom Navigation Arrows */}
                <div className="swiper-button-prev custom-prev">
                  <ChevronLeft className="text-white w-6 h-6" />
                </div>
                <div className="swiper-button-next custom-next">
                  <ChevronRight className="text-white w-6 h-6" />
                </div>
                
                {/* Red progress bar */}
                <div className="gallery-progress-bar"></div>
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
                href={`tel:${contactInfo.phone}`}
                className="block w-full bg-primary text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-primary-light transition mb-3"
              >
                <PhoneIcon className="inline-block mr-2 h-4 w-4" /> Call Now: {contactInfo.formattedPhone}
              </Link>
              <Link
                href={`https://wa.me/${contactInfo.whatsapp}`}
                className="block w-full bg-[#25D366] text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition mb-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp
              </Link>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="block w-full bg-gray-200 text-gray-700 text-center font-semibold py-3 px-4 rounded-md hover:bg-gray-300 transition"
              >
                <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Message
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
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex gap-2 z-50 md:hidden">
          <Link
            href={`tel:${contactInfo.phone}`}
            className="flex-grow flex items-center justify-start bg-blue-600 text-white font-bold text-center py-3 px-4 rounded-md"
            aria-label={`Call ${contactInfo.formattedPhone}`}
          >
            <PhoneIcon className="h-6 w-6 mr-2 flex-shrink-0" />
            <span className="text-base sm:text-lg whitespace-nowrap overflow-hidden text-ellipsis">{contactInfo.formattedPhone}</span>
          </Link>
          <Link
            href={`https://wa.me/${contactInfo.whatsapp}`}
            className="flex items-center justify-center bg-[#25D366] text-white text-center p-3 rounded-md w-14 h-14 flex-shrink-0"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </Link>
          <Link
            href={`mailto:${contactInfo.email}`}
            className="flex items-center justify-center bg-gray-200 text-gray-800 text-center p-3 rounded-md w-14 h-14 flex-shrink-0"
            aria-label="Email"
          >
            <EmailIcon className="h-7 w-7" />
          </Link>
        </div>
      )}
      
      {/* Fullscreen Gallery */}
      {fullscreenActive && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center"
          onClick={handleCloseFullscreen}
        >
          <div 
            className="relative max-w-[90%] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[fullscreenIndex].src}
              alt={galleryImages[fullscreenIndex].alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain rounded-md"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          
          <button 
            className="absolute top-4 right-4 bg-opacity-20 bg-white rounded-full w-10 h-10 flex items-center justify-center text-white"
            onClick={handleCloseFullscreen}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-opacity-20 bg-white rounded-full w-12 h-12 flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-opacity-20 bg-white rounded-full w-12 h-12 flex items-center justify-center text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            <ChevronRight size={28} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
            {fullscreenIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
