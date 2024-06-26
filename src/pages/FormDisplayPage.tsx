import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "../components/Loader";
import useDisplay from "../hooks/useDisplay";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Definición de los tipos de entrada para el formulario
type IDisplayInputs = {
    name: string;
    description: string;
    price_per_day: number;
    resolution_height: number;
    resolution_width: number;
    type: string;
};

// Enumeración de los posibles estados del formulario
const FORM_STATUS = {
    IDLE: "idle",
    UPLOADING: "uploading",
    ERROR: "error",
} as const;

// Definición del tipo de datos para el estado del formulario
type StatusType = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];

function FormDisplayPage() {
    // Estado del formulario y funciones para manejarlo
    const [formStatus, setFormStatus] = useState<StatusType>(FORM_STATUS.IDLE);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IDisplayInputs>();
    const { createDisplay, isCreated, getDisplayBy, updateDisplay, isUpdated } = useDisplay();
    const navigate = useNavigate();
    const params = useParams();

    // Efecto para cargar los datos de visualización si se está editando
    useEffect(() => {
        async function loadDisplay() {
            setFormStatus(FORM_STATUS.UPLOADING);
            if (params.id) {
                const dis: any = await getDisplayBy(Number(params.id));
                setValue("name", dis.name);
                setValue("description", dis.description);
                setValue("price_per_day", dis.price_per_day);
                setValue("resolution_height", dis.resolution_height);
                setValue("resolution_width", dis.resolution_width);
                setValue("type", dis.type);
            }
            setFormStatus(FORM_STATUS.IDLE);
        }
        loadDisplay();

    }, []);

    // Efectos para redirigir después de crear o actualizar una visualización
    useEffect(() => {
        if (isCreated || isUpdated) {
            navigate("/display");
            toast.success(`La pantalla fue ${isCreated ? 'creada' : 'actualizada'}`);
        }
    }, [isCreated, isUpdated]);

    // Función de envío del formulario
    const onSubmit: SubmitHandler<IDisplayInputs> = async (values) => {
        setFormStatus(FORM_STATUS.UPLOADING);
        if (params.id) {
            await updateDisplay(values, Number(params.id))
        } else {
            await createDisplay(values);
        }

    };

    return (
        <div className="flex flex-col items-center justify-center p-6 h-[calc(100vh-5.1rem)]">
            <div className="flex justify-between relative bg-neutral-100 rounded-xl w-96 max-w-full px-6 py-2 shadow-lg">
                {/* Formulario */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-full p-2"
                >
                    <h3 className="text-xl text-sky-700 text-center font-bold">
                        Añadir Pantalla
                    </h3>
                    {/* Campos del formulario - Nombre */}
                    <label className="relative border border-sky-600 rounded">
                        <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 shadow text-neutral-100">
                            Nombre
                        </span>
                        <input
                            {...register("name", { required: true })}
                            id="name-display"
                            placeholder="Nombre de la pantalla"
                            type="text"
                            className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
                        />
                    </label>
                    {errors.name && (
                        <p className="text-xs text-center text-red-500 -mt-4">
                            *Debe ingresar un nombre para la pantalla
                        </p>
                    )}
                    {/* Campos del formulario - Descripcion */}
                    <label className="relative border border-sky-600 rounded">
                        <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 shadow text-neutral-100">
                            Descripción
                        </span>
                        <textarea
                            {...register("description", { required: true })}
                            id="description-display"
                            placeholder="Descripción de la pantalla"
                            className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
                        />
                    </label>
                    {errors.description && (
                        <p className="text-xs text-center text-red-500 -mt-4">
                            *Debe ingresar una descripción para la pantalla
                        </p>
                    )}
                    {/* Campos del formulario - Precio y tipo */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                        <label className="relative border border-sky-600 rounded w-full md:w-1/2">
                            <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 shadow text-neutral-100">
                                Precio
                            </span>
                            <input
                                {...register("price_per_day", { required: true })}
                                id="price-per-day-display"
                                placeholder="Precio por día"
                                type="number"
                                min="0"
                                className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
                            />
                        </label>
                        {errors.price_per_day && (
                            <p className="text-xs text-center text-red-500 -mt-4 block md:hidden">
                                *Debe ingresar un precio por día
                            </p>
                        )}
                        <label className="relative border border-sky-600 rounded w-full md:w-1/2">
                            <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 shadow text-neutral-100">
                                Tipo
                            </span>
                            <select
                                {...register("type", { required: true })}
                                id="type-display"
                                className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
                            >
                                <option disabled hidden selected value="">
                                    Seleccionar Tipo
                                </option>
                                <option value="indoor">Interior</option>
                                <option value="outdoor">Exterior</option>
                            </select>
                        </label>
                    </div>
                    {errors.price_per_day && (
                        <p className="text-xs text-center text-red-500 -mt-4 hidden md:block">
                            *Debe ingresar un precio por día en números enteros
                        </p>
                    )}
                    {errors.type && (
                        <p className="text-xs text-center text-red-500 -mt-4">
                            *Debe ingresar un tipo para la pantalla
                        </p>
                    )}
                    {/* Campos del formulario - Resolucion en alto y ancho */}
                    <div className="flex gap-2">
                        <label className="relative border border-sky-600 rounded">
                            <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 bg-sky-600 shadow text-neutral-100">
                                Alto
                            </span>
                            <input
                                {...register("resolution_height", { required: true })}
                                id="resolution-height-display"
                                placeholder="Alto de resolución"
                                type="number"
                                className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
                            />
                        </label>
                        <label className="relative border border-sky-600 rounded">
                            <span className="absolute left-2 -translate-y-1/2 pointer-events-none rounded px-1 shadow bg-sky-600 text-neutral-100">
                                Ancho
                            </span>
                            <input
                                {...register("resolution_width", { required: true })}
                                id="resolution-width-display"
                                placeholder="Ancho de resolución"
                                type="number"
                                className="w-full border-0 bg-neutral-100 rounded text-sky-800 p-3 focus:outline-0 placeholder:text-sky-400"
                            />
                        </label>
                    </div>
                    {(errors.resolution_height || errors.resolution_width) && (
                        <p className="text-xs text-center text-red-500 -mt-4">
                            *Debe ingresar la resolución en ancho y alto para la pantalla
                        </p>
                    )}

                    {/* Botón de envío */}
                    {formStatus === FORM_STATUS.IDLE && (
                        <button
                            type="submit"
                            className="flex text-neutral-100 bg-sky-700 font-bold uppercase rounded py-3 justify-center shadow-lg"
                        >
                            {params.id ? "Actualizar" : "Añadir"}
                        </button>
                    )}
                    {/* Indicador de carga */}
                    {formStatus === FORM_STATUS.UPLOADING && <Loader />}
                </form>
            </div>
        </div>
    );
}

export default FormDisplayPage;
