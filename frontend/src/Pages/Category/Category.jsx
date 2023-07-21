import React from "react";
import "./Category.css";
import TopBar from "./../../Components/TopBar/TopBar";
import MainHeader from "./../../Components/MainHeader/MainHeader";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
export default function Category() {
  return (
    <div>
      <TopBar />
      <MainHeader />
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
                <div className='col-4'>
                  <CourseBox />
                </div>
                <div className='col-4'>
                  <CourseBox />
                </div>
                <div className='col-4'>
                  <CourseBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Pagination />
      <Footer />
    </div>
  );
}
