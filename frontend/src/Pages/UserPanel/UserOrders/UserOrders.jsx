import React, { useState, useEffect } from 'react'
import "./UserOrders.css"
import Pagination from '../../../Components/Pagination/Pagination';
import { useParams } from 'react-router';

export default function UserOrders() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [allOrders, setAllOrders] = useState([])
    const [shownOrders, setShownOrders] = useState([])
    const { pagenumber } = useParams()
    console.log(pagenumber);
    useEffect(() => {
        fetch("http://localhost:4000/v1/orders", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(orderData => setAllOrders(orderData))
    }, [])
    return (
        <div class="col-9">
            <div class="order">
                <table class="order__table">
                    <thead class="order__table-header">
                        <tr class="order__table-header-list">
                            <th class="order__table-header-item">شناسه</th>
                            <th class="order__table-header-item">تاریخ</th>
                            <th class="order__table-header-item">وضعیت</th>
                            <th class="order__table-header-item">دوره</th>
                            <th class="order__table-header-item">مبلغ</th>
                            <th class="order__table-header-item">عملیات ها</th>
                        </tr>
                    </thead>
                    <tbody class="order__table-body">
                        {shownOrders.map((order, index) => (
                            <tr class="order__table-body-list">
                                <td class="order__table-body-item">
                                    <a href="#" class="order__table-body-link">
                                        {index + 1}
                                    </a>
                                </td>
                                <td class="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                                <td class="order__table-body-item">تکمیل شده</td>
                                <td class="order__table-body-item">
                                    {order.course.name}
                                </td>
                                <td class="order__table-body-item">
                                    {order.price}
                                </td>
                                <td class="order__table-body-item">
                                    <a class="order__table-body-btn" href="#">
                                        نمایش
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    pathname={`/my-account/orders`}
                    itemCount={3}
                    items={allOrders}
                    setShownCourses={setShownOrders}
                />
            </div>
        </div>

    )
}
