import { ReactNode, createContext, useContext, useState } from "react";
import { createDisplayRequest, getDisplayRequest } from "../api/display";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
    createDisplay: (data: any) => Promise<void>;
    getDisplay: () => {}
};

export const DisplayContext = createContext<IDisplayContext>({
    display: null,
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
    useAxiosPrivate()
    const [display, setDisplay] = useState<IDisplay[] | null>([]);

    const getDisplay = async () => {
        try {
            const res = await getDisplayRequest()
            setDisplay(res.data.data)
            console.log(res.data.data)
        } catch (error) {
            console.error(error)
        }

    }

    const createDisplay = async (data: any) => {
        const res = await createDisplayRequest(data);
        console.log(res);
    };

    return (
        <DisplayContext.Provider value={{ display, createDisplay, getDisplay }}>
            {children}
        </DisplayContext.Provider>
    );
};
