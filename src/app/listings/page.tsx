// src/app/listings/page.tsx
type Listing = {
    id: string;
    title: string;
    type: "Respite" | "SIL" | "SDA" | "MTA";
    pricePerNight: number;
    location: string;
  };
  
  const demo: Listing[] = [
    { id: "1", title: "Sunny Accessible Apartment", type: "SDA", pricePerNight: 180, location: "Sydney, NSW" },
    { id: "2", title: "Coastal Respite Cottage", type: "Respite", pricePerNight: 150, location: "Byron Bay, NSW" },
    { id: "3", title: "Supported SIL House", type: "SIL", pricePerNight: 120, location: "Melbourne, VIC" },
  ];
  
  export default function ListingsPage() {
    return (
      <main>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Listings</h1>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {demo.map((l) => (
            <article key={l.id} style={{ border: "1px solid #eee", borderRadius: 10, padding: 16 }}>
              <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>{l.title}</h2>
              <p style={{ margin: 0 }}>{l.location}</p>
              <p style={{ margin: 0 }}>Type: <b>{l.type}</b></p>
              <p style={{ margin: "8px 0 12px" }}>${l.pricePerNight}/night</p>
              <a href={`/listings/${l.id}`} style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textDecoration: "none"
              }}>
                View
              </a>
            </article>
          ))}
        </div>
      </main>
    );
  }
  