import React, { useEffect, useState } from "react";
import "./Category.css";
import TopBar from "./../../Components/TopBar/TopBar";
import MainHeader from "./../../Components/MainHeader/MainHeader";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router";
export default function Category() {
  const { categoryName } = useParams();
  const [allCourses, setAllCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [status, setStatus] = useState("deafult");
  const [statusTitle, setStatusTitle] = useState(" مرتب سازی پیش فرض");
  const [showCourses, setShownCourses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => setAllCourses(result));
  }, [categoryName]);
  useEffect(() => {
    switch (status) {
      case "free": {
        let freeCourses = allCourses.filter((course) => course.price === 0);
        setOrderedCourses(freeCourses);
        break;
      }
      case "money": {
        let moneyCourses = allCourses.filter((course) => course.price !== 0);
        setOrderedCourses(moneyCourses);
        break;
      }
      case "last": {
        setOrderedCourses(allCourses);
        break;
      }
      case "first": {
        let firstCourses = allCourses.slice().reverse();
        setOrderedCourses(firstCourses);
        break;
      }
      default: {
        setOrderedCourses(allCourses);
      }
    }
  }, [status]);
  const statusTitleChangeHandler = (event) => {
    setStatusTitle(event.target.textContent);
  };
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
                <span
                  class='courses-top-bar__selection-title'
                  onClick={(event) => {
                    setStatusTitle(" مرتب سازی پیش فرض");
                    statusTitleChangeHandler(event);
                  }}>
                  {statusTitle}
                  <i class='fas fa-angle-down courses-top-bar__selection-icon'></i>
                </span>
                <ul class='courses-top-bar__selection-list'>
                  <li
                    class='courses-top-bar__selection-item courses-top-bar__selection-item--active'
                    onClick={(event) => {
                      setStatus("free");
                      statusTitleChangeHandler(event);
                    }}>
                    مرتب سازی رایگان ها
                  </li>
                  <li
                    class='courses-top-bar__selection-item'
                    onClick={(event) => {
                      setStatus("money");
                      statusTitleChangeHandler(event);
                    }}>
                    مربت سازی بر پولی ها
                  </li>
                  <li
                    class='courses-top-bar__selection-item'
                    onClick={(event) => {
                      setStatus("last");
                      statusTitleChangeHandler(event);
                    }}>
                    مربت سازی بر اخرین ها
                  </li>
                  <li
                    class='courses-top-bar__selection-item'
                    onClick={(event) => {
                      setStatus("first");
                      statusTitleChangeHandler(event);
                    }}>
                    مربت سازی بر اساس اولین ها
                  </li>
                  <li
                    class='courses-top-bar__selection-item'
                    onClick={(event) => {
                      setStatus("cheap");
                      statusTitleChangeHandler(event);
                    }}>
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li
                    class='courses-top-bar__selection-item'
                    onClick={(event) => {
                      setStatus("expensive");
                      statusTitleChangeHandler(event);
                    }}>
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
                {allCourses.length === 0 ? (
                  <div className='alert alert-warning m-3'>
                    هنوز هیج دوره ای برای این دسته بندی وجود ندارد
                  </div>
                ) : (
                  <>
                    {showCourses.map((course) => (
                      <div className='col-4'>
                        <CourseBox {...course} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Pagination
        pathname={`/category/${categoryName}`}
        itemCount={3}
        items={orderedCourses}
        setShownCourses={setShownCourses}
      />
      <Footer />
    </div>
  );
}
