
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type IScreens = [];
function ScreensPage() {
    const [screens, setScreens] = useState<IScreens>();
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getScreens = async () => {
            try {
                const responce = await axiosPrivate.get("/display?name=grande&pageSize=10&type=indoor");
                console.log(responce);
                setScreens(responce.data);
            } catch (error) {
                console.error(error);
            }
        };

        getScreens();
    }, []);

    return (
        <article>
            {screens && screens.length > 0 ? (
                <ul>
                    {" "}
                    {screens.map((screen, i) => (
                        <li key={i}>{screen}</li>
                    ))}{" "}
                </ul>
            ) : (
                <p>No hay pantallas</p>
            )}
        </article>
    );
}

export default ScreensPage;
