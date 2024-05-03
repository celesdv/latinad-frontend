import { ReactNode, createContext, useContext, useState } from "react";
import { createDisplayRequest, getDisplayRequest } from "../api/display";

type IProps = {
  children?: ReactNode;
};

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

type IDisplayContext = {
  display: IDisplay[] | null;
  isCreated: boolean;
  createDisplay: (data: any) => {};
  getDisplay: () => {};
};

export const DisplayContext = createContext<IDisplayContext>({
  display: null,
  isCreated:false,
  createDisplay: async () => {},
  getDisplay: async () => {},
});

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be use within an DisplayProvider");
  }
  return context;
};

export const DisplayProvider = ({ children }: IProps) => {
  const [display, setDisplay] = useState<IDisplay[] | null>([]);
  const [isCreated, setIsCreated]= useState<boolean>(false);

  const getDisplay = async () => {
    try {
      const res = await getDisplayRequest();
      setDisplay(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createDisplay = async (data: any) => {
    try {
      await createDisplayRequest(data);
      setIsCreated(true)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DisplayContext.Provider value={{ display, createDisplay, getDisplay, isCreated }}>
      {children}
    </DisplayContext.Provider>
  );
};
