export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-24 h-24 relative">
                  <div className="w-full h-full bg-green-600 rounded-2xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-2xl">🏠</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600">CareVacay</div>
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
                <a 
                  href="/listings"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="mr-2">🔍</span>
                  Search Accommodation
                </a>
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
            <a 
              href="/listings"
              className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="mr-2">🔍</span>
              Start Searching
            </a>
            <a 
              href="/provider/onboarding"
              className="inline-flex items-center bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-green-600 transition-colors"
            >
              <span className="mr-2">🏠</span>
              Become a Host
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
