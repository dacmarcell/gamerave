"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logoutContext } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutContext();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism h-16 flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold gradient-text tracking-tight"
        >
          GameRave
        </Link>
        <div className="flex gap-4 md:gap-8 items-center text-sm font-medium text-slate-300">
          {user ? (
            <>
              <Link href="/profile/reviews" className="hover:text-primary transition-colors">
                My Reviews
              </Link>
              <span className="hidden md:inline-block text-slate-400">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="hover:text-primary transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/register">
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-all active:scale-95 shadow-lg shadow-primary/20">
                  Join the Rave
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
