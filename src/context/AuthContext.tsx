import { ReactNode, createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth";

type IProps = {
  children?: ReactNode;
};

type IUser = {
  email: string;
  password: string;
  token: string;
};

type IAuthContext = {
  user: IUser | null;
  isAuthenticated: boolean;
  loginError: any;
  login: (data: any) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  loginError: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<any | null>(null);

  const login = async (values: any) => {
    try {
      const res = await loginRequest(values);
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("tkn", res.data.token);
    } catch (error: any) {
      setLoginError(error);
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("tkn");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
