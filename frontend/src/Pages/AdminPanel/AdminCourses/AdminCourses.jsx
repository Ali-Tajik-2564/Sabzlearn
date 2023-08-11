import React, { useEffect, useState } from 'react'
import "./AdminCourses.css"
import Table from '../../../Components/AdminPanel/Table/Table'
import swal from 'sweetalert'

export default function AdminCourses() {
    const [courses, setCourses] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    function getAllCourses() {
        fetch("http://localhost:4000/v1/courses")
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setCourses(result)
            })
    }
    useEffect(() => {
        getAllCourses()
    }, [])
    const deleteCourse = (coursesId) => {
        swal({
            title: "ایا از حذف اطمینان دارید"
            , icon: "warning"
            , buttons: ["نه", "اره"]

        })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/courses/${coursesId}`,
                        {
                            method: "DELETE"
                            , headers: { "Authorization": `Bearer ${localStorageData}` }
                        }
                    )
                        .then(res => res.json())
                        .then(ans => {
                            swal({
                                title: "با موفقیت دوره حذف شد"
                                , icon: "success"
                                , buttons: "ok"
                            })
                                .then(() => {
                                    getAllCourses()
                                })
                        })
                }
            })
    }
    return (
        <>
            <Table title=" دوره ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>لینک</th>
                            <th>مدرس</th>
                            <th>دسته بندی</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {courses.map((course, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{course.name}</td>
                                <td>{course.price === 0 ? "رایگان" : course.price}</td>
                                <td>{course.isComplete === 0 ? "درحال بر گذاری" : "تکمیل شده"}</td>
                                <td>{course.shortName}</td>
                                <td>{course.creator}</td>
                                <td>{course.categoryID.title}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteCourse(course._id)} >
                                        حذف
                                    </button>
                                </td>

                            </tr>
                        ))}





                    </tbody>
                </table>

            </Table></>
    )
}
