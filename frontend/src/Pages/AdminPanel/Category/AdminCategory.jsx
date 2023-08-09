import React, { useEffect, useState } from 'react'
import Table from '../../../Components/AdminPanel/Table/Table'

export default function AdminCagetory() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getAllCategory()
    }, [])
    function getAllCategory() {
        fetch("http://localhost:4000/v1/category")
            .then(res => res.json())
            .then(allcagetories => {
                console.log(allcagetories);
                setCategories(allcagetories)
            })
    }
    return (
        <>
            <Table title="دسته بندی ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {categories.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeHandler(user._id)}>
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
