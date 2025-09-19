// src/app/error.tsx
"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ textAlign: "center", marginTop: 50 }}>
      <h1>⚠️ Something went wrong</h1>
      <p>{error?.message ?? "Please try again."}</p>
      <button onClick={() => reset()} style={{ marginTop: 16 }}>Retry</button>
    </main>
  );
}
