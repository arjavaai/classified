import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SearchProvider } from "@/components/search/search-context"
import { Suspense } from "react"
import AgeVerificationModal from "@/components/age-verification-modal"
import CookieConsentModal from "@/components/cookie-consent-modal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skluva - Escort Classified Website",
  description: "A modern escort classified directory",
  generator: 'v0.dev',
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SearchProvider>
            <Suspense>{children}</Suspense>
            <AgeVerificationModal />
            <CookieConsentModal />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
