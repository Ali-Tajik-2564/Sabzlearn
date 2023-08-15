import React from 'react'
import "./Sidebar.css"
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContext from "../../../Context/AuthContext"
import swal from "sweetalert";
export default function Sidebar() {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const logout = (event) => {
        event.preventDefault()
        swal({
            title: "خروج شما با موفقیت انجام شد",
            icon: "success",
            button: " اوکی",
        })
            .then(() => {
                authContext.logout()
                navigate("/")
            })
    }
    return (
        <div id="sidebar" class="col-2">
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <a href="#">
                        <img src="/images/logo/Logo.png" alt="Logo" />
                    </a>
                </div>

                <div class="sidebar-menu-btn">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li class="active-menu">
                        <Link to="admin-panel">
                            <span>صفحه اصلی</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="admin-courses">
                            <span>دوره ها</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="sessions
                        ">
                            <span>جلسات </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="menus">
                            <span>منو ها</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="admin-articles">
                            <span>مقاله ها</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="user/1">
                            <span>کاربران</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <span>کدهای تخفیف</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="category">
                            <span>دسته‌بندی‌ها</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="contact" >
                            <span>پیغام ها</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" onClick={event => logout(event)}>
                            <span>خروج</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
