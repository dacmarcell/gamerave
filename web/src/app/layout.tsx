import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "GameRave | Discover the Best Games",
  description: "The ultimate platform for game reviews and ratings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="pt-24 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
