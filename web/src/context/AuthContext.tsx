"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { removeAuthCookie } from "../actions/auth";
import { BASE_URL } from "@/constants";

interface User {
  id: number;
  email: string;
}

interface UserLikes {
  gameLikes: number[];
  reviewLikes: number[];
}

interface AuthContextType {
  user: User | null;
  userLikes: UserLikes;
  loginContext: (userData: User) => void;
  logoutContext: () => void;
  toggleGameLikeLocally: (id: number) => void;
  toggleReviewLikeLocally: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [userLikes, setUserLikes] = useState<UserLikes>({
    gameLikes: [],
    reviewLikes: [],
  });

  useEffect(() => {
    if (user) {
      fetch(`${BASE_URL}/users/${user.id}/likes`)
        .then((res) => {
          console.log(res);
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => setUserLikes(data))
        .catch((err) => console.error("Failed to fetch user likes", err));
    } else {
      setUserLikes({ gameLikes: [], reviewLikes: [] });
    }
  }, [user]);

  const loginContext = (userData: User) => {
    setUser(userData);
  };

  const logoutContext = async () => {
    setUser(null);
    await removeAuthCookie();
  };

  const toggleGameLikeLocally = (id: number) => {
    setUserLikes((prev) => ({
      ...prev,
      gameLikes: prev.gameLikes.includes(id)
        ? prev.gameLikes.filter((gId) => gId !== id)
        : [...prev.gameLikes, id],
    }));
  };

  const toggleReviewLikeLocally = (id: number) => {
    setUserLikes((prev) => ({
      ...prev,
      reviewLikes: prev.reviewLikes.includes(id)
        ? prev.reviewLikes.filter((rId) => rId !== id)
        : [...prev.reviewLikes, id],
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLikes,
        loginContext,
        logoutContext,
        toggleGameLikeLocally,
        toggleReviewLikeLocally,
      }}
    >
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
