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

export function AuthProvider({ 
  children, 
  initialUser 
}: { 
  children: ReactNode; 
  initialUser: User | null 
}) {
  const [user, setUser] = useState<User | null>(initialUser);

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
