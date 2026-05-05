import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { getAuthCookie } from "@/actions/auth";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GameRave | Discover the Best Games",
  description: "The ultimate platform for game reviews and ratings.",
};

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getAuthCookie();
  let initialUser = null;

  if (token) {
    const decoded = parseJwt(token);
    if (decoded && decoded.userId) {
      initialUser = {
        id: decoded.userId,
        email: decoded.email,
      };
    }
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider initialUser={initialUser}>
          <Navbar />
          <main className="pt-24 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
