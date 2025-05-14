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
import { getStateUrl, getCityUrl } from "@/lib/route-utils"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Thumbs, FreeMode } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/free-mode"
import "./styles.css"
import { Ad } from "@/lib/ads-data"

type AdDetailProps = {
  ad: Ad | null;
  similarAds: Ad[];
}

export default function AdDetail({ ad, similarAds }: AdDetailProps) {
  const [showMobileButtons, setShowMobileButtons] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const lastScrollY = useRef(0);
  
  // If no ad is found, show a placeholder
  const adData = ad || {
    id: "not-found",
    title: "Ad Not Found",
    description: "The ad you're looking for doesn't exist or has been removed.",
    images: ["/placeholder-image.jpg"],
    location: { 
      state: "Unknown", 
      city: "Unknown",
      stateAbbreviation: "UN"
    },
    price: 0,
    age: 0,
    bodyType: "N/A",
    nationality: "N/A",
    ethnicity: "N/A",
    breastType: "N/A",
    hairColor: "N/A",
    image: "/placeholder-image.jpg",
    photoCount: 1,
    isTop: false,
    isVerified: false,
    postedDaysAgo: 0,
    viewCount: 0,
    languages: [],
    services: [],
    catersTo: [],
    placeOfService: [],
    contactInfo: { email: "", phone: "", whatsapp: "" }
  };
  
  // Handle scroll to hide/show mobile buttons
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current + 10) {
        setShowMobileButtons(false);
        lastScrollY.current = currentScrollY;
      } else if (currentScrollY < lastScrollY.current - 10) {
        setShowMobileButtons(true);
        lastScrollY.current = currentScrollY;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Prevent body scroll when fullscreen gallery is active
  useEffect(() => {
    if (fullscreenActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreenActive]);
  
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.activeIndex);
  };
  
  const toggleFullscreen = () => {
    setFullscreenActive(!fullscreenActive);
  };
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <div className="bg-white">
      {/* Full-width header */}
      <div className="w-full bg-white">
        <Header />
      </div>
      
      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="breadcrumb text-sm flex items-center overflow-x-auto whitespace-nowrap">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link 
              href={getStateUrl(adData.location.state)} 
              className="text-gray-600 hover:text-primary"
            >
              {adData.location.state}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link 
              href={getCityUrl(adData.location.state, adData.location.city)} 
              className="text-gray-600 hover:text-primary"
            >
              {adData.location.city}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">
              {adData.title}
            </span>
          </div>
          
          <Link 
            href={getCityUrl(adData.location.state, adData.location.city)}
            className="flex items-center text-gray-600 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
        
        {/* Ad Title for Mobile */}
        <h1 className="text-2xl font-bold mb-4 md:hidden">
          {adData.title}
        </h1>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Gallery */}
          <div className="md:col-span-2">
            {/* Main Image Gallery */}
            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-3">
              <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                navigation
                onSlideChange={handleSlideChange}
                className="ad-gallery-main"
              >
                {adData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative pt-[75%]">
                      <Image
                        src={image}
                        alt={`${adData.title} - Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover cursor-pointer"
                        onClick={toggleFullscreen}
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Image count indicator */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {activeSlide + 1} / {adData.images.length}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {adData.images.length > 1 && (
              <div className="relative">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[FreeMode, Navigation, Thumbs]}
                  spaceBetween={8}
                  slidesPerView="auto"
                  freeMode={true}
                  watchSlidesProgress={true}
                  className="ad-gallery-thumbs"
                >
                  {adData.images.map((image, index) => (
                    <SwiperSlide key={index} className="w-[60px] h-[60px]">
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="60px"
                          className={`object-cover rounded-md ${
                            activeSlide === index ? "ring-2 ring-primary" : ""
                          }`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            
            {/* Ad Title for Desktop */}
            <h1 className="text-3xl font-bold mt-6 hidden md:block">
              {adData.title}
            </h1>
            
            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <div className="text-gray-700">
                {showFullDescription || adData.description.length <= 300 ? (
                  <p>{adData.description}</p>
                ) : (
                  <>
                    <p>{adData.description.substring(0, 300)}...</p>
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-primary hover:underline mt-2"
                    >
                      Read more
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Services */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Services</h2>
              <div className="flex flex-wrap gap-2">
                {adData.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Caters To */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Caters to</h2>
              <div className="flex flex-wrap gap-2">
                {adData.catersTo.map((cater, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {cater}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Place of Service */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Place of service</h2>
              <div className="flex flex-wrap gap-2">
                {adData.placeOfService.map((place, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Similar Ads */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Similar Ads</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarAds.map((ad) => (
                  <Link
                    key={ad.id}
                    href={`/ad/${ad.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block group"
                  >
                    <div className="relative pt-[100%] rounded-lg overflow-hidden mb-2">
                      <Image
                        src={ad.images[0]}
                        alt={ad.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium truncate">{ad.title}</h3>
                    <p className="text-xs text-gray-500">{ad.location.city}, {ad.location.state}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Details and Contact */}
          <div>
            {/* Personal Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{adData.age}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Body Type</p>
                    <p className="font-medium">{adData.bodyType}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="font-medium">{adData.nationality}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Languages</p>
                    <p className="font-medium">{Array.isArray(adData.languages) ? adData.languages.join(", ") : "English"}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">
                      {adData.location.city}, {adData.location.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rates Section */}
            {adData.id !== "not-found" && (
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Rates</h2>
                
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  {/* Header Row */}
                  <div className="bg-blue-600 text-white grid grid-cols-3 text-center font-medium">
                    <div className="p-3 border-r border-white/20">Time</div>
                    <div className="p-3 border-r border-white/20">Incall</div>
                    <div className="p-3">Outcall</div>
                  </div>
                  
                  {/* Rate Rows */}
                  <div className="bg-white">
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">0.5 Hour</div>
                      <div className="p-3">150 USD</div>
                      <div className="p-3 flex items-center justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">1 Hour</div>
                      <div className="p-3">200 USD</div>
                      <div className="p-3">250 USD</div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">2 Hours</div>
                      <div className="p-3">400 USD</div>
                      <div className="p-3">500 USD</div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">3 Hours</div>
                      <div className="p-3">600 USD</div>
                      <div className="p-3">750 USD</div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">6 Hours</div>
                      <div className="p-3">1200 USD</div>
                      <div className="p-3">1500 USD</div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">12 Hours</div>
                      <div className="p-3">2400 USD</div>
                      <div className="p-3">3000 USD</div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center border-b border-gray-200">
                      <div className="p-3 text-blue-600 font-medium">24 Hours</div>
                      <div className="p-3">5000 USD</div>
                      <div className="p-3">6000 USD</div>
                    </div>
                    
                    <div className="grid grid-cols-3 text-center">
                      <div className="p-3 text-blue-600 font-medium">48 Hours</div>
                      <div className="p-3">10000 USD</div>
                      <div className="p-3">12000 USD</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                {adData.contactInfo.email && (
                  <a
                    href={`mailto:${adData.contactInfo.email}`}
                    className="flex items-center bg-white rounded-lg p-4 border border-gray-200 hover:border-primary transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      <EmailIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-500">{adData.contactInfo.email}</p>
                    </div>
                  </a>
                )}
                
                {adData.contactInfo.phone && (
                  <a
                    href={`tel:${adData.contactInfo.phone}`}
                    className="flex items-center bg-white rounded-lg p-4 border border-gray-200 hover:border-primary transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                      <PhoneIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-500">{adData.contactInfo.phone}</p>
                    </div>
                  </a>
                )}
                
                {adData.contactInfo.whatsapp && adData.contactInfo.phone && (
                  <a
                    href={`https://wa.me/${adData.contactInfo.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white rounded-lg p-4 border border-gray-200 hover:border-primary transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                      <WhatsAppIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-500">{adData.contactInfo.phone}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
            
            {/* Report and Share */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <a
                  href={`mailto:${contactInfo.supportEmail}?subject=Report Ad: ${adData.title}&body=I would like to report this ad (ID: ${adData.id}) for the following reason:`}
                  className="text-red-500 hover:text-red-600 text-sm flex items-center mb-4 md:mb-0"
                >
                  <span>Report a Spam</span>
                </a>
                
                <div className="flex items-center space-x-4">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.href : ''
                    )}&text=${encodeURIComponent(adData.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </a>
                  
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${adData.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                  
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: adData.title,
                          url: typeof window !== 'undefined' ? window.location.href : '',
                        });
                      }
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Contact Buttons */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between z-10 transition-transform duration-300 ${
          showMobileButtons ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {adData.contactInfo.phone && (
          <a
            href={`tel:${adData.contactInfo.phone}`}
            className="flex-1 bg-green-600 text-white rounded-lg py-3 text-center font-medium mx-1"
          >
            Call Now
          </a>
        )}
        
        {adData.contactInfo.whatsapp && adData.contactInfo.phone && (
          <a
            href={`https://wa.me/${adData.contactInfo.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white rounded-lg py-3 text-center font-medium mx-1"
          >
            WhatsApp
          </a>
        )}
        
        {adData.contactInfo.email && (
          <a
            href={`mailto:${adData.contactInfo.email}`}
            className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-center font-medium mx-1"
          >
            Email
          </a>
        )}
      </div>
      
      {/* Fullscreen Gallery */}
      {fullscreenActive && (
        <div className="fixed inset-0 bg-black z-50 overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleFullscreen}
              className="bg-black/50 text-white p-2 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <Swiper
            modules={[Navigation]}
            navigation
            initialSlide={activeSlide}
            onSlideChange={handleSlideChange}
            className="h-full w-full"
          >
            {adData.images.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`${adData.title} - Image ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <p className="text-sm">
              {activeSlide + 1} / {adData.images.length}
            </p>
          </div>
        </div>
      )}
      
      <InfoFooter />
      <SiteFooter />
    </div>
  );
}
