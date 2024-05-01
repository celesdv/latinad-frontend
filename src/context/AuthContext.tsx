import { ReactNode, createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth";

type Props = {
  children?: ReactNode;
};

type User = {
  email: string;
  password: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: any) => Promise<void>;
  isAuthenticated: boolean;
  loginError: any;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  isAuthenticated: false,
  loginError: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<any | null>(null);

  const login = async (values: any) => {
    try {
      const res = await loginRequest(values);
      setUser(res.data);
      setIsAuthenticated(true);
      if (user) localStorage.setItem("token", user?.token);
    } catch (error: any) {
      setLoginError(error);
      console.error("Login error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, user, isAuthenticated, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};
