import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import useDisplay from "../hooks/useDisplay";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { simpleConfirm } from "react-simple-dialogs";

import "react-tooltip/dist/react-tooltip.css";
import { toast } from "sonner";

const DisplayCard = ({ display }: any) => {
  const { deleteDisplay } = useDisplay();

  const showConfirmation = async () => {
    if (
      await simpleConfirm({
        title: "Eliminar Pantalla",
        message: `Confirme que desea eliminar la pantalla ${display.name}`,
        confirmLabel: "Eliminar",
        cancelLabel: "Cancelar",
      })
    ) {
      console.log("Confirmed! 😄", display.id);
      handleDelete(display.id);
    } else {
      console.log("Not confirmed. 🥲");
    }
  };

  /**
   * Manejador para eliminar una pantalla.
   * @param {number} id - El ID de la pantalla a eliminar.
   */
  async function handleDelete(id: number) {
    const res = await deleteDisplay(id);
    if (res.status === 200) {
      toast.success("La pantalla fue eliminada ");
    } else {
      toast.error("No se pudo eliminar la pantalla");
    }
  }

  return (
    <div className="h-full">
      <div className="rounded-lg overflow-hidden relative">
        {/* Imagen de la pantalla */}
        <img
          src={display.picture_url}
          alt={display.name + "-img"}
          className="h-full w-full"
        />
        {/* Tipo de pantalla */}
        <span
          className={
            "absolute top-5 right-0 text-xl rounded-l-full px-4 py-2 font-semibold capitalize text-neutral-100 min-w-28 shadow-xl " +
            (display.type === "indoor"
              ? "bg-rose-700 shadow-neutral-500"
              : "bg-green-700 shadow-neutral-400")
          }
        >
          {display.type}
        </span>
        {/* Nombre de la pantalla y botones de acción */}
        <span className="absolute bottom-0 w-full h-16 lg:h-20 text-xl font-semibold capitalize bg-sky-800 text-neutral-100 min-w-28 shadow-xl shadow-sky-700">
          <div className="flex justify-between h-full">
            {/* Botón para eliminar */}
            <div className="flex items-end">
              <button
                onClick={showConfirmation}
                className="pt-7 pl-4 pb-4 pr-7 rounded-tr-full bg-sky-600 hover:bg-sky-400"
                data-tooltip-id="form-tooltip"
                data-tooltip-place="right"
                data-tooltip-content="Eliminar pantalla"
              >
                <TrashIcon className="size-6 text-neutral-100" />
              </button>
            </div>
            {/* Nombre de la pantalla */}
            <div className="grow text-center w-16 pt-2">{display.name}</div>
            {/* Botón para editar */}
            <div className="flex items-end">
              <Link
                to={`form/${display.id}`}
                className="pt-7 pl-7 pb-4 pr-4 rounded-tl-full bg-sky-600 hover:bg-sky-400"
                data-tooltip-id="form-tooltip"
                data-tooltip-content="Editar pantalla"
                data-tooltip-place="left"
              >
                <PencilIcon className="size-6 text-neutral-100" />
              </Link>
            </div>
          </div>
        </span>
      </div>
      <Tooltip id="form-tooltip" />
    </div>
  );
};

export default DisplayCard;
