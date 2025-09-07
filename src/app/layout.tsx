import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Teaches Code",
  description: "Learn Java, C, Python and more — from beginner to pro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
