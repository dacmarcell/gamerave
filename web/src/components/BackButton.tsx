"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
}

function BackButton(props: BackButtonProps) {
  const { href } = props;

  const router = useRouter();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => router.push(href)}
    >
      Voltar
    </button>
  );
}

export default BackButton;
