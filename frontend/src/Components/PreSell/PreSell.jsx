import React, { useState, useEffect } from "react";
import "./PreSell.css";
import SectionTitle from "./../SectionTitle/SectionTitle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "../CourseBox/CourseBox";

export default function PreSell() {
  const [presell, setPresell] = useState([])
  useState(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then(res => res.json())
      .then(allData => setPresell(allData))
  }, [])
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
          {presell.map(course => (
            <SwiperSlide>
              {" "}
              <CourseBox {...course} />
            </SwiperSlide>
          ))}


        </Swiper>
      </div>
    </div>
  );
}
