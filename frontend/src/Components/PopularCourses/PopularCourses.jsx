import React, { useState, useEffect } from "react";
import "./PopularCourses.css";
import SectionTitle from "./../SectionTitle/SectionTitle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "./../CourseBox/CourseBox";


export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([])
  useState(() => {
    fetch("http://localhost:4000/v1/courses/popular")
      .then(res => res.json())
      .then(allData => setPopularCourses(allData))
  }, [])
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
          {popularCourses.map(course => (
            <SwiperSlide>
              {" "}
              <CourseBox {...course} />
            </SwiperSlide>
          ))}


          ...
        </Swiper>
      </div>
    </div>
  );
}
