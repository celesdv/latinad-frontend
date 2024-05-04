import { ReactNode, createContext, useContext, useState } from "react";
import { createDisplayRequest, deleteDisplayRequest, getDisplayRequest } from "../api/display";

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
  pageSize: number
  loading: boolean;
  name: string;
  type: string;
  createDisplay: (data: any) => {};
  getDisplay: (offset: number, name: string, type: string) => {};
  deleteDisplay: (id: number) => {};
};

export const DisplayContext = createContext<IDisplayContext>({
  display: [],
  isCreated: false,
  totalDisplay: 0,
  pageSize: 0,
  loading: false,
  name: '',
  type: '',
  createDisplay: async () => { },
  getDisplay: async () => { },
  deleteDisplay: async () => { },
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
  const [totalDisplay, setTotalDisplay] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  const getDisplay = async (offset: number, newName: string, newType: string) => {
    setLoading(true)
    if (newName) setName(newName)
    if (newType) setType(newType)
    try {
      const res = await getDisplayRequest(pageSize, offset, newName, newType);
      setDisplay(res.data.data)
      setTotalDisplay(res.data.totalCount)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  const createDisplay = async (data: any) => {
    try {
      await createDisplayRequest(data);
      setIsCreated(true)
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDisplay = async (id: number) => {
    setLoading(true)
    try {
      const res = await deleteDisplayRequest(id)
      if (res.status === 200) setDisplay(display.filter(el => el.id != id))
      setTotalDisplay(totalDisplay - 1)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  return (
    <DisplayContext.Provider value={{ display, loading, totalDisplay, pageSize, createDisplay, getDisplay, deleteDisplay, isCreated, name, type }}>
      {children}
    </DisplayContext.Provider>
  );
};
