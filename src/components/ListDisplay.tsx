import { useEffect, useState } from "react";
import useDisplay from "../hooks/useDisplay";
import FilterBar from "./FilterBar";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SliderDisplay from "./SliderDisplay";

function ListDisplay() {
  const { display, getDisplay, totalDisplay, pageSize, name, type } = useDisplay();
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getDisplay(offset, name, type);
  }, [offset]);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalDisplay]);

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
          <div className="flex gap-3 justify-center items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={
                "text-neutral-100 rounded-full p-2 " +
                (currentPage === 1
                  ? "bg-neutral-400"
                  : "bg-sky-400 hover:bg-sky-600")
              }
            >
              <ArrowLeftIcon className="size-5 text-neutral-100" />
            </button>
            <span>Página {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * pageSize >= totalDisplay}
              className={
                "text-neutral-100 rounded-full p-2 " +
                (currentPage * pageSize >= totalDisplay
                  ? "bg-neutral-400"
                  : "bg-sky-400 hover:bg-sky-600")
              }
            >
              <ArrowRightIcon className="size-5 text-neutral-100" />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-sm">
              Mostrando {display.length} de {totalDisplay} pantallas
            </span>
          </div>
        </div>
      
    </div>
  );
}

export default ListDisplay;
