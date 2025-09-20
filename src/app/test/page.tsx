export default function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>✅ CareVacay Test Page</h1>
      <p>If you can see this, the routing is working!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}
