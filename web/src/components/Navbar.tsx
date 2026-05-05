import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism h-16 flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text tracking-tight">
          GameRave
        </Link>
        <div className="flex gap-8 items-center text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-primary transition-colors">Games</Link>
          <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-all active:scale-95 shadow-lg shadow-primary/20">
            Join the Rave
          </button>
        </div>
      </div>
    </nav>
  );
}
