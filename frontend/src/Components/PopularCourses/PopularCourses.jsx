import React from "react";
import "./PopularCourses.css";
import SectionTitle from "./../SectionTitle/SectionTitle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "./../CourseBox/CourseBox";

export default function PopularCourses() {
  return (
    <div class='container'>
      <div class='popular__header'>
        <SectionTitle title='محبوب ترین دوره ها' desc='' />
      </div>
      <div class='popular__slider'>
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
