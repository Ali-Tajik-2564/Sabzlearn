import React from 'react'
import UserBox from "./../../../Components/UserPanel/UserBox"
import { useContext } from "react";
import AuthContext from '../../../Context/AuthContext';


export default function MainIndex() {
    const authContext = useContext(AuthContext);

    return (
        <div class="col-9">
            <div class="main">
                <div class="main__title">
                    <span class="main__title-text">
                        سلام{" "}
                        {/* <span class="main__title-name">{authContext.userInfo.name}</span>، */}
                        به پنل کاربری خوش اومدی
                    </span>
                </div>
                <p class="main__desc">
                    از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
                    مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
                    کاربری و کلمه عبور خود را ویرایش کنید.
                </p>
                <div class="main__links">
                    <div class="row">
                        <UserBox title="سفارش" href="orders/1" />
                        <UserBox title="دوره های خریداری شده" href="buy" />
                        <UserBox title="جزئیات حساب کاربری" href="edit-account" />
                        <UserBox title="تیکت های پشتیبانی" href="ticket" />
                    </div>
                </div>
            </div>
        </div>

    )
}
