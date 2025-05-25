import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { UserInfo } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      try {
        const decoded = jwtDecode<UserInfo>(token);
        setUserInfo(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid JWT token:", error);
        Cookies.remove("authToken");
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserInfo(null);
    }

    setLoading(false);
  }, []);

  const login = (token: string) => {
    Cookies.set("authToken", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    try {
      const decoded = jwtDecode<UserInfo>(token);
      setUserInfo(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid login token:", error);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, loading, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
