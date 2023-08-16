import React, { useEffect, useState } from "react";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input/Input";
import { minValidator } from "../../../Validator/rules";
import Table from "../../../Components/AdminPanel/Table/Table";
import swal from "sweetalert";

export default function Sessions() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [courses, setCourses] = useState([]);
    const [allSessions, setAllSessions] = useState([])
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [sessionFile, setSessionFile] = useState('-1');
    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            time: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        fetch("http://localhost:4000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
        getAllSessions()
    }, []);
    const getAllSessions = () => {
        fetch("http://localhost:4000/v1/courses/sessions")
            .then(res => res.json())
            .then(SessionsInfo => {
                setAllSessions(SessionsInfo)

            })
    }
    const addNewSession = (event) => {
        event.preventDefault()
        let fromNewSession = new FormData()
        fromNewSession.append("title", formState.inputs.title.value)
        fromNewSession.append("time", formState.inputs.time.value)
        fromNewSession.append("video", sessionFile)

        fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
            , body: fromNewSession
        })
            .then(res => {
                if (res.ok) {

                    res.json()
                }
            }
            )
            .then(result => {
                swal({
                    title: "دوره با موفقیت اپدیت شد"
                    , icon: "success"
                    , buttons: "ok"
                })
            })
    }
    const removeSessions = (sessionsID) => {
        swal({
            title: "ایا از حذف خود اطمینان دارید؟"
            , icon: "warning"
            , buttons: ["نه", "اره"]

        })
            .then((result) => {
                if (result) {
                    fetch(`http://localhost:4000/v1/courses/sessions/${sessionsID}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorageData}`
                        }
                    })
                        .then(res => {
                            if (res.ok) {
                                swal({
                                    title: "جلسه با موفقیت حذف شد"
                                    , icon: "success"
                                    , buttons: "ok"
                                })
                                    .then(() => {
                                        getAllSessions()
                                    })

                            }
                        })
                }
            }
            )
    }
    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">عنوان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا نام جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">مدت زمان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="time"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    فایل مربوطه
                                </label>
                                <input type="file" onChange={(event) => setSessionFile(event.target.files.item[0])} />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={event => addNewSession(event)} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Table title=" جلسات">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>تایم</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {allSessions.map((sessions, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{sessions.title}</td>

                                <td>{sessions.time}</td>

                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeSessions(sessions._id)}  >
                                        حذف
                                    </button>
                                </td>

                            </tr>
                        ))}





                    </tbody>
                </table>

            </Table>
        </>

    )
}
