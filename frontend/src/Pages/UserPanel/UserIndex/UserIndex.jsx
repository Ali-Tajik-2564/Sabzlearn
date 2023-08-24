import React from 'react'
import TopBar from '../../../Components/TopBar/TopBar'
import MainHeader from '../../../Components/MainHeader/MainHeader'
import Footer from '../../../Components/Footer/Footer'
import UserSidebar from '../../../Components/UserPanel/UserSidebar'
import { Outlet } from 'react-router-dom'
import "./UserIndex.css"

export default function UserIndex() {
    return (
        <>
            <TopBar />
            <MainHeader />

            <section class="content">
                <div class="content-header">
                    <div class="container">
                        <span class="content-header__title">حساب کاربری من</span>
                        <span class="content-header__subtitle">پیشخوان</span>
                    </div>
                </div>
                <div class="content-main">
                    <div class="container">
                        <div class="row">
                            <UserSidebar />

                            <Outlet />

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
