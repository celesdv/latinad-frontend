import { useEffect, useState } from "react";
import useDisplay from "../hooks/useDisplay";
import Loader from "./Loader";
import DisplayCard from "./DisplayCard";
import FilterBar from "./FilterBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


type IDisplay = {
    id: number;
    name: string;
    description: string;
    price_per_day: number;
    resolution_height: number;
    resolution_width: number;
    type: string;
    picture_url: string;
};

function ListDisplay() {
    const { display, getDisplay, totalDisplay } = useDisplay();
    const [offset, setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getDisplay(offset);
    }, [offset]);

    useEffect(() => {
        setCurrentPage(1)
    }, [totalDisplay]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setOffset(10 * currentPage);
    };

    return (
        <div className="container">
            <FilterBar />
            <div className="container p-4">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={
                        window.innerWidth <= 640 ? "auto" : window.innerWidth > 768 ? 3 : 2
                    }
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                >
                    {display && display.length > 0 ? (
                        <div className="overflow-hidden w-100">
                            <div className="flex whitespace-nowrap animate-scroll">
                                {display.map((el: IDisplay, index: number) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <DisplayCard display={el} />
                                        </SwiperSlide>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="p-6">
                            <Loader />
                        </div>
                    )}
                </Swiper>
            </div>
            <div className="flex gap-3 justify-center p-2 items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={
                        "text-neutral-100 rounded-full p-2 " +
                        (currentPage === 1 ? "bg-neutral-400" : "bg-sky-400")
                    }
                >
                    <ArrowLeftIcon className="size-5 text-neutral-100" />
                </button>
                <span>Página {currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * 10 >= totalDisplay}
                    className={
                        "text-neutral-100 rounded-full p-2 " +
                        (currentPage * 10 >= totalDisplay ? "bg-neutral-400" : "bg-sky-400")
                    }
                >
                    <ArrowRightIcon className="size-5 text-neutral-100" />
                </button>
            </div>
            <div className="flex justify-center items-center">
            <span className="text-sm">Mostrando {display.length} de {totalDisplay} pantallas</span>
            </div>
            
        </div>
    );
}

export default ListDisplay;
