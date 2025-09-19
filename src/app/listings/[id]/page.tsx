// src/app/listings/[id]/page.tsx
import Link from 'next/link';
import { getPropertyById } from '@/data/mockData';
import ListingDetailClient from './ListingDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/listings"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Back to Listings
          </Link>
        </div>
      </main>
    );
  }

  return <ListingDetailClient property={property} />;
}
