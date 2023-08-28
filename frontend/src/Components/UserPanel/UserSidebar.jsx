import React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function UserSidebar() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const logout = (event) => {
        event.preventDefault()
        swal({
            title: "ایا از خروج خود اطمینان دارید"
            , icon: "warning"
            , buttons: ["نه", "اره"]
        })
            .then(result => {
                if (result) {
                    swal({
                        title: "خروج شما با موفقیت انجام شد"
                        , icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            authContext.logout()
                            navigate("/")
                        })
                }
            })
    }
    return (
        <div class="col-3">
            <div class="sidebar">
                <span class="sidebar__name">محمدامین سعیدی راد</span>
                <ul class="sidebar__list">
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to="">
                            پیشخوان
                        </Link>
                    </li>
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to="orders/1">
                            سفارش ها
                        </Link>
                    </li>
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to="#">
                            کیف پول من
                        </Link>
                    </li>
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to="#">
                            جزئیات حساب کاربری
                        </Link>
                    </li>
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to="buy">
                            دوره های خریداری شده
                        </Link>
                    </li>
                    <li class="sidebar__item">
                        <Link class="sidebar__link" to="ticket">
                            تیکت های پشتیبانی
                        </Link>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#" onClick={event => logout(event)}>
                            خروج از سیستم
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
