import React, { useState, useEffect } from 'react'
import "./UserTicket.css"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
export default function UserTicket() {
    const navigate = useNavigate()

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [departments, setDepartments] = useState([]);
    const [departmentsSubs, setDepartmentsSubs] = useState([]);
    const [useCurse, setUserCurses] = useState([]);
    const [ticketTypeId, setTicketTypeId] = useState("")
    const [departmentsID, setDepartmentsID] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [priority, setPriority] = useState("")
    const [courseID, setCourseID] = useState("")
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
    const setTicket = (event) => {
        event.preventDefault()
        const ticketsInfo = {
            departmentID: departmentsID,
            departmentSubID: ticketTypeId,
            priority,
            title,
            body
        }
        fetch("http://localhost:4000/v1/tickets", {
            method: "POST"
            , headers: {
                "Authorization": `Bearer ${localStorageData}`
                , "Content-Type": "application/json"
            }
            , body: JSON.stringify(ticketsInfo)
        })
            .then(res => {
                res.json()
                if (res.ok) {
                    swal({
                        title: "تیکت شما با موفقیت ثبت شد"
                        , icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            navigate("/my-account/ticket")
                        })
                }
            })
    }
    return (
        <div class="col-9">
            <div class="ticket">
                <div class="ticket-header">
                    <span class="ticket-header__title">ارسال تیکت جدید</span>
                    <Link class="ticket-header__link" to="/my-account/ticket">
                        همه تیکت ها
                    </Link>
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
                                    setDepartmentsID(event.target.value)
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
                            <input class="ticket-form__input" type="text" onChange={(event) => {

                                setTitle(event.target.value)
                            }} />
                        </div>

                        <div class="col-6">
                            <label class="ticket-form__label">اهمیت را انتخاب کنید:</label>
                            <select class="ticket-form__select" onChange={(event) => {

                                setPriority(event.target.value)
                            }}>
                                <option class="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>


                                <option value="3" class="ticket-form__option">کم</option>
                                <option value="2" class="ticket-form__option">متوسط</option>
                                <option value="1" class="ticket-form__option">بالا</option>


                            </select>
                        </div>

                        {
                            ticketTypeId === "63b688c5516a30a651e98156" && (


                                <div class="col-6">
                                    <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                                    <select class="ticket-form__select" onChange={(event) => {

                                        setCourseID(event.target.value)
                                    }}>
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
                            <textarea class="ticket-form__textarea" onChange={(event) => {

                                setBody(event.target.value)
                            }}></textarea>
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
                            <button class="ticket-form__btn" onClick={setTicket}>
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
