import { useEffect } from "react";
import useDisplay from "../hooks/useDisplay";

function ScreensPage() {
    const { display, getDisplay } = useDisplay()

    useEffect(() => {
        const getScreens = async () => {
            try {
                getDisplay();
            } catch (error) {
                console.error(error);
            }
        };

        getScreens();
    }, []);

    return (
        <article>
            {display && display.length > 0 ? (
                <ul>
                    {" "}
                    {display.map((screen: any) => (
                        <li key={screen.id}>{screen.name ? screen.name : ''}</li>
                    ))}{" "}
                </ul>
            ) : (
                <p>No hay pantallas</p>
            )}
        </article>
    );
}

export default ScreensPage;
