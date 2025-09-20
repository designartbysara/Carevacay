export default function HomeSimple() {
  return (
    <html>
      <head>
        <title>CareVacay - NDIS Accommodation Platform</title>
        <meta name="description" content="Find and book accessible accommodation for NDIS participants" />
      </head>
      <body>
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ color: '#154734', fontSize: '2rem', marginBottom: '1rem' }}>
            🏠 CareVacay
          </h1>
          <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '1rem' }}>
            NDIS Accommodation Platform
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Find and book accessible accommodation for NDIS participants
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/listings" style={{ 
              background: '#154734', 
              color: 'white', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              Find Stays
            </a>
            <a href="/about" style={{ 
              background: 'white', 
              color: '#154734', 
              padding: '12px 24px', 
              textDecoration: 'none', 
              borderRadius: '8px',
              border: '2px solid #154734',
              fontWeight: 'bold'
            }}>
              Learn More
            </a>
          </div>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#999' }}>
            <p>✅ This page is working!</p>
            <p>Timestamp: {new Date().toISOString()}</p>
          </div>
        </div>
      </body>
    </html>
  );
}
