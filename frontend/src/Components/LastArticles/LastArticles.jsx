import React from "react";
import "./LastArticles.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import LastArticleBox from "../LastArticleBox/LastArticleBox";

export default function LastArticles() {
  return (
    <section class='articles'>
      <div class='container'>
        <SectionTitle
          title='جدیدترین مقاله ها'
          desc='پیش به سوی ارتقای دانش'
          BtnTitle='تمامی مقاله ها'
        />
      </div>
      <div class='articles__content'>
        <div class='row'>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}>
            <SwiperSlide>
              <LastArticleBox />
            </SwiperSlide>
            <SwiperSlide>
              <LastArticleBox />
            </SwiperSlide>
            <SwiperSlide>
              <LastArticleBox />
            </SwiperSlide>
            <SwiperSlide>
              <LastArticleBox />
            </SwiperSlide>
            <SwiperSlide>
              <LastArticleBox />
            </SwiperSlide>
            <SwiperSlide>
              <LastArticleBox />
            </SwiperSlide>
            ...
          </Swiper>
        </div>
      </div>
    </section>
  );
}
