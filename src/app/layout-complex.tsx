// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import CareVacayLogo from "@/components/CareVacayLogo";
import AppProviders from "@/components/AppProviders";
import HeaderNavigation from "@/components/HeaderNavigation";

export const metadata: Metadata = {
  title: "CareVacay - NDIS Accommodation Platform",
  description: "Find and book accessible accommodation for NDIS participants. STA, SIL, Respite, and supported stays with verified hosts.",
  keywords: "NDIS, accommodation, STA, SIL, respite, disability, accessible, supported living",
  authors: [{ name: "CareVacay Team" }],
  icons: {
    icon: '/carevacay-favicon.svg',
    shortcut: '/carevacay-favicon.svg',
    apple: '/carevacay-favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <AppProviders>
        <HeaderNavigation />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="mb-4">
                    <CareVacayLogo size="sm" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    Connecting NDIS participants with accessible accommodation options.
                  </p>
                </div>
              <div>
                <h4 className="font-semibold mb-4">For Participants</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/listings" className="hover:text-white transition-colors">Find Accommodation</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>
                  <div>
                    <h4 className="font-semibold mb-4">For Hosts</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li><Link href="/dashboard" className="hover:text-white transition-colors">Host Dashboard</Link></li>
                      <li><Link href="/provider/onboarding" className="hover:text-white transition-colors">Become a Host</Link></li>
                      <li><Link href="/host/help" className="hover:text-white transition-colors">Host Resources</Link></li>
                    </ul>
                  </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 Carevacay. All rights reserved. NDIS Provider Registration: 4050000000</p>
            </div>
          </div>
        </footer>
          </AppProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
