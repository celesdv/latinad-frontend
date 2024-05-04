import { ReactNode, createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth";

// Propiedades del componente
type IProps = {
  children?: ReactNode;
};

// Tipo de datos para el usuario
type IUser = {
  email: string;
  password: string;
  token: string;
};

// Tipo de datos para el contexto de autenticación
type IAuthContext = {
  user: IUser | null;
  isAuthenticated: boolean;
  loginError: any;
  login: (data: any) => Promise<void>;
  logout: () => void;
};

// Contexto de autenticación
export const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  loginError: null,
  login: async () => { },
  logout: () => { },
});

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: IProps) => {
  // Estados para el usuario, estado de autenticación y errores de inicio de sesión
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<any | null>(null);

  // Función para realizar el inicio de sesión
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

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("tkn");
  };

  // Proveedor de contexto de autenticación
  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
