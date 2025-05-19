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
import { fetchAdById, Ad } from "@/lib/ad-utils"
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
  const [listing, setListing] = useState<Ad | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extract the ad ID from the query parameter
  const adIdParam = searchParams.toString();
  const adId = adIdParam.split('=')[1]; // Extract the ID after the '=' character
  
  useEffect(() => {
    if (!adId) {
      router.push("/404");
      return;
    }

    const fetchAd = async () => {
      try {
        const ad = await fetchAdById(adId);
        
        if (!ad) {
          console.error(`No ad found with ID: ${adId}`);
          router.push("/404");
          return;
        }
        
        console.log('Fetched ad details:', ad);
        setListing(ad);
      } catch (error) {
        console.error('Error fetching ad details:', error);
        router.push("/404");
      }
    };
    
    fetchAd();
  }, [adId, router]);
  
  // Use photos from the ad fetched from Firebase
  const galleryImages = listing && listing.photos ? 
    listing.photos.map(photo => ({
      src: photo,
      alt: listing.title || "Ad Image",
      width: 200
    })) : [
    // Fallback images if no photos are available
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
  const stateSlug = listing?.state ? listing.state.toLowerCase().replace(/\s+/g, '-') : '';
  const citySlug = listing?.city ? listing.city.toLowerCase().replace(/\s+/g, '-') : '';

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
                <Link href={getStateUrl(stateSlug)} className="text-gray-600 hover:text-primary">
                  {listing?.state} Escorts
                </Link>
              </div>
              
              {/* Second line on mobile */}
              <div className="flex items-center w-full sm:w-auto">
                <span className="breadcrumb-divider mx-2 text-gray-600 hidden sm:inline">/</span>
                <Link 
                  href={getCityUrl(stateSlug, citySlug)} 
                  className="text-accent-blue font-medium hover:text-primary"
                >
                  {listing?.city} Escorts
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
                      <div className="text-gray-700">
                        {Array.isArray(listing?.ethnicity) ? (
                          listing.ethnicity.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        ) : (
                          listing?.ethnicity || 'Not specified'
                        )}
                      </div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <Globe className="text-black mr-2 h-4 w-4" /> Nationality
                      </div>
                      <div className="text-gray-700">
                        {Array.isArray(listing?.nationality) ? (
                          listing.nationality.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        ) : (
                          listing?.nationality || 'Not specified'
                        )}
                      </div>
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
                      <div className="text-gray-700">
                        {Array.isArray(listing?.breastType) ? (
                          listing.breastType.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        ) : (
                          listing?.breastType || 'Not specified'
                        )}
                      </div>
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
                      <div className="text-gray-700">
                        {Array.isArray(listing?.hairColor) ? (
                          listing.hairColor.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        ) : (
                          listing?.hairColor || 'Not specified'
                        )}
                      </div>
                    </div>
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center text-black font-bold mb-1">
                        <Ruler className="text-black mr-2 h-4 w-4" /> Body Type
                      </div>
                      <div className="text-gray-700">
                        {Array.isArray(listing?.bodyType) ? (
                          listing.bodyType.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        ) : (
                          listing?.bodyType || 'Not specified'
                        )}
                      </div>
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
                    {listing?.services && listing.services.length > 0 ? (
                      listing.services.map((service: string, index: number) => (
                        <span key={index} className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                          {service}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No services listed</span>
                    )}
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
                    {listing?.placeOfService && listing.placeOfService.length > 0 ? (
                      listing.placeOfService.map((place: string, index: number) => (
                        <span key={index} className="border border-black text-black px-4 py-2 rounded-md text-sm mr-2 mb-2 font-bold">
                          {place}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No place of service specified</span>
                    )}
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
                      {listing?.city || 'Unknown City'}
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
                      {/* Display actual incall and outcall rates from the ad data */}
                      {listing?.incallRates && Object.keys(listing.incallRates).length > 0 ? (
                        (() => {
                          // Sort the rates to ensure 0.5 hour is at the top
                          const sortedRates = Object.entries(listing.incallRates).sort((a, b) => {
                            // Special case for 0.5 hour - always put it first
                            if (a[0].includes('0.5') || a[0].includes('30 min')) return -1;
                            if (b[0].includes('0.5') || b[0].includes('30 min')) return 1;
                            
                            // Extract numeric values for sorting
                            const aNum = parseFloat(a[0]);
                            const bNum = parseFloat(b[0]);
                            return aNum - bNum;
                          });
                          
                          return sortedRates.map(([duration, rate], index) => {
                            const outcallRate = listing.outcallRates && listing.outcallRates[duration];
                            
                            // Format the duration to ensure it includes "hour" or "hours"
                            let formattedDuration = duration;
                            if (duration.includes('0.5') || duration.includes('30 min')) {
                              formattedDuration = '0.5 hour';
                            } else if (duration.toLowerCase().includes('overnight') || duration.toLowerCase().includes('night')) {
                              formattedDuration = 'Overnight';
                            } else if (!duration.toLowerCase().includes('hour')) {
                              // Parse the duration to determine if it's 1 hour or multiple hours
                              const durationNum = parseFloat(duration);
                              if (durationNum === 1) {
                                formattedDuration = `${duration} hour`;
                              } else {
                                formattedDuration = `${duration} hours`;
                              }
                            }
                            
                            // Format rates to include USD
                            const formattedIncallRate = !rate.includes('USD') ? `${rate} USD` : rate;
                            const formattedOutcallRate = outcallRate && !outcallRate.includes('USD') ? `${outcallRate} USD` : outcallRate;
                            
                            return (
                              <div key={index} className="grid grid-cols-3 text-center border-b border-black">
                                <div className="p-2 text-blue-600 font-medium">{formattedDuration}</div>
                                <div className="p-2">
                                  {formattedIncallRate && formattedIncallRate.trim() !== 'USD' ? formattedIncallRate : (
                                    <div className="flex items-center justify-center">
                                      <X className="h-4 w-4 text-red-500" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-2">
                                  {formattedOutcallRate && formattedOutcallRate.trim() !== 'USD' ? formattedOutcallRate : (
                                    <div className="flex items-center justify-center">
                                      <X className="h-4 w-4 text-red-500" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          });
                        })()
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No rate information available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Contact Information - Only visible on mobile */}
                <div id="contact-info-section-mobile" className="mt-5 border-t border-gray-100 pt-4 md:hidden">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    {listing?.phone ? (
                      <Link
                        href={`tel:${listing.phone}`}
                        className="block w-full bg-primary text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-primary-light transition"
                      >
                        <PhoneIcon className="inline-block mr-2 h-4 w-4" /> {listing.phone}
                      </Link>
                    ) : (
                      <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                        <PhoneIcon className="inline-block mr-2 h-4 w-4" /> No phone provided
                      </div>
                    )}
                    {listing?.whatsapp && listing?.phone ? (
                      <Link
                        href={`https://wa.me/${listing.phone}`}
                        className="block w-full bg-[#25D366] text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp
                      </Link>
                    ) : (
                      <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                        <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp not available
                      </div>
                    )}
                    {listing?.email ? (
                      <Link
                        href={`mailto:${listing.email}`}
                        className="block w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:from-amber-600 hover:to-yellow-600 transition"
                      >
                        <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Email
                      </Link>
                    ) : (
                      <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                        <EmailIcon className="inline-block mr-2 h-4 w-4" /> No email provided
                      </div>
                    )}
                    {listing?.phone && (listing?.sms || listing?.smsEnabled) ? (
                      <Link
                        href={`sms:${listing.phone}`}
                        className="block w-full bg-red-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-red-600 transition"
                      >
                        <MessageSquare className="inline-block mr-2 h-4 w-4" /> Send SMS
                      </Link>
                    ) : (
                      <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                        <MessageSquare className="inline-block mr-2 h-4 w-4" /> SMS not available
                      </div>
                    )}
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
                  {listing?.phone ? (
                    <Link
                      href={`tel:${listing.phone}`}
                      className="block w-full bg-primary text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-primary-light transition"
                    >
                      <PhoneIcon className="inline-block mr-2 h-4 w-4" /> {listing.phone}
                    </Link>
                  ) : (
                    <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                      <PhoneIcon className="inline-block mr-2 h-4 w-4" /> No phone provided
                    </div>
                  )}
                  {listing?.whatsapp ? (
                    <Link
                      href={`https://wa.me/${listing.phone}`}
                      className="block w-full bg-[#25D366] text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-green-600 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp
                    </Link>
                  ) : (
                    <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                      <WhatsAppIcon className="inline-block mr-2 h-4 w-4" /> WhatsApp not available
                    </div>
                  )}
                  {listing?.email ? (
                    <Link
                      href={`mailto:${listing.email}`}
                      className="block w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:from-amber-600 hover:to-yellow-600 transition"
                    >
                      <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Email
                    </Link>
                  ) : (
                    <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                      <EmailIcon className="inline-block mr-2 h-4 w-4" /> No email provided
                    </div>
                  )}
                  {listing?.phone && (listing?.sms || listing?.smsEnabled) ? (
                    <Link
                      href={`sms:${listing.phone}`}
                      className="block w-full bg-red-500 text-white text-center font-semibold py-3 px-4 rounded-md hover:bg-red-600 transition"
                    >
                      <MessageSquare className="inline-block mr-2 h-4 w-4" /> Send SMS
                    </Link>
                  ) : (
                    <div className="block w-full bg-gray-200 text-gray-500 text-center font-semibold py-3 px-4 rounded-md">
                      <MessageSquare className="inline-block mr-2 h-4 w-4" /> SMS not available
                    </div>
                  )}
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
                  {listing && listing.state ? (
                    <div className="text-center py-2 text-gray-500 text-sm">
                      Loading similar ads...
                    </div>
                  ) : (
                    <div className="text-center py-2 text-gray-500 text-sm">
                      No similar ads found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Fixed Contact Buttons */}
        {showMobileButtons && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg flex items-center justify-between z-40 md:hidden">
            {listing?.phone ? (
              <Link
                href={`tel:${listing.phone}`}
                className="w-24 bg-primary text-white text-center font-semibold py-2 px-2 rounded-md mr-2 flex flex-col items-center justify-center"
              >
                <PhoneIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Call</span>
              </Link>
            ) : (
              <div className="w-24 bg-gray-200 text-gray-500 text-center font-semibold py-2 px-2 rounded-md mr-2 flex flex-col items-center justify-center">
                <PhoneIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">No phone</span>
              </div>
            )}
            {listing?.phone && (listing?.sms || listing?.smsEnabled) ? (
              <Link
                href={`sms:${listing.phone}`}
                className="w-24 bg-red-500 text-white text-center font-semibold py-2 px-2 rounded-md mr-2 flex flex-col items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">SMS</span>
              </Link>
            ) : (
              <div className="w-24 bg-gray-200 text-gray-500 text-center font-semibold py-2 px-2 rounded-md mr-2 flex flex-col items-center justify-center">
                <MessageSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">SMS</span>
              </div>
            )}
            {listing?.whatsapp && listing?.phone ? (
              <Link
                href={`https://wa.me/${listing.phone}`}
                className="w-24 bg-[#25D366] text-white text-center font-semibold py-2 px-2 rounded-md mr-2 flex flex-col items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">WhatsApp</span>
              </Link>
            ) : (
              <div className="w-24 bg-gray-200 text-gray-500 text-center font-semibold py-2 px-2 rounded-md mr-2 flex flex-col items-center justify-center">
                <WhatsAppIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">WhatsApp</span>
              </div>
            )}
            {listing?.email ? (
              <Link
                href={`mailto:${listing.email}`}
                className="w-24 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center font-semibold py-2 px-2 rounded-md flex flex-col items-center justify-center"
              >
                <EmailIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Email</span>
              </Link>
            ) : (
              <div className="w-24 bg-gray-200 text-gray-500 text-center font-semibold py-2 px-2 rounded-md flex flex-col items-center justify-center">
                <EmailIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Email</span>
              </div>
            )}
          </div>
        )}
        
        <InfoFooter />
        <SiteFooter />
      </div>
    </div>
  );
}
