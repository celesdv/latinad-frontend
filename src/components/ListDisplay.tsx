import { useEffect } from "react";
import useDisplay from "../hooks/useDisplay"
import Loader from "./Loader"
import DisplayCard from "./DisplayCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type IDisplay = {
    id: number;
    name: string;
    description: string;
    price_per_day: number;
    resolution_height: number;
    resolution_width: number;
    type: string;
    picture_url: string
};

function ListDisplay() {
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
        <div className="container p-4">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={window.innerWidth <= 640 ? 'auto' : window.innerWidth > 768 ? 3 : 2}
                loop={true}
                coverflowEffect={
                    {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2
                    }
                }
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {display && display.length > 0
                    ? (
                        <div className="overflow-hidden w-100">
                            <div className="flex whitespace-nowrap animate-scroll">
                                {display.map((el: IDisplay, index) => {
                                    return (
                                        <SwiperSlide>
                                            <DisplayCard
                                                key={index}
                                                display={el}
                                            />
                                        </SwiperSlide>

                                    );
                                })}
                            </div>

                        </div>
                    )
                    : (
                        <div className="p-6">
                            <Loader />
                        </div>
                    )
                }
            </Swiper>
        </div>
    )
}

export default ListDisplay