"use server";

import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export type ApiResponse<T = any> = {
  ok: boolean;
  status: number;
  data: T;
};

export async function apiFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const store = await cookies();
  const token = store.get("auth_token")?.value;

  const res = await fetch(`${BASE_URL}/${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  let data;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}
