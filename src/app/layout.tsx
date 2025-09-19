// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carevacay",
  description: "Airbnb-style platform for respite, SIL, SDA, MTA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          background: "#fff"
        }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 20 }}>Carevacay</Link>
          <nav style={{ display: "flex", gap: 16 }}>
            <Link href="/">Home</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        <div style={{ padding: 20 }}>{children}</div>
      </body>
    </html>
  );
}
