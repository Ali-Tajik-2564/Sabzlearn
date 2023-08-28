import React, { useState, useEffect } from 'react'
import "./UserTicket.css"
export default function UserTicket() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [departments, setDepartments] = useState([]);
    const [departmentsSubs, setDepartmentsSubs] = useState([]);
    const [useCurse, setUserCurses] = useState([]);
    const [ticketTypeId, setTicketTypeId] = useState("")
    console.log(useCurse);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/tickets/departments`)
            .then((res) => res.json())
            .then((data) => setDepartments(data));


    }, []);

    const getDepartmentsSub = (departmentID) => {
        fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
            .then((res) => res.json())
            .then((subs) => setDepartmentsSubs(subs));
    };
    const getUserCourses = () => {
        fetch("http://localhost:4000/v1/users/courses", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(result => setUserCurses(result))
    }
    return (
        <div class="col-9">
            <div class="ticket">
                <div class="ticket-header">
                    <span class="ticket-header__title">ارسال تیکت جدید</span>
                    <a class="ticket-header__link" href="#">
                        همه تیکت ها
                    </a>
                </div>
                <form class="ticket-form" action="#">
                    <div class="row">
                        <div class="col-6">
                            <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select
                                class="ticket-form__select"
                                onChange={(event) => {
                                    getDepartmentsSub(event.target.value)
                                    getUserCourses()
                                }}
                            >
                                <option class="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departments.map((department) => (
                                    <option value={department._id}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
                            <select class="ticket-form__select" onChange={event => setTicketTypeId(event.target.value)}>
                                <option class="ticket-form__option" >
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departmentsSubs.map((sub) => (
                                    <option value={sub._id}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">عنوان تیکت را وارد کنید:</label>
                            <input class="ticket-form__input" type="text" />
                        </div>

                        {
                            ticketTypeId === "63b688c5516a30a651e98156" && (


                                <div class="col-6">
                                    <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                                    <select class="ticket-form__select">
                                        <option class="ticket-form__option">
                                            لطفا یک مورد را انتخاب نمایید.
                                        </option>
                                        {useCurse.map(course => (

                                            <option value={course._id} class="ticket-form__option">{course.course.name}</option>
                                        ))}

                                    </select>
                                </div>
                            )
                        }
                        <div class="col-12">
                            <label class="ticket-form__label">
                                محتوای تیکت را وارد نمایید:
                            </label>
                            <textarea class="ticket-form__textarea"></textarea>
                        </div>
                        <div class="col-12">
                            <div class="ticket-form__file">
                                <span class="ticket-form__file-max">
                                    حداکثر اندازه: 6 مگابایت
                                </span>
                                <span class="ticket-form__file-format">
                                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                                </span>
                                <input class="ticket-form__file-input" type="file" />
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="ticket-form__btn">
                                <i class="ticket-form__btn-icon fa fa-paper-plane"></i>
                                ارسال تیکت
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
