"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Ruler,
  Globe,
  Users,
  MapPin,
  Languages,
  List,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  Menu,
  User,
  Twitter,
  Instagram,
  Share2
} from "lucide-react"
import Header from "@/components/header"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import { WhatsAppIcon, EmailIcon, PhoneIcon } from "@/lib/icons"
import { contactInfo } from "@/lib/config"
import { sampleAds } from "@/lib/ads-data"
import { getStateUrl, getCityUrl } from "@/lib/route-utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "./styles.css"

export default function AdPage({ params }: { params: { title: string } }) {
  const [showMobileButtons, setShowMobileButtons] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [listing, setListing] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const adId = searchParams.get("");
  
  useEffect(() => {
    if (!adId) {
      router.push("/404");
      return;
    }

    const id = parseInt(adId);
    const ad = sampleAds.find(ad => ad.id === id);
    
    if (!ad) {
      router.push("/404");
      return;
    }
    
    setListing(ad);
  }, [adId, router]);
  
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
    const handleScroll = () => {
      const contactSection = document.getElementById('contact-info-section-mobile');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        
        // Hide buttons when contact section is visible or has been scrolled past
        // This ensures buttons remain hidden from contact section to bottom of page
        if (rect.top <= window.innerHeight) {
          setShowMobileButtons(false);
        } else {
          setShowMobileButtons(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleBackClick = () => {
    router.back();
  };

  if (!listing) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  // Generate state and city URLs for breadcrumb
  const stateSlug = listing.location.state.toLowerCase().replace(/\s+/g, '-');
  const citySlug = listing.location.city.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb text-sm mb-4 px-2 sm:px-0">
            <div className="grid grid-cols-1 sm:flex sm:items-center sm:flex-wrap">
              {/* First line on mobile */}
              <div className="flex items-center w-full mb-1 sm:mb-0 sm:w-auto">
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Skluva United States
                </Link>
                <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
                <Link href={getStateUrl(listing?.location.stateAbbreviation)} className="text-gray-600 hover:text-primary">
                  {listing?.location.state} Escorts
                </Link>
              </div>
              
              {/* Second line on mobile */}
              <div className="flex items-center w-full sm:w-auto">
                <span className="breadcrumb-divider mx-2 text-gray-600 hidden sm:inline">/</span>
                <Link 
                  href={getCityUrl(stateSlug, citySlug)} 
                  className="text-accent-blue font-medium hover:text-primary"
                >
                  {listing?.location.city} Escorts
                </Link>
              </div>
            </div>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={handleBackClick} 
            className="flex items-center text-accent-blue font-bold hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to search
          </button>
          
          {/* Ad Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
            {listing.title}
          </h1>
        </div>
      </div>
      
      {/* Image Gallery - Full Screen Width */}
      <div className="bg-black p-0 mb-0 overflow-hidden w-full">
        <div className="relative full-width-gallery-container">
          {/* Fullscreen Gallery */}
          {fullscreenActive && (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={handleCloseFullscreen}
              >
                <X className="h-6 w-6" />
              </button>
              
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <Image
                src={galleryImages[fullscreenIndex].src}
                alt={galleryImages[fullscreenIndex].alt}
                width={800}
                height={600}
                className="max-h-screen max-w-full object-contain"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
          
          {/* Regular Gallery */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode]}
            spaceBetween={5}
            slidesPerView="auto"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'custom-bullet',
              bulletActiveClass: 'custom-bullet-active',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            onSlideChange={(swiper: any) => setActiveSlide(swiper.activeIndex)}
            className="full-width-gallery"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide 
                key={index}
                className="full-width-slide"
                onClick={() => handleOpenFullscreen(index)}
              >
                <div className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={350}
                    className="w-auto h-full object-cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Arrows - Inside Swiper */}
            <div className="swiper-button-prev custom-prev" slot="button-prev">
              <ChevronLeft className="text-white w-6 h-6" />
            </div>
            <div className="swiper-button-next custom-next" slot="button-next">
              <ChevronRight className="text-white w-6 h-6" />
            </div>
          </Swiper>
          
          {/* Blue progress bar */}
          <div className="gallery-progress-bar"></div>
        </div>
      </div>
      
      <div className="bg-white pt-6">
        <div className="max-w-5xl mx-auto px-4 pb-8">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2">
              {/* Description Section */}
              <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
                <div className="text-xs text-gray-500 mb-2">AD ID: #{listing.id}</div>
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <p className="text-gray-700 mb-5 leading-relaxed">
                  {listing.description}
                </p>

                {/* Personal Details Section */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <User className="w-5 h-5 mr-2 text-black" />
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <Calendar className="text-black mr-2 h-4 w-4" /> Age
                      </div>
                      <div className="text-gray-700">{listing.age} years</div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <Globe className="text-black mr-2 h-4 w-4" /> Ethnicity
                      </div>
                      <div className="text-gray-700">Asian</div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <Globe className="text-black mr-2 h-4 w-4" /> Nationality
                      </div>
                      <div className="text-gray-700">{listing.nationality || "Not specified"}</div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <svg 
                          className="text-black mr-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Breast
                      </div>
                      <div className="text-gray-700">Natural C</div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <svg 
                          className="text-black mr-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Hair
                      </div>
                      <div className="text-gray-700">Long Black</div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <Ruler className="text-black mr-2 h-4 w-4" /> Body Type
                      </div>
                      <div className="text-gray-700">{listing.bodyType || "Petite"}</div>
                    </div>
                  </div>
                </div>
                


                {/* Services Section */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    Services
                  </h3>
                  <div className="flex flex-wrap mt-1">
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Girlfriend experience
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Massage
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Role play
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Dinner dates
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Travel companion
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Events
                    </span>
                  </div>
                </div>

                {/* Caters To Section */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-black" />
                    Caters To
                  </h3>
                  <div className="flex flex-wrap mt-1">
                    {listing.catersTo && listing.catersTo.length > 0 ? (
                      listing.catersTo.map((item: string, index: number) => (
                        <span key={index} className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                          {item}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                          Men
                        </span>
                        <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                          Women
                        </span>
                        <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                          Couples
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Place of Service Section */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-black" />
                    Place of Service
                  </h3>
                  <div className="flex flex-wrap mt-1">
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      At home
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Events and parties
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Hotel / Motel
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Clubs
                    </span>
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      Outcall
                    </span>
                  </div>
                </div>
                
                {/* Location Section */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-black" />
                    Location
                  </h3>
                  <div className="flex flex-wrap mt-1">
                    <span className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                      {listing.location.city}
                    </span>
                  </div>
                </div>
                
                {/* Rates Section */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <svg 
                      className="w-5 h-5 mr-2 text-black" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Rates
                  </h3>
                  
                  <div className="overflow-hidden rounded-lg border border-black mb-4">
                    {/* Header Row */}
                    <div className="bg-blue-600 text-white grid grid-cols-3 text-center font-medium">
                      <div className="p-2 border-r border-white/20">Time</div>
                      <div className="p-2 border-r border-white/20">Incall</div>
                      <div className="p-2">Outcall</div>
                    </div>
                    
                    {/* Rate Rows */}
                    <div className="bg-white">
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">0.5 Hour</div>
                        <div className="p-2">150 USD</div>
                        <div className="p-2 flex items-center justify-center">
                          <X className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">1 Hour</div>
                        <div className="p-2">200 USD</div>
                        <div className="p-2">250 USD</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">2 Hours</div>
                        <div className="p-2">400 USD</div>
                        <div className="p-2">500 USD</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">3 Hours</div>
                        <div className="p-2">600 USD</div>
                        <div className="p-2">750 USD</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">6 Hours</div>
                        <div className="p-2">1200 USD</div>
                        <div className="p-2">1500 USD</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">12 Hours</div>
                        <div className="p-2">2400 USD</div>
                        <div className="p-2">3000 USD</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center border-b border-black">
                        <div className="p-2 text-blue-600 font-medium">24 Hours</div>
                        <div className="p-2">5000 USD</div>
                        <div className="p-2">6000 USD</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center">
                        <div className="p-2 text-blue-600 font-medium">48 Hours</div>
                        <div className="p-2">10 USD</div>
                        <div className="p-2">120 USD</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Contact Information - Only visible on mobile */}
                <div id="contact-info-section-mobile" className="mt-5 border-t border-gray-100 pt-4 md:hidden">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={`tel:${contactInfo.phone}`}
                      className="block w-full bg-primary text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-primary-light transition"
                    >
                      <PhoneIcon className="inline-block mr-2 h-4 w-4" /> {contactInfo.formattedPhone}
                    </Link>
                    <Link
                      href={`https://wa.me/${contactInfo.whatsapp}`}
                      className="block w-full bg-[#25D366] text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp
                    </Link>
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      className="block w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:from-amber-600 hover:to-yellow-600 transition"
                    >
                      <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Email
                    </Link>
                  </div>
                  
                  {/* Report and Share Section - Mobile */}
                  <div className="mt-5 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`mailto:support@skulva.com?subject=Report Spam - Ad ID: ${listing.id}&body=I would like to report ad ID: ${listing.id} as spam or inappropriate content.`} 
                        className="text-red-500 font-medium underline"
                      >
                        Report a Spam
                      </Link>
                      <div className="flex items-center">
                        <Share2 className="mr-2 text-gray-700 w-4 h-4" />
                        <span className="mr-2 text-gray-700">Share ad</span>
                        <Link 
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(`Check out this escort ad: ${listing.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="mx-1 bg-black rounded-full w-8 h-8 flex items-center justify-center"
                        >
                          <X className="text-white w-4 h-4" />
                        </Link>
                        <Link 
                          href={`https://wa.me/?text=${encodeURIComponent(`Check out this escort ad: ${listing.title} ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mx-1 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                          <WhatsAppIcon className="text-white w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Other Ads) */}
            <div>
              {/* Desktop Contact Card */}
              <div id="contact-info-section" className="bg-white p-5 rounded-xl shadow-sm mb-6 hidden md:block">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <Link
                    href={`tel:${contactInfo.phone}`}
                    className="block w-full bg-primary text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-primary-light transition"
                  >
                    <PhoneIcon className="inline-block mr-2 h-4 w-4" /> {contactInfo.formattedPhone}
                  </Link>
                  <Link
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    className="block w-full bg-[#25D366] text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp
                  </Link>
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    className="block w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:from-amber-600 hover:to-yellow-600 transition"
                  >
                    <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Email
                  </Link>
                </div>
                
                {/* Report and Share Section - Desktop */}
                <div className="mt-5 pt-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <Link 
                      href={`mailto:support@skulva.com?subject=Report Spam - Ad ID: ${listing.id}&body=I would like to report ad ID: ${listing.id} as spam or inappropriate content.`} 
                      className="text-red-500 font-medium underline text-center mb-3"
                    >
                      Report a Spam
                    </Link>
                    <div className="flex items-center justify-center">
                      <Share2 className="mr-2 text-gray-700 w-4 h-4" />
                      <span className="mr-2 text-gray-700">Share ad</span>
                      <Link 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(`Check out this escort ad: ${listing.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="mx-1 bg-black rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <X className="text-white w-4 h-4" />
                      </Link>
                      <Link 
                        href={`https://wa.me/?text=${encodeURIComponent(`Check out this escort ad: ${listing.title} ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-1 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <WhatsAppIcon className="text-white w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Similar Ads */}
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4">Similar Ads</h2>
                <div className="space-y-4">
                  {sampleAds.slice(0, 3).map((ad) => (
                    <Link href={`/ad/${ad.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}/?=${ad.id}`} key={ad.id} className="block">
                      <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition">
                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src="/confident-professional.png"
                            alt={ad.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800 truncate">{ad.title}</h3>
                          <p className="text-xs text-gray-500">{ad.location.city}, {ad.location.state}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Fixed Contact Buttons */}
        {showMobileButtons && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg flex items-center justify-between z-40 md:hidden">
            <Link
              href={`tel:${contactInfo.phone}`}
              className="flex-1 bg-primary text-white text-center font-semibold py-3 px-2 rounded-md mr-2"
            >
              <PhoneIcon className="inline-block mr-1 h-4 w-4" /> {contactInfo.formattedPhone}
            </Link>
            <Link
              href={`https://wa.me/${contactInfo.whatsapp}`}
              className="w-12 h-12 bg-[#25D366] text-white flex items-center justify-center rounded-md mr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </Link>
            <Link
              href={`mailto:${contactInfo.email}`}
              className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 text-white flex items-center justify-center rounded-md"
            >
              <EmailIcon className="h-5 w-5" />
            </Link>
          </div>
        )}
        
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  );
}
