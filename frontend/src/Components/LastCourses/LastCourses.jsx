import React from "react";
import "./LastCourses.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import CourseBox from "../CourseBox/CourseBox";

export default function LastCourses() {
  return (
    <div>
      <div class='courses'>
        <div class='container'>
          <SectionTitle
            title='جدیدترین دوره ها'
            desc='سکوی پرتاپ شما به سمت موفقیت'
            BtnTitle='تمامی دوره ها'
            BtnHref='courses'
          />

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
      </div>
    </div>
  );
}
