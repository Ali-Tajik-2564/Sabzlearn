import React, { useEffect, useState } from 'react'
import Table from '../../../Components/AdminPanel/Table/Table'
import swal from 'sweetalert'
import "./Articles.css"
export default function AdminArticles() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [articles, setArticles] = useState([])
    useEffect(() => {
        getAllArticles()
    }, [])
    function getAllArticles() {
        fetch("http://localhost:4000/v1/articles", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(allArticles => {
                setArticles(allArticles)
            })
    }
    return (
        <>

            <Table title=" مقاله  ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>لینک </th>
                            <th>نویسنده</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {articles.map((article, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{article.name}</td>
                                <td>{article.email}</td>
                                <td>{article.phone}</td>

                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" >
                                        ویرایش
                                    </button>
                                </td>

                                <td>
                                    <button type="button" class="btn btn-danger delete-btn"  >
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
