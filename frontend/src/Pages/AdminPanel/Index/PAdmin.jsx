import React from 'react'
import Table from '../../../Components/AdminPanel/Table/Table';
import { useState, useEffect } from 'react'

export default function PAdmin() {
    const [allUser, setAllUser] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch("http://localhost:4000/v1/users", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }

        })
            .then(res => res.json())
            .then(result => setAllUser(result))
    }, [])
    return (
        <Table title=" اخرین ثبت نامی  ها">
            <table class="table">
                <thead>

                    <tr>
                        <th>شناسه</th>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>شماره تماس</th>

                    </tr>
                </thead>
                <tbody>


                    {allUser.slice(0, 6).map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>

                            <td>{user.email}</td>
                            <td>{user.phone}</td>


                        </tr>
                    ))}





                </tbody>
            </table>

        </Table>
    )
}
