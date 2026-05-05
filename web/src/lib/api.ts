"use server";

import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function apiFetch(path: string, options?: RequestInit) {
  const store = await cookies();
  const token = store.get("auth_token")?.value;

  return fetch(`${BASE_URL}/${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
