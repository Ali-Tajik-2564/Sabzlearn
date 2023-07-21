import React from "react";
import "./PreSell.css";
import SectionTitle from "./../SectionTitle/SectionTitle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "../CourseBox/CourseBox";

export default function PreSell() {
  return (
    <div class='presell'>
      <div class='container'>
        <SectionTitle title='دوره های در حال پیش فروش' desc='' />
      </div>
      <div class='presell__slider'>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}>
          <SwiperSlide>
            {" "}
            <CourseBox />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CourseBox />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CourseBox />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CourseBox />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CourseBox />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <CourseBox />
          </SwiperSlide>
          ...
        </Swiper>
      </div>
    </div>
  );
}
