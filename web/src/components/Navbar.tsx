import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism h-16 flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold gradient-text tracking-tight"
        >
          GameRave
        </Link>
      </div>
    </nav>
  );
}
