import React from "react";
import "./Index.css";
import Header from "../../Components/Header/Header";
import LastCourses from "../../Components/LastCourses/LastCourses";
import AboutUs from "../../Components/AboutUs/AboutUs";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import PreSell from "../../Components/PreSell/PreSell";
import LastArticle from "../../Components/LastArticles/LastArticles";
import Footer from "../../Components/Footer/Footer";
export default function Index() {
  return (
    <div>
      <Header />
      <LastCourses />
      <AboutUs />
      <PopularCourses />
      <PreSell />
      <LastArticle />
      <Footer />
    </div>
  );
}
