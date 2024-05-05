import { useEffect, useState } from "react";
import useDisplay from "../hooks/useDisplay";
import FilterBar from "./FilterBar";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import SliderDisplay from "./SliderDisplay";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "react-tooltip/dist/react-tooltip.css";

function ListDisplay() {
  // Inicialización de estado y hook personalizado
  const { display, getDisplay, totalDisplay, pageSize, name, type } =
    useDisplay();
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Efecto para obtener nuevas pantallas cuando cuando cambia el offset
  useEffect(() => {
    getDisplay(offset, name, type);
  }, [offset]);

  // Efecto para restablecer la página actual cuando cambia el total de elementos a mostrar
  useEffect(() => {
    setCurrentPage(1);
  }, [totalDisplay]);

  /**
   * Manejador para el cambio de página.
   * @param page - El número de la nueva página.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page > 1) {
      setOffset(pageSize * (page - 1));
    } else {
      setOffset(0);
    }
  };

  return (
    <div className="container">
      <div>
        <FilterBar />
        <SliderDisplay />

        {/* Controles de paginación */}
        <div className="flex gap-3 justify-center items-center">
          {/* Botón de página anterior */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            data-tooltip-id="pagination"
            data-tooltip-content="Página anterior"
            data-tooltip-place="bottom"
            className={
              "text-neutral-100 rounded-full p-2 shadow-lg " +
              (currentPage === 1
                ? "bg-neutral-400"
                : "bg-sky-400 hover:bg-sky-600")
            }
          >
            <ArrowLeftIcon className="size-5 text-neutral-100" />
          </button>
          {/* Indicador de página actual */}
          <span className="text-sm font-semibold text-sky-800">
            Página {currentPage}
          </span>
          {/* Botón de página siguiente */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * pageSize >= totalDisplay}
            data-tooltip-id="pagination"
            data-tooltip-content="Página siguiente"
            data-tooltip-place="bottom"
            className={
              "text-neutral-100 rounded-full p-2 shadow-lg " +
              (currentPage * pageSize >= totalDisplay
                ? "bg-neutral-400"
                : "bg-sky-400 hover:bg-sky-600")
            }
          >
            <ArrowRightIcon className="size-5 text-neutral-100" />
          </button>
        </div>
        {/* Información de visualización */}
        <div className="flex justify-center items-center p-2">
          <span className="text-xs">
            Mostrando {display.length} de {totalDisplay} pantallas
          </span>
        </div>
      </div>
      <Tooltip id="pagination" />
    </div>
  );
}

export default ListDisplay;
