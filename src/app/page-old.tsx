export default function Home() {
  return (
    <main className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            CareVacay - NDIS Accommodation Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and book accessible accommodation for NDIS participants
          </p>
          <div className="space-y-4">
            <a 
              href="/listings"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Find Stays
            </a>
            <br />
            <a 
              href="/provider/onboarding"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors"
            >
              Become a Host
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}