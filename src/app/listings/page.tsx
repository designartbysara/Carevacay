// src/app/listings/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { searchProperties } from '@/data/mockData';
import { StayType, SearchFilters } from '@/types';

export default function ListingsPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    stayType: [],
    maxPrice: undefined,
    minPrice: undefined,
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    accessibilityFeatures: [],
    amenities: [],
  });

  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'rating'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = searchProperties(filters);
    
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
        // For now, just sort by price as we don't have ratings yet
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
      location: '',
      stayType: [],
      maxPrice: undefined,
      minPrice: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: 1,
      accessibilityFeatures: [],
      amenities: [],
    });
  };

  const handleAccessibilityFeatureChange = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      accessibilityFeatures: prev.accessibilityFeatures?.includes(feature)
        ? prev.accessibilityFeatures.filter(f => f !== feature)
        : [...(prev.accessibilityFeatures || []), feature]
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-2">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg text-gray-600">
            Discover accessible accommodation options for NDIS participants
          </p>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location */}
              <div>
                <label htmlFor="search-location" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="text-accent-400 mr-2">📍</span>
                    Where
                  </span>
                </label>
                <input
                  type="text"
                  id="search-location"
                  value={filters.location || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Melbourne, VIC"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>

              {/* Check-in */}
              <div>
                <label htmlFor="search-checkin" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="text-accent-400 mr-2">📅</span>
                    Check-in
                  </span>
                </label>
                <input
                  type="date"
                  id="search-checkin"
                  value={filters.checkIn ? new Date(filters.checkIn).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    checkIn: e.target.value ? new Date(e.target.value) : undefined 
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>

              {/* Check-out */}
              <div>
                <label htmlFor="search-checkout" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="text-accent-400 mr-2">📅</span>
                    Check-out
                  </span>
                </label>
                <input
                  type="date"
                  id="search-checkout"
                  value={filters.checkOut ? new Date(filters.checkOut).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    checkOut: e.target.value ? new Date(e.target.value) : undefined 
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="search-guests" className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="text-accent-400 mr-2">👥</span>
                    Guests
                  </span>
                </label>
                <select
                  id="search-guests"
                  value={filters.guests || 1}
                  onChange={(e) => setFilters(prev => ({ ...prev, guests: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {/* Search logic will be handled by the filters state */}}
                  className="w-full bg-gradient-to-r from-accent-400 to-accent-500 text-white px-6 py-3 rounded-xl hover:from-accent-500 hover:to-accent-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-2">🔍</span>
                    Search
                  </span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                <span className="mr-2">⚙️</span>
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                <span className="ml-2 transform transition-transform duration-200">
                  {showAdvancedFilters ? '▲' : '▼'}
                </span>
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredProperties.length} properties found
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stay Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
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

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range (per night)
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="minPrice" className="block text-xs text-gray-500 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        id="minPrice"
                        value={filters.minPrice || ''}
                        onChange={(e) => setFilters(prev => ({ 
                          ...prev, 
                          minPrice: e.target.value ? Number(e.target.value) : undefined 
                        }))}
                        placeholder="$0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="maxPrice" className="block text-xs text-gray-500 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        id="maxPrice"
                        value={filters.maxPrice || ''}
                        onChange={(e) => setFilters(prev => ({ 
                          ...prev, 
                          maxPrice: e.target.value ? Number(e.target.value) : undefined 
                        }))}
                        placeholder="$500"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Accessibility Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Accessibility Features
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {[
                      'Wheelchair accessible',
                      'Wide doorways (900mm+)',
                      'Grab rails in bathroom',
                      'Roll-in shower',
                      'Accessible kitchen',
                      'Emergency call system',
                      'Ramp access',
                      'Elevator access',
                      'Accessible parking',
                      'Support staff on-site'
                    ].map((feature) => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.accessibilityFeatures?.includes(feature) || false}
                          onChange={() => handleAccessibilityFeatureChange(feature)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {[
                      'WiFi',
                      'Air conditioning',
                      'Heating',
                      'Kitchen',
                      'Laundry',
                      'Parking',
                      'Garden',
                      'Pool',
                      'Gym',
                      'Pet friendly'
                    ].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities?.includes(amenity) || false}
                          onChange={() => handleAmenityChange(amenity)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Quick Filters Sidebar */}
          <aside className="lg:w-80 bg-white rounded-xl shadow-soft p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg text-gray-900">Quick Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all
              </button>
            </div>

            {/* Active Filters */}
            {(filters.stayType?.length || 0) > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.stayType?.map((type) => (
                    <span key={type} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {type}
                      <button
                        onClick={() => handleStayTypeChange(type)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {filters.accessibilityFeatures?.map((feature) => (
                    <span key={feature} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                      {feature}
                      <button
                        onClick={() => handleAccessibilityFeatureChange(feature)}
                        className="ml-2 text-secondary-600 hover:text-secondary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div className="mb-6">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high' | 'newest' | 'rating')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Search Results</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Properties found</span>
                  <span className="font-medium text-gray-900">{filteredProperties.length}</span>
                </div>
                {filters.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{filters.location}</span>
                  </div>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price range</span>
                    <span className="font-medium text-gray-900">
                      ${filters.minPrice || 0} - ${filters.maxPrice || '∞'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Map View */}
            {viewMode === 'map' && (
              <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Map View</h3>
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600">Map integration coming soon</p>
                    <p className="text-sm text-gray-500">Interactive map with property locations</p>
                  </div>
                </div>
              </div>
            )}

            {/* Properties Grid/List */}
            {viewMode !== 'map' && (
              <>
                {filteredProperties.length > 0 ? (
                  <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'}>
                    {filteredProperties.map((property) => (
                  <article key={property.id} className={`bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`${viewMode === 'list' ? 'w-80 h-48' : 'h-48'} bg-gray-200 flex items-center justify-center flex-shrink-0`}>
                      <span className="text-gray-500">Property Image</span>
                    </div>
                    
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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
                      
                      {/* Accessibility Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {property.accessibilityFeatures.slice(0, viewMode === 'list' ? 5 : 3).map((feature) => (
                            <span key={feature} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {property.accessibilityFeatures.length > (viewMode === 'list' ? 5 : 3) && (
                            <span className="text-xs text-gray-500">
                              +{property.accessibilityFeatures.length - (viewMode === 'list' ? 5 : 3)} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Property Details */}
                      <div className={`flex items-center justify-between mb-4 ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>👥 {property.maxGuests}</span>
                          <span>🛏️ {property.bedrooms}</span>
                          <span>🚿 {property.bathrooms}</span>
                        </div>
                        <div className={`text-right ${viewMode === 'list' ? 'mt-0' : 'mt-2 sm:mt-0'}`}>
                          <div className="font-semibold text-lg text-gray-900">
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
                      
                      {/* NDIS Specific Info */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">NDIS Approved</span>
                          <span className="text-green-600 font-medium">✓ Verified</span>
                        </div>
                        {property.supportWorkerRequired && (
                          <div className="text-xs text-gray-500 mt-1">
                            Support worker {property.supportWorkerProvided ? 'provided' : 'required'}
                          </div>
                        )}
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
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🏠</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters to see more results
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-accent-400 text-white px-6 py-2 rounded-lg hover:bg-accent-500 transition-colors font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
            
            {viewMode === 'map' && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🗺️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Map View</h3>
                <p className="text-gray-600">Map view coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
  