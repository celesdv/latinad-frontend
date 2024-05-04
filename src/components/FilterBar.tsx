import { SubmitHandler, useForm } from "react-hook-form";
import useDisplay from "../hooks/useDisplay";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

// Definir el tipo para los campos del formulario
type IInputs = {
  name: string;
  indoor: boolean;
  outdoor: boolean;
};

function FilterBar() {
  // Obtener funciones y datos de pantalla desde el hook personalizado
  const { getDisplay, name, type } = useDisplay();
  // Inicializar useForm para controlar el estado del formulario de login
  const { register, handleSubmit, setValue } = useForm<IInputs>();

  // Actualizar los valores del formulario cuando cambien los datos de la pantalla
  useEffect(() => {
    setValue("name", name);
    if (type && type === "indoor") setValue("indoor", true);
    if (type && type === "outdoor") setValue("outdoor", true);
  }, [name, type]);

  // Manejar el envio de datos del formulario
  const onSubmit: SubmitHandler<IInputs> = async (values) => {
    // Determinar el tipo seleccionado
    const selectType = () => {
      if (values.indoor && values.outdoor) return "";
      if (values.indoor) return "indoor";
      if (values.outdoor) return "outdoor";
    };
    const type = selectType();
    // Enviar solicitud para obtener las pantallas filtradas
    await getDisplay(0, values.name, type ? type : "");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-96 w-96 flex gap-2 justify-center items-center">
        {/* Formulario de filtrado de pantallas */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between gap-2.5 relative bg-neutral-100 rounded-full  p-3"
        >
          {/* Input para filtro por nombre */}
          <label className="border rounded-full border-sky-800 p-1">
            <input
              {...register("name")}
              id="search"
              placeholder="Buscar por nombre"
              type="search"
              className="w-full border-0 bg-neutral-100 text-sm rounded-full text-sky-800 p-2 focus:outline-0 placeholder:text-sky-400"
            />
          </label>
          {/* Filtros de tipo */}
          <div>
            <label className="flex gap-2">
              <input id="indoor" type="checkbox" {...register("indoor")} />
              <span>Indoor</span>
            </label>
            <label className="flex gap-2">
              <input id="outdoor" type="checkbox" {...register("outdoor")} />
              <span>Outdoor</span>
            </label>
          </div>
          {/* Botón para filtrar */}
          <div className="flex items-center gap-3 text-sky-700">
            <button
              type="submit"
              className="text-neutral-100 focus:outline-none rounded-full text-sm p-2 text-center bg-sky-600 hover:bg-sky-700"
            >
              <MagnifyingGlassIcon className="size-5 text-neutral-100" />
            </button>
          </div>
        </form>
        {/* Boton con enlace para añadir nueva pantalla */}
        <Link to="form">
          <div className="flex items-center gap-1 text-neutral-100 focus:outline-none rounded-full text-sm p-4 text-center bg-sky-600 hover:bg-sky-700">
            <PlusIcon className="size-6 text-neutral-100" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default FilterBar;
