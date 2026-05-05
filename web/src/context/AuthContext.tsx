"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { removeAuthCookie } from "../actions/auth";
import { BASE_URL } from "@/constants";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loginContext: (userData: User) => void;
  logoutContext: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Note: For a more robust app, we would fetch the user profile from the API using the cookie
  // upon initial load. But to keep it simple and stateless on the client (without localStorage),
  // we might lose the state on hard refresh unless we hydrate from the server.
  // For now, let's keep it simple.

  const loginContext = (userData: User) => {
    setUser(userData);
  };

  const logoutContext = async () => {
    setUser(null);
    await removeAuthCookie();
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
