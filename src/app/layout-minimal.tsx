import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareVacay - NDIS Accommodation Platform",
  description: "Find and book accessible accommodation for NDIS participants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
