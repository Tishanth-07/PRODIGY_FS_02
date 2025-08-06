"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    await axiosInstance.post("/auth/login", { username, password });
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setIsAuthenticated(false);
    router.push("/login");
  };

  //  Check if user is logged in when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance.get("/employees"); // Protected route
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
