import React, { useEffect, useState } from 'react'
import "./AdminCourses.css"
import Table from '../../../Components/AdminPanel/Table/Table'

export default function AdminCourses() {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch("http://localhost:4000/v1/courses")
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setCourses(result)
            })
    }, [])
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
                                    <button type="button" class="btn btn-danger delete-btn" >
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
