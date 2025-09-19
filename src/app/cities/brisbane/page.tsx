'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockProperties } from '@/data/mockData';
import { StayType, SearchFilters } from '@/types';

export default function BrisbanePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'Brisbane',
    stayType: [],
    maxPrice: undefined,
    minPrice: undefined,
  });

  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'rating'>('newest');

  // Filter Brisbane properties
  const brisbaneProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => property.city === 'Brisbane');
    
    // Apply additional filters
    if (filters.stayType && filters.stayType.length > 0) {
      filtered = filtered.filter(property => filters.stayType!.includes(property.stayType));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.basePrice <= filters.maxPrice!);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.basePrice >= filters.minPrice!);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
    }
    
    return filtered;
  }, [filters, sortBy]);

  const handleStayTypeChange = (stayType: StayType) => {
    setFilters(prev => ({
      ...prev,
      stayType: prev.stayType?.includes(stayType)
        ? prev.stayType.filter(type => type !== stayType)
        : [...(prev.stayType || []), stayType]
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: 'Brisbane',
      stayType: [],
      maxPrice: undefined,
      minPrice: undefined,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Accessible Accommodation in Brisbane
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Discover NDIS-approved accommodation options in Brisbane with world-class accessibility features and support services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/listings?location=Brisbane"
                className="bg-accent-400 text-white px-8 py-3 rounded-lg hover:bg-accent-500 transition-colors font-semibold text-lg"
              >
                Browse Properties
              </Link>
              <Link
                href="/provider/onboarding"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* City Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Brisbane for Your Stay?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏙️</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Vibrant City Life</h3>
                    <p className="text-gray-600">Experience Brisbane&apos;s cultural attractions, dining scene, and entertainment options.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">♿</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Accessibility Focus</h3>
                    <p className="text-gray-600">Brisbane is committed to accessibility with modern infrastructure and NDIS-friendly services.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Healthcare Access</h3>
                    <p className="text-gray-600">Close proximity to major hospitals and healthcare facilities for peace of mind.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌞</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Great Weather</h3>
                    <p className="text-gray-600">Enjoy Brisbane&apos;s subtropical climate with mild winters and warm summers.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Brisbane City Map</span>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Available Properties in Brisbane
              </h2>
              <p className="text-gray-600">
                {brisbaneProperties.length} properties found
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Properties</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stay Type
                </label>
                <div className="space-y-2">
                  {(['STA', 'SIL', 'Respite', 'SDA'] as StayType[]).map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.stayType?.includes(type) || false}
                        onChange={() => handleStayTypeChange(type)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      minPrice: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      maxPrice: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Stats
                </label>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Total Properties: {brisbaneProperties.length}</div>
                  <div>Average Price: ${Math.round(brisbaneProperties.reduce((sum, p) => sum + p.basePrice, 0) / brisbaneProperties.length)}</div>
                  <div>NDIS Approved: {brisbaneProperties.filter(p => p.ndisApproved).length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {brisbaneProperties.map((property) => (
              <article key={property.id} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Property Image</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-500 bg-primary-50 px-3 py-1 rounded-full">
                      {property.stayType}
                    </span>
                    <span className="text-sm text-gray-500">{property.city}, {property.state}</span>
                  </div>
                
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👥 {property.maxGuests}</span>
                      <span>🛏️ {property.bedrooms}</span>
                      <span>🚿 {property.bathrooms}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg text-gray-900">
                        ${property.basePrice}
                        <span className="text-sm font-normal text-gray-500">/night</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">NDIS Approved</span>
                      <span className="text-green-600 font-medium">✓ Verified</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/listings/${property.id}`}
                    className="w-full bg-accent-400 text-white py-2 px-4 rounded-lg hover:bg-accent-500 transition-colors text-center block font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Local Services */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Local Services & Amenities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Healthcare</h3>
              <p className="text-sm text-gray-600">Royal Brisbane Hospital, Mater Hospital, and specialized NDIS services</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚌</div>
              <h3 className="font-semibold text-gray-900 mb-2">Transport</h3>
              <p className="text-sm text-gray-600">Accessible public transport, taxi services, and NDIS transport options</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Shopping</h3>
              <p className="text-sm text-gray-600">Queen Street Mall, accessible shopping centers, and local markets</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="font-semibold text-gray-900 mb-2">Entertainment</h3>
              <p className="text-sm text-gray-600">South Bank cultural precinct, accessible venues, and events</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
