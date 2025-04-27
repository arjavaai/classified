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
  Instagram
} from "lucide-react"
import InfoFooter from "@/components/info-footer"
import SiteFooter from "@/components/site-footer"
import { WhatsAppIcon, EmailIcon, PhoneIcon } from "@/lib/icons"
import { contactInfo } from "@/lib/config"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules"
import { sampleAds } from "@/lib/ads-data"
import { getStateUrl, getCityUrl } from "@/lib/route-utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "./styles.css"

// Custom Header without search bar
function ListingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out successfully");
      toggleMenu();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/skluva_logo.png" 
              alt="Skluva Logo" 
              width={120} 
              height={40} 
              className="h-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" id="menuContainer">
            {/* Desktop Menu (visible on larger screens) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/create-ad"
                className="btn btn-primary"
              >
                Create AD
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/dashboard?tab=overview" 
                    className="flex items-center gap-2 hover:text-primary font-semibold"
                  >
                    <div className="bg-gray-100 p-2 rounded-full">
                      <svg
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <rect width="7" height="7" x="14" y="14" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                      </svg>
                    </div>
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 hover:text-primary font-semibold"
                  >
                    <div className="bg-gray-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn btn-secondary btn-sm">
                    Login
                  </Link>
                  <Link href="/signup" className="btn btn-primary btn-sm">
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle (visible on mobile) */}
            <button onClick={toggleMenu} className="md:hidden text-black" aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>

            {/* Full-screen Menu (for mobile) */}
            {isMenuOpen && (
              <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:hidden">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700" aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="container mx-auto px-6 py-4">
                  {/* Post Your Ad Button */}
                  <Link
                    href="/create-ad"
                    className="block w-full btn btn-primary btn-lg mb-6 text-center"
                  >
                    Create AD
                  </Link>

                  {user ? (
                    /* User Profile Section - Show when logged in */
                    <div className="bg-gray-100 p-6 mb-6 rounded-md">
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
                          <img
                            src="/diverse-professional-profiles.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-xl">{user.email ? user.email.split('@')[0] : 'User'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <Link
                          href="/dashboard?tab=overview"
                          className="flex items-center p-3 bg-white rounded-md hover:bg-gray-50"
                          onClick={toggleMenu}
                        >
                          <svg
                            className="h-5 w-5 text-primary mr-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="7" height="7" x="3" y="3" rx="1" />
                            <rect width="7" height="7" x="14" y="3" rx="1" />
                            <rect width="7" height="7" x="14" y="14" rx="1" />
                            <rect width="7" height="7" x="3" y="14" rx="1" />
                          </svg>
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center p-3 bg-white rounded-md hover:bg-gray-50"
                          onClick={toggleMenu}
                        >
                          <User className="h-5 w-5 text-primary mr-3" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center p-3 bg-white rounded-md hover:bg-gray-50 w-full text-left"
                        >
                          <svg
                            className="h-5 w-5 text-primary mr-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Login/Signup Section - Show when not logged in */
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      <Link
                        href="/login"
                        className="block w-full btn btn-secondary btn-lg text-center"
                        onClick={toggleMenu}
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full btn btn-primary btn-lg text-center"
                        onClick={toggleMenu}
                      >
                        Signup
                      </Link>
                    </div>
                  )}

                  {/* Menu Items */}
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/"
                      className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={toggleMenu}
                    >
                      <svg
                        className="h-5 w-5 text-primary mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Home
                    </Link>
                    <Link
                      href="/us/escorts"
                      className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={toggleMenu}
                    >
                      <svg
                        className="h-5 w-5 text-primary mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Browse Escorts
                    </Link>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex justify-center gap-4 mt-8">
                    <a href="#" className="text-gray-500 hover:text-primary">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary">
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <ListingHeader />
          
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb text-sm mb-4 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Skluva United States
            </Link>
            <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
            <Link href={getStateUrl(listing?.location.stateAbbreviation)} className="text-gray-600 hover:text-primary">
              {listing?.location.state} Escorts
            </Link>
            <span className="breadcrumb-divider mx-2 text-gray-600">/</span>
            <span className="text-accent-blue font-medium">{listing?.location.city} Escorts</span>
          </div>
          
          {/* Back Button */}
          <button 
            onClick={handleBackClick} 
            className="flex items-center text-gray-600 hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to search
          </button>
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
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
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
          </Swiper>
          
          {/* Custom Navigation Arrows */}
          <div className="swiper-button-prev custom-prev">
            <ChevronLeft className="text-white w-6 h-6" />
          </div>
          <div className="swiper-button-next custom-next">
            <ChevronRight className="text-white w-6 h-6" />
          </div>
          
          {/* Blue progress bar */}
          <div className="gallery-progress-bar"></div>
        </div>
      </div>
      
      <div className="bg-gray-100 pt-6">
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
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h3 className="text-lg font-semibold mb-3">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center text-gray-700 font-medium mb-2">
                        <Calendar className="text-primary mr-2 h-4 w-4" /> Age
                      </div>
                      <div className="text-gray-700">{listing.age} years</div>
                    </div>
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center text-gray-700 font-medium mb-2">
                        <Globe className="text-primary mr-2 h-4 w-4" /> Ethnicity
                      </div>
                      <div className="text-gray-700">Asian</div>
                    </div>
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center text-gray-700 font-medium mb-2">
                        <Ruler className="text-primary mr-2 h-4 w-4" /> Body Type
                      </div>
                      <div className="text-gray-700">Petite</div>
                    </div>
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center text-gray-700 font-medium mb-2">
                        <svg 
                          className="text-primary mr-2 h-4 w-4"
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
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center text-gray-700 font-medium mb-2">
                        <svg 
                          className="text-primary mr-2 h-4 w-4"
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
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center text-gray-700 font-medium mb-2">
                        <Ruler className="text-primary mr-2 h-4 w-4" /> Height
                      </div>
                      <div className="text-gray-700">5'7" (170cm)</div>
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h3 className="text-lg font-semibold mb-3">Services</h3>
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
                      Events
                    </span>
                  </div>
                </div>

                {/* Caters To Section */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h3 className="text-lg font-semibold mb-3">Caters To</h3>
                  <div className="flex items-center">
                    <Users className="text-primary mr-2 h-4 w-4" />
                    <div className="text-gray-700">Men, Women, Couples</div>
                  </div>
                </div>

                {/* Place of Service Section */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h3 className="text-lg font-semibold mb-3">Place of Service</h3>
                  <div className="flex flex-wrap">
                    <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                      At home
                    </span>
                    <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                      Events and parties
                    </span>
                    <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                      Hotel / Motel
                    </span>
                    <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                      Clubs
                    </span>
                    <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-md text-sm mr-2 mb-2">
                      Outcall
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center text-gray-700 font-medium mb-2">
                      <MapPin className="text-primary mr-2 h-4 w-4" /> Location
                    </div>
                    <div className="text-gray-700">{listing.location.city} / {listing.location.area}</div>
                  </div>
                </div>
                
                {/* Mobile Contact Information - Only visible on mobile */}
                <div id="contact-info-section-mobile" className="mt-5 border-t border-gray-100 pt-4 md:hidden">
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
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
                      className="block w-full bg-gray-200 text-gray-700 text-center font-semibold py-3 px-4 rounded-md hover:bg-gray-300 transition"
                    >
                      <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Message
                    </Link>
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
                    className="block w-full bg-gray-200 text-gray-700 text-center font-semibold py-3 px-4 rounded-md hover:bg-gray-300 transition"
                  >
                    <EmailIcon className="inline-block mr-2 h-4 w-4" /> Send Message
                  </Link>
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
              className="w-12 h-12 bg-gray-200 text-gray-700 flex items-center justify-center rounded-md"
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
