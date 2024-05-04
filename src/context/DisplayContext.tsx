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
  display: IDisplay[];
  isCreated: boolean;
  totalDisplay: number;
  createDisplay: (data: any) => {};
  getDisplay: (offset?: number, name?: string, type?: string) => {};
};

export const DisplayContext = createContext<IDisplayContext>({
  display: [],
  isCreated: false,
  totalDisplay: 0,
  createDisplay: async () => { },
  getDisplay: async () => { },
});

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be use within an DisplayProvider");
  }
  return context;
};

export const DisplayProvider = ({ children }: IProps) => {
  const [display, setDisplay] = useState<IDisplay[]>([]);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [totalDisplay, setTotalDisplay] = useState<number>(1)

  const getDisplay = async (offset = 0, name = '', type = '') => {
    const pageSize = 10
    try {
      const res = await getDisplayRequest(pageSize, offset, name, type);
      setDisplay(res.data.data)
      setTotalDisplay(res.data.totalCount)
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
    <DisplayContext.Provider value={{ display, totalDisplay, createDisplay, getDisplay, isCreated }}>
      {children}
    </DisplayContext.Provider>
  );
};
