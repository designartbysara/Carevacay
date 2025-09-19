// src/app/page.tsx
import Link from "next/link";
import { mockProperties } from "@/data/mockData";
import CareVacayLogo from "@/components/CareVacayLogo";

export default function Home() {
  // CareVacay - NDIS Accommodation Platform
  const featuredProperties = mockProperties.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <CareVacayLogo size="lg" />
            </div>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
              Trusted by 1000+ NDIS participants
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
              Find Your Perfect
              <span className="text-primary-500 block">
                NDIS Accommodation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Connect with verified hosts offering accessible STA, SIL, Respite, and supported stays. 
              <span className="font-semibold text-gray-800">Designed specifically for NDIS participants and their families.</span>
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-soft p-8 max-w-5xl mx-auto mb-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-accent-400 mr-2">📍</span>
                      Where are you going?
                    </span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Melbourne, VIC"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-lg"
                    aria-label="Search location"
                  />
                </div>
                <div>
                  <label htmlFor="checkin" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-accent-400 mr-2">📅</span>
                      Check-in
                    </span>
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-lg"
                    aria-label="Check-in date"
                  />
                </div>
                <div>
                  <label htmlFor="checkout" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-accent-400 mr-2">📅</span>
                      Check-out
                    </span>
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-lg"
                    aria-label="Check-out date"
                  />
                </div>
                <div className="flex items-end">
                  <Link
                    href="/listings"
                    className="w-full bg-gradient-to-r from-accent-400 to-accent-500 text-white px-8 py-4 rounded-xl hover:from-accent-500 hover:to-accent-600 transition-all duration-200 font-semibold text-lg text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🔍</span>
                      Search Stays
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                  <span className="text-2xl">🏠</span>
                </div>
                <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Verified Properties</div>
                <div className="text-sm text-gray-500 mt-1">NDIS approved accommodations</div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4 group-hover:bg-secondary-200 transition-colors duration-200">
                  <span className="text-2xl">♿</span>
                </div>
                <div className="text-4xl font-bold text-secondary-400 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Accessible</div>
                <div className="text-sm text-gray-500 mt-1">WCAG 2.1 AA compliant</div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4 group-hover:bg-accent-200 transition-colors duration-200">
                  <span className="text-2xl">🤝</span>
                </div>
                <div className="text-4xl font-bold text-accent-400 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support</div>
                <div className="text-sm text-gray-500 mt-1">Always here to help</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Types Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-50 to-transparent rounded-full translate-y-48 -translate-x-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
              NDIS Accommodation Types
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
              Types of NDIS Accommodation
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We offer a comprehensive range of accommodation options to meet different NDIS support needs and preferences, 
              all designed with accessibility and comfort in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">STA</h3>
              <p className="text-gray-600 leading-relaxed">
                Short Term Accommodation for respite and temporary stays with full accessibility support
              </p>
              <div className="mt-4 text-sm text-primary-500 font-medium">
                Learn more →
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏡</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">SIL</h3>
              <p className="text-gray-600 leading-relaxed">
                Supported Independent Living with ongoing support and community integration
              </p>
              <div className="mt-4 text-sm text-secondary-400 font-medium">
                Learn more →
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Respite</h3>
              <p className="text-gray-600 leading-relaxed">
                Short breaks for participants and their families in comfortable, accessible settings
              </p>
              <div className="mt-4 text-sm text-accent-400 font-medium">
                Learn more →
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">♿</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">SDA</h3>
              <p className="text-gray-600 leading-relaxed">
                Specialist Disability Accommodation with specialized features and equipment
              </p>
              <div className="mt-4 text-sm text-primary-500 font-medium">
                Learn more →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
              Available Cities
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
              Explore Our Cities
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover accessible accommodation options across multiple Australian cities, 
              each with their own unique attractions and NDIS-friendly services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Melbourne */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏙️</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Melbourne</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Australia&apos;s cultural capital with world-class accessibility features and NDIS services
              </p>
              <div className="text-sm text-gray-500 mb-4">
                15+ properties available
              </div>
              <Link
                href="/listings?location=Melbourne"
                className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium group-hover:translate-x-1 transition-transform"
              >
                Explore Melbourne →
              </Link>
            </div>

            {/* Brisbane */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌞</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Brisbane</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vibrant river city with modern accessibility infrastructure and healthcare access
              </p>
              <div className="text-sm text-gray-500 mb-4">
                8+ properties available
              </div>
              <Link
                href="/cities/brisbane"
                className="inline-flex items-center text-secondary-400 hover:text-secondary-500 font-medium group-hover:translate-x-1 transition-transform"
              >
                Explore Brisbane →
              </Link>
            </div>

            {/* Sunshine Coast */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏖️</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Sunshine Coast</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Beautiful beachside location with accessible coastal experiences and respite options
              </p>
              <div className="text-sm text-gray-500 mb-4">
                6+ properties available
              </div>
              <Link
                href="/cities/sunshine-coast"
                className="inline-flex items-center text-accent-400 hover:text-accent-500 font-medium group-hover:translate-x-1 transition-transform"
              >
                Explore Sunshine Coast →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-48 -translate-x-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary-50 to-transparent rounded-full translate-y-48 translate-x-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
              Featured Properties
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover some of our most popular accessible accommodations, carefully selected for their 
              exceptional accessibility features and outstanding host support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className="group bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="text-center text-gray-500 relative z-10">
                    <div className="text-4xl mb-2">🏠</div>
                    <div className="text-sm font-medium">Property Image {index + 1}</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {property.stayType}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ NDIS Approved
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 flex items-center">
                      <span className="text-primary-600 mr-1">📍</span>
                      {property.city}, {property.state}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-sm">★★★★★</span>
                      <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>
                  
                  {/* Accessibility features preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.accessibilityFeatures.slice(0, 2).map((feature) => (
                        <span key={feature} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {property.accessibilityFeatures.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{property.accessibilityFeatures.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="mr-1">👥</span>
                        {property.maxGuests}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">🛏️</span>
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">🚿</span>
                        {property.bathrooms}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-gray-900">
                        ${property.basePrice}
                        <span className="text-sm font-normal text-gray-500">/night</span>
                      </div>
                      {property.cleaningFee && (
                        <div className="text-xs text-gray-500">
                          +${property.cleaningFee} cleaning
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    href={`/listings/${property.id}`}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 text-center block font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/listings"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🔍</span>
              View All Properties
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Join Our Community
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of NDIS participants who have found their ideal accommodation through Carevacay. 
            <span className="font-semibold text-white">Start your journey today.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/listings"
              className="group bg-white text-primary-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🔍</span>
                Start Searching
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href="/provider/onboarding"
              className="group bg-accent-400 text-white px-10 py-4 rounded-xl hover:bg-accent-500 transition-all duration-200 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🏠</span>
                Become a Host
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/80">Happy Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
