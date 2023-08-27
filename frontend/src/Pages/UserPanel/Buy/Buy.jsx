import React, { useState, useEffect } from 'react'
import "./Buy.css"
export default function Buy() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/users/courses/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
            });
    }, []);
    return (
        <div class="col-9">
            <div class="courses">
                <div class="courses-header">
                    <span class="courses-header__title">دوره های ثبت نام شده</span>
                    <ul class="courses-header__list">
                        <li class="courses-header__item">
                            <a
                                class="courses-header__link courses-header__link-active"
                                href="#"
                            >
                                همه دوره ها
                            </a>
                        </li>
                        <li class="courses-header__item">
                            <a class="courses-header__link" href="#">
                                دوره های فعال
                            </a>
                        </li>
                        <li class="courses-header__item">
                            <a class="courses-header__link" href="#">
                                دوره های تکمیل شده
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="main">
                    <div class="row">
                        <div class="col-12">
                            {courses.map((course) => (
                                <div class="main__box">
                                    <div class="main__box-right">
                                        <a class="main__box-img-link" href="#">
                                            <img
                                                class="main__box-img img-fluid"
                                                src={`http://localhost/v1/images/courses/${course.cover}`}
                                            />
                                        </a>
                                    </div>
                                    <div class="main__box-left">
                                        <a href="#" class="main__box-title">
                                            آموزش جاوا اسکریپت
                                        </a>
                                        <div class="main__box-bottom">
                                            <div class="main__box-all">
                                                <span class="main__box-all-text">کل دروس:</span>
                                                <span class="main__box-all-value">75</span>
                                            </div>
                                            <div class="main__box-completed">
                                                <span class="main__box-completed-text">
                                                    دروس تکمیل شده:
                                                </span>
                                                <span class="main__box-completed-value">0/75</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
