// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-3xl">🏠</span>
              </div>
            </div>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              Trusted by 1000+ NDIS participants
            </div>
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
              Find Your Perfect
              <span className="text-green-600 block">
                NDIS Accommodation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Connect with verified hosts offering accessible STA, SIL, Respite, and supported stays. 
              <span className="font-semibold text-gray-800">Designed specifically for NDIS participants and their families.</span>
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto mb-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-orange-500 mr-2">📍</span>
                      Where are you going?
                    </span>
                  </label>
                  <select 
                    id="location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option>Melbourne</option>
                    <option>Brisbane</option>
                    <option>Sunshine Coast</option>
                  </select>
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="checkin" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-orange-500 mr-2">📅</span>
                      Check-in
                    </span>
                  </label>
                  <input 
                    type="date" 
                    id="checkin"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="checkout" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-orange-500 mr-2">📅</span>
                      Check-out
                    </span>
                  </label>
                  <input 
                    type="date" 
                    id="checkout"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-3">
                    <span className="flex items-center">
                      <span className="text-orange-500 mr-2">👥</span>
                      Guests
                    </span>
                  </label>
                  <select 
                    id="guests"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  href="/listings"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="mr-2">🔍</span>
                  Search Accommodation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-gray-600 font-medium">Properties Available</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">1000+</div>
              <div className="text-gray-600 font-medium">Happy Participants</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-gray-600 font-medium">Verified Hosts</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NDIS Accommodation Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a range of supported accommodation options designed specifically for NDIS participants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* STA */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Short Term Accommodation (STA)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Temporary stays for respite, holidays, or transitional periods with full support services
              </p>
              <Link 
                href="/listings?type=STA"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Find STA Properties →
              </Link>
            </div>

            {/* SIL */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏘️</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Supported Independent Living (SIL)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Long-term accommodation with ongoing support for independent living skills
              </p>
              <Link 
                href="/listings?type=SIL"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Find SIL Properties →
              </Link>
            </div>

            {/* Respite */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Respite Care</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Short-term breaks for participants and their families with professional care support
              </p>
              <Link 
                href="/listings?type=Respite"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Find Respite Properties →
              </Link>
            </div>

            {/* SDA */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">♿</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Specialist Disability Accommodation (SDA)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Purpose-built accessible housing with specialized features and modifications
              </p>
              <Link 
                href="/listings?type=SDA"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Find SDA Properties →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Cities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find accessible accommodation across Australia&apos;s major cities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Melbourne */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Explore Melbourne →
              </Link>
            </div>

            {/* Brisbane */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌞</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Brisbane</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Enjoy Brisbane&apos;s subtropical climate with mild winters and warm summers
              </p>
              <div className="text-sm text-gray-500 mb-4">
                12+ properties available
              </div>
              <Link
                href="/listings?location=Brisbane"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Explore Brisbane →
              </Link>
            </div>

            {/* Sunshine Coast */}
            <div className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏖️</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Sunshine Coast</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Relax in beautiful coastal settings with accessible beachfront accommodation
              </p>
              <div className="text-sm text-gray-500 mb-4">
                8+ properties available
              </div>
              <Link
                href="/listings?location=Sunshine Coast"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium group-hover:translate-x-1 transition-transform"
              >
                Explore Sunshine Coast →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of NDIS participants who have found their ideal accommodation through CareVacay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/listings"
              className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🔍</span>
              Start Searching
            </Link>
            <Link 
              href="/provider/onboarding"
              className="inline-flex items-center bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-green-600 transition-colors"
            >
              <span className="mr-2">🏠</span>
              Become a Host
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}