// src/app/listings/[id]/page.tsx
type Props = { params: { id: string } };

export default function ListingDetail({ params }: Props) {
  return (
    <main>
      <h1>Listing #{params.id}</h1>
      <p>Coming soon: photos, calendar, booking form.</p>
    </main>
  );
}
