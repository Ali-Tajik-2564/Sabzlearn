import React, { useEffect, useState } from "react";
import "./Courses.css";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import TopBar from "../../Components/TopBar/TopBar";
import MainHeader from "../../Components/MainHeader/MainHeader";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Pagination from "../../Components/Pagination/Pagination";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showCourses, setShownCourses] = useState([]);
  console.log(showCourses);
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((coursesData) => setCourses(coursesData));
  }, []);
  return (
    <>
      <TopBar />
      <MainHeader />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 1, title: "دوره ها", to: "courses" },
        ]}
      />
      <section class='courses'>
        <div class='container'>
          <div class='courses-top-bar'>
            <div class='courses-top-bar__right'>
              <div class='courses-top-bar__row-btn courses-top-bar__icon--active'>
                <i class='fas fa-border-all courses-top-bar__icon'></i>
              </div>
              <div class='courses-top-bar__column-btn'>
                <i class='fas fa-align-left courses-top-bar__icon'></i>
              </div>

              <div class='courses-top-bar__selection'>
                <span class='courses-top-bar__selection-title'>
                  مرتب سازی پیش فرض
                  <i class='fas fa-angle-down courses-top-bar__selection-icon'></i>
                </span>
                <ul class='courses-top-bar__selection-list'>
                  <li class='courses-top-bar__selection-item courses-top-bar__selection-item--active'>
                    مرتب سازی پیش فرض
                  </li>
                  <li class='courses-top-bar__selection-item'>
                    مربت سازی بر اساس محبوبیت
                  </li>
                  <li class='courses-top-bar__selection-item'>
                    مربت سازی بر اساس امتیاز
                  </li>
                  <li class='courses-top-bar__selection-item'>
                    مربت سازی بر اساس آخرین
                  </li>
                  <li class='courses-top-bar__selection-item'>
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li class='courses-top-bar__selection-item'>
                    مربت سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div class='courses-top-bar__left'>
              <form action='#' class='courses-top-bar__form'>
                <input
                  type='text'
                  class='courses-top-bar__input'
                  placeholder='جستجوی دوره ...'
                />
                <i class='fas fa-search courses-top-bar__search-icon'></i>
              </form>
            </div>
          </div>

          <div class='courses-content'>
            <div class='container'>
              <div class='row'>
                {showCourses.map((course) => (
                  <div className='col-4'>
                    <CourseBox {...course} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Pagination
            pathname='/courses'
            itemCount={3}
            items={courses}
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
