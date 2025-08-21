"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./Company.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";

const logos = [
  {
    id: 0,
    title: "zapier",
    img: "./company/zapier.svg",
  },
  {
    id: 1,
    title: "wordpress",
    img: "./company/wordpress.svg",
  },
  {
    id: 2,
    title: "webflow",
    img: "./company/webflow.svg",
  },
  {
    id: 3,
    title: "react",
    img: "./company/React.svg",
  },
  {
    id: 4,
    title: "python",
    img: "./company/python.svg",
  },
  {
    id: 5,
    title: "make",
    img: "./company/make.svg",
  },
];
// чтобы не было разрывов — дублируем массив
const items = [...logos, ...logos, ...logos];

export const Company = () => {
  return (
    <div className={s.company__container}>
      <Swiper
        modules={[Autoplay, FreeMode]}
        className={s.company__bg}
        slidesPerView="auto"
        spaceBetween={30}
        freeMode={{ enabled: true, momentum: false }}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
          pauseOnMouseEnter: false,
        }}
        speed={2000}
        allowTouchMove={false}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`} className={s.slide}>
            <div className={s.logo__container}>
              <Image
                src={item.img}
                alt={item.title}
                width={60}
                height={60}
                loading="lazy"
                className={s.logo__img}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
