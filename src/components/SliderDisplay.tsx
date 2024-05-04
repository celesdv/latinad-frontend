import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import DisplayCard from "./DisplayCard";
import useDisplay from "../hooks/useDisplay";

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

function SliderDisplay() {
    const { display, loading } = useDisplay();

    return (
        <div className="container p-4">
            {!loading ? (
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={
                        window.innerWidth <= 640 ? "auto" : window.innerWidth > 768 ? 4 : 2
                    }
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 70,
                        modifier: 2.5,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper-container "
                >
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
                </Swiper>) : (
                <div className="p-32 flex justify-center items-center">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
}

export default SliderDisplay;
