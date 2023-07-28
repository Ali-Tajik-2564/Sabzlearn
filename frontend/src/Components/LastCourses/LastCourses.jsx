import React, { useEffect, useState } from "react";
import "./LastCourses.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import CourseBox from "../CourseBox/CourseBox";

export default function LastCourses() {
  const [allCourse, setAllCourse] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((courses) => setAllCourse(courses));
  }, []);
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
                {allCourse.slice(0, 6).map((course) => (
                  <div className='col-4'>
                    <CourseBox {...course} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
