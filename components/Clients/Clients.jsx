import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { clientsData } from './ClientsData';
import Image from 'next/image';
import Link from 'next/link';

const Clients = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const sliderRef = useRef(null);

    return (
        <div className="section pt-0">
            <div className="container-fluid">
                <div className="position-relative">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 70,
                            },
                            1600: {
                                slidesPerView: 6,
                                spaceBetween: 70,
                            },
                            1920: {
                                slidesPerView: 6,
                                spaceBetween: 80,
                            },
                        }}
                        onSwiper={(swiper) => {
                            sliderRef.current = swiper;
                            swiper.on('init', () => {
                                updateNavigation(swiper);
                            });
                        }}
                        className="clients-slider"
                    >
                        {clientsData.clients.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="client-box">
                                    <Link href={item.url}>
                                        <Image src={item.logo} alt={index} placeholder="blur" />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Slider Navigations */}
                    <button className="clients-prev" onClick={() => sliderRef.current?.slidePrev()} aria-label="Prev Slide">
                        <i className="bi bi-arrow-left-short"></i>
                    </button>
                    <button className="clients-next" onClick={() => sliderRef.current?.slideNext()} aria-label="Next Slide">
                        <i className="bi bi-arrow-right-short"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clients;
