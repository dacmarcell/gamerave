"use client";

import { useState } from "react";

interface ShareButtonProps {
  gameName: string;
}

export default function ShareButton({ gameName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `GameRave | ${gameName}`,
      text: `Confira as reviews de ${gameName} no GameRave!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all flex items-center gap-2 group min-w-[100px] justify-center"
    >
      <span className="text-sm font-bold text-slate-200">
        {copied ? "Copied!" : "Share"}
      </span>
      {!copied && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary group-hover:translate-y-[-2px] transition-transform"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      )}
    </button>
  );
}
