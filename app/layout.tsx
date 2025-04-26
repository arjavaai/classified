import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SearchProvider } from "@/components/search/search-context"
import { Suspense } from "react"
import AgeVerificationModal from "@/components/age-verification-modal"
import CookieConsentModal from "@/components/cookie-consent-modal"
import { AuthProvider } from "@/lib/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skluva - Escort Classified Website",
  description: "A modern escort classified directory with verified escorts and companions",
  generator: 'Next.js',
  applicationName: 'Skluva',
  keywords: ['escort', 'classified', 'directory', 'companions'],
  authors: [{ name: 'Skluva Team' }],
  creator: 'Skluva',
  publisher: 'Skluva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://skluva.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Skluva - Escort Classified Website',
    description: 'A modern escort classified directory with verified escorts and companions',
    url: 'https://skluva.com',
    siteName: 'Skluva',
    locale: 'en_US',
    type: 'website',
    images: '/og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skluva - Escort Classified Website',
    description: 'A modern escort classified directory with verified escorts and companions',
    images: '/twitter-image.jpg',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <SearchProvider>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                {children}
              </Suspense>
              <AgeVerificationModal />
              <CookieConsentModal />
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
