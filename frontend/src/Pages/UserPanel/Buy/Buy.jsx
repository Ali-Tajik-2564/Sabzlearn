import React, { useState, useEffect } from 'react'
import "./Buy.css"
export default function Buy() {
    const [courses, setCourses] = useState([]);
    const [courseState, setCourseState] = useState("all")
    const [shownCourses, setShownCourses] = useState([])

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
    const filteredCourse = (state) => {
        switch (state) {
            case "all": {
                setShownCourses(courses)

                break
            }
            case "free": {
                const filterCourse = courses.filter(course => course.course.price === 0)
                setShownCourses(filterCourse)
                break
            }
            case "money": {
                const filterCourse = courses.filter(course => course.course.price !== 0)
                setShownCourses(filterCourse)
                break
            }
            default: {
                setShownCourses(courses)
                break
            }
        }
    }
    return (
        <div class="col-9">
            <div class="courses">
                <div class="courses-header">
                    <span class="courses-header__title">دوره های ثبت نام شده</span>
                    <ul class="courses-header__list">
                        <li class="courses-header__item">
                            <a
                                class={`courses-header__link ${courseState === "all" && "courses-header__link-active"}`}
                                href="#"
                                onClick={event => {
                                    event.preventDefault()
                                    setCourseState("all")
                                    filteredCourse("all")
                                }}
                            >
                                همه دوره ها
                            </a>
                        </li>
                        <li class="courses-header__item">
                            <a href="#"
                                class={`courses-header__link ${courseState === "free" && "courses-header__link-active"}`}
                                onClick={event => {
                                    event.preventDefault()
                                    setCourseState("free")
                                    filteredCourse("free")

                                }}
                            >
                                دوره های رایگان
                            </a>
                        </li>
                        <li class="courses-header__item">
                            <a href="#"
                                class={`courses-header__link ${courseState === "money" && "courses-header__link-active"}`}
                                onClick={event => {
                                    event.preventDefault()
                                    setCourseState("money")
                                    filteredCourse("money")

                                }}
                            >
                                دوره های پولی
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="main">
                    <div class="row">
                        <div class="col-12">
                            {
                                shownCourses.length === 0 ? (
                                    <div className="alert alert-warning">دوره ای برای این فیلترینگ وجود ندارد</div>
                                )
                                    : (<>
                                        {shownCourses.map((course) => (
                                            <div class="main__box">
                                                <div class="main__box-right">
                                                    <a class="main__box-img-link" href="#">
                                                        <img
                                                            class="main__box-img img-fluid"
                                                            src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                                                        />
                                                    </a>
                                                </div>
                                                <div class="main__box-left">
                                                    <a href="#" class="main__box-title">
                                                        {course.course.name}
                                                    </a>
                                                    <div class="main__box-bottom">
                                                        <div class="main__box-all">
                                                            <span class="main__box-all-text">وضعیت</span>
                                                            <span class="main__box-all-value">{course.course.isComplete === 1 ? "تکمیل شده" : "درحال برگذاری"}</span>
                                                        </div>
                                                        <div class="main__box-completed">
                                                            <span class="main__box-completed-text">
                                                                مبلغ
                                                            </span>
                                                            <span class="main__box-completed-value">{course.course.price === 0 ? "رایگان" : course.course.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
