import { ReactNode, createContext, useContext, useState } from "react";
import {
  createDisplayRequest,
  deleteDisplayRequest,
  getDisplayByRequest,
  getDisplayRequest,
  updateDisplayRequest,
} from "../api/display";

// Propiedades del componente
type IProps = {
  children?: ReactNode;
};

// Tipo de datos para una pantalla
type IDisplay = {
  id: number;
  name: string;
  description: string;
  picture_url: string;
  user_id: number;
  price_per_day: number;
  resolution_height: number;
  resolution_width: number;
  type: string;
};

// Tipo de datos para el contexto de visualización
type IDisplayContext = {
  display: IDisplay[];
  isCreated: boolean;
  isUpdated: boolean;
  totalDisplay: number;
  pageSize: number;
  loading: boolean;
  name: string;
  type: string;
  createDisplay: (data: any) => Promise<any>;
  getDisplay: (offset: number, name: string, type: string) => void;
  deleteDisplay: (id: number) => Promise<any>;
  getDisplayBy: (id: number) => Promise<any>;
  updateDisplay: (data: any, id: number) => Promise<any>;
};

// Contexto de visualización
export const DisplayContext = createContext<IDisplayContext>({
  display: [],
  isCreated: false,
  isUpdated: false,
  totalDisplay: 0,
  pageSize: 0,
  loading: false,
  name: "",
  type: "",
  createDisplay: async () => {{}},
  getDisplay: async () => { },
  deleteDisplay: async () => {{}},
  getDisplayBy: async () => ({}),
  updateDisplay: async () => { },
});

// Hook personalizado para acceder al contexto de visualización
export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be use within an DisplayProvider");
  }
  return context;
};

export const DisplayProvider = ({ children }: IProps) => {
  // Estados para las pantallas, estado de carga y otros detalles relacionados con la visualización
  const [display, setDisplay] = useState<IDisplay[]>([]);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [totalDisplay, setTotalDisplay] = useState<number>(1);
  const [pageSize] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");

  // Función para obtener las pantallas
  const getDisplay = async (
    offset: number,
    newName: string,
    newType: string
  ) => {
    setLoading(true);
    setName(newName);
    setType(newType);
    try {
      const res = await getDisplayRequest(pageSize, offset, newName, newType);
      setDisplay(res.data.data);
      setTotalDisplay(res.data.totalCount);
      setIsUpdated(false);
      setIsCreated(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Función para crear una nueva pantalla
  const createDisplay = async (data: any) => {
    try {
      await createDisplayRequest(data);
      setIsCreated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para eliminar una pantalla
  const deleteDisplay = async (id: number) => {
    setLoading(true);
    try {
      const res = await deleteDisplayRequest(id);
      if (res.status === 200) setDisplay(display.filter((el) => el.id != id));
      setTotalDisplay(totalDisplay - 1);
      setLoading(false);
      return res
    } catch (error) {
      console.error(error);
      setLoading(false);
      return error
    }
    
  };

  // Función para obtener una pantalla por su ID
  const getDisplayBy = async (id: number) => {
    try {
      const res = await getDisplayByRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Función para actualizar una pantalla
  const updateDisplay = async (data: any, id: number) => {
    try {
      await updateDisplayRequest(data, id);
      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Proveedor de contexto de visualización
  return (
    <DisplayContext.Provider
      value={{
        display,
        loading,
        totalDisplay,
        pageSize,
        createDisplay,
        getDisplay,
        deleteDisplay,
        getDisplayBy,
        updateDisplay,
        isCreated,
        isUpdated,
        name,
        type,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};
