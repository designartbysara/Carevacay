// src/app/provider/onboarding/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProviderOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    abn: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    postcode: '',
    ndisProviderNumber: '',
    insuranceDetails: '',
    qualifications: '',
    experience: '',
    propertyType: '',
    accessibilityFeatures: [] as string[],
    supportServices: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the backend
    console.log('Provider onboarding submitted:', formData);
    alert('Onboarding submitted successfully! (This is a demo)');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Provider Onboarding</h1>
              <p className="text-gray-600">Join CareVacay as a verified accommodation provider</p>
            </div>
            <Link
              href="/"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 ${currentStep > step ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Business Information' :
                currentStep === 2 ? 'NDIS Registration' :
                currentStep === 3 ? 'Property Details' :
                'Review & Submit'
              }
            </p>
          </div>
        </div>

        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-soft p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="abn" className="block text-sm font-medium text-gray-700 mb-2">
                    ABN *
                  </label>
                  <input
                    type="text"
                    id="abn"
                    value={formData.abn}
                    onChange={(e) => handleInputChange('abn', e.target.value)}
                    placeholder="12345678901"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="VIC">Victoria</option>
                    <option value="NSW">New South Wales</option>
                    <option value="QLD">Queensland</option>
                    <option value="WA">Western Australia</option>
                    <option value="SA">South Australia</option>
                    <option value="TAS">Tasmania</option>
                    <option value="ACT">Australian Capital Territory</option>
                    <option value="NT">Northern Territory</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode *
                </label>
                <input
                  type="text"
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: NDIS Registration */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-soft p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">NDIS Registration & Qualifications</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="ndisProviderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  NDIS Provider Number *
                </label>
                <input
                  type="text"
                  id="ndisProviderNumber"
                  value={formData.ndisProviderNumber}
                  onChange={(e) => handleInputChange('ndisProviderNumber', e.target.value)}
                  placeholder="4050000000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Your NDIS provider registration number</p>
              </div>

              <div>
                <label htmlFor="insuranceDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Details *
                </label>
                <textarea
                  id="insuranceDetails"
                  value={formData.insuranceDetails}
                  onChange={(e) => handleInputChange('insuranceDetails', e.target.value)}
                  rows={3}
                  placeholder="Please provide details of your public liability and professional indemnity insurance"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Qualifications *
                </label>
                <textarea
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  rows={3}
                  placeholder="List your relevant qualifications and certifications"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience with NDIS Participants *
                </label>
                <textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={3}
                  placeholder="Describe your experience working with NDIS participants"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Property Details */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl shadow-soft p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Property & Service Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['House', 'Apartment', 'Unit', 'Townhouse', 'Granny Flat', 'Other'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="propertyType"
                        value={type}
                        checked={formData.propertyType === type}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Accessibility Features *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        checked={formData.accessibilityFeatures.includes(feature)}
                        onChange={() => handleCheckboxChange('accessibilityFeatures', feature)}
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Support Services Provided *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'Personal care assistance',
                    'Medication management',
                    'Meal preparation',
                    'Transportation',
                    '24/7 support',
                    'Recreation activities',
                    'Community access',
                    'Life skills training',
                    'Behavioral support',
                    'Respite care'
                  ].map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.supportServices.includes(service)}
                        onChange={() => handleCheckboxChange('supportServices', service)}
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="bg-white rounded-xl shadow-soft p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Information</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Business Information</h3>
                <p><strong>Business Name:</strong> {formData.businessName}</p>
                <p><strong>ABN:</strong> {formData.abn}</p>
                <p><strong>Contact:</strong> {formData.contactName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Address:</strong> {formData.address}, {formData.state} {formData.postcode}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">NDIS Registration</h3>
                <p><strong>Provider Number:</strong> {formData.ndisProviderNumber}</p>
                <p><strong>Insurance:</strong> {formData.insuranceDetails}</p>
                <p><strong>Qualifications:</strong> {formData.qualifications}</p>
                <p><strong>Experience:</strong> {formData.experience}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Property Details</h3>
                <p><strong>Property Type:</strong> {formData.propertyType}</p>
                <p><strong>Accessibility Features:</strong> {formData.accessibilityFeatures.join(', ')}</p>
                <p><strong>Support Services:</strong> {formData.supportServices.join(', ')}</p>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-700 mb-2">Next Steps</h3>
                <p className="text-primary-700 text-sm">
                  After submission, our team will review your application and verify your NDIS registration. 
                  You&apos;ll receive an email confirmation within 2-3 business days with next steps for listing your properties.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-accent-400 text-white rounded-lg hover:bg-accent-500 transition-colors"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
