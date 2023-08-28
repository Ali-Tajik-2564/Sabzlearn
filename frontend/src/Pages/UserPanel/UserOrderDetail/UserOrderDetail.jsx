import React, { useState } from 'react'
import "./UserOrderDetail.css"
import { useParams } from 'react-router'
export default function UserOrderDetail() {
    const { ID } = useParams()
    const [detail, setDetail] = useState()
    console.log(detail);
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    useState(() => {
        fetch(`http://localhost:4000/v1/orders/${ID}`, {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(detailData => setDetail(detailData))
    }, [])
    return (
        <>
            <div className="col-9">
                <p className="description">سفارش <span>{detail[0]._id}</span>  در تاریخ <span>{detail[0].createdAt.slice(0, 10)}</span>  ثبت شده     است</p>
                <h2 className="tab-detail_title">مشخصات سفارش</h2>
                <table className="tab-detail">
                    <thead>
                        <tr className='table-row'>
                            <td>محصول</td>
                            <td>مجموع</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='table-row'>
                            <td>{detail[0].course.name}</td>
                            <td>{detail[0].course.price}تومان</td>
                        </tr>
                        <tr className='table-row'>
                            <td>جمع کل سبد خرید</td>
                            <td>{detail[0].course.price}تومان</td>
                        </tr>
                        <tr className='table-row'>
                            <td>قیمت کل سبد خرید</td>
                            <td>{detail[0].course.price}تومان</td>
                        </tr>
                    </tbody>
                </table>
                <h3 className="tab-address-title">
                    ادرس صورت حساب
                </h3>
                <ul className='address-list'>
                    <li>name</li>
                    <li>phone</li>
                    <li>email</li>
                </ul>
            </div>
        </>
    )
}
