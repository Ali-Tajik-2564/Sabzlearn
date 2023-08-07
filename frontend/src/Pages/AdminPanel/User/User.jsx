import React, { useEffect, useState } from 'react'
import "./User.css"
import Table from '../../../Components/AdminPanel/Table/Table'
import Pagination from "../../../Components/Pagination/Pagination"


export default function User() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [allUsers, setAllUsers] = useState([])
    const [shownUsers, setShownUsers] = useState([])
    useEffect(() => {
        fetch("http://localhost:4000/v1/users", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(result => {
                setAllUsers(result)
                console.log(result);

            })
    }, [])
    console.log(allUsers, "shown users");
    return (
        <>
            <Table title=" کاربران">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th>شماره</th>
                            <th>ایمیل</th>
                            <th>رمز عبور</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {allUsers.map((user) => (
                            <tr>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn">
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}





                    </tbody>
                </table>

            </Table>
            <Pagination pathname="/admin-panel/user" itemCount={8} items={allUsers} setShownCourses={setShownUsers} />
        </>
    )
}
