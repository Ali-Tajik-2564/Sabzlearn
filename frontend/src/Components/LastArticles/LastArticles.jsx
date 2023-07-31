import React, { useEffect, useState } from "react";
import "./LastArticles.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import LastArticleBox from "../LastArticleBox/LastArticleBox";

export default function LastArticles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((article) => {
        console.log(article);
        setArticles(article);
      });
  }, []);
  return (
    <section class='articles'>
      <div class='container'>
        <SectionTitle
          title='جدیدترین مقاله ها'
          desc='پیش به سوی ارتقای دانش'
          BtnTitle='تمامی مقاله ها'
          BtnHref='articles/1'
        />
      </div>
      <div class='articles__content'>
        <div class='row'>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}>
            {articles.map((article) => (
              <SwiperSlide>
                <LastArticleBox {...article} />
              </SwiperSlide>
            ))}
            ...
          </Swiper>
        </div>
      </div>
    </section>
  );
}
