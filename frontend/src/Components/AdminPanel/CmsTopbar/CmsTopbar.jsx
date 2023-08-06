import React, { useEffect, useState } from 'react'

export default function CmsTopbar() {
    const [userInfo, setUserInfo] = useState({})
    const [userNotification, setUserNotification] = useState([])
    const [isShowNotifModal, setIsShowNotifModal] = useState(false)

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("user"))
        fetch("http://localhost:4000/v1/auth/me", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserInfo(data)
                setUserNotification(data.notifications)
            })
    }, [seeNotification])
    function seeNotification(notificationID) {
        const localStorageData = JSON.parse(localStorage.getItem("user"))
        fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(result => console.log(result
            ))

    }
    return (
        <div class="container-fluid">
            <div class="container">
                <div class={`home-header ${isShowNotifModal && "active-modal-notfication"}`}>
                    <div class="home-right">
                        <div class="home-searchbar">
                            <input type="text" class="search-bar" placeholder="جستجو..." />
                        </div>
                        <div class="home-notification">
                            <button type="button">
                                <i class="far fa-bell" onMouseEnter={() => setIsShowNotifModal(true)}></i>
                            </button>
                        </div>
                        <div class="home-notification-modal" onMouseEnter={() => setIsShowNotifModal(true)} onMouseLeave={() => setIsShowNotifModal(false)}>
                            <ul class="home-notification-modal-list">
                                {userNotification.length === 0 ? (
                                    <li class="home-notification-modal-item">
                                        پیامی یافت نشد
                                    </li>
                                ) : (<>  {userNotification.map(notification => (

                                    <li class="home-notification-modal-item">
                                        <span class="home-notification-modal-text">{notification}</span>
                                        <label class="switch">
                                            <a href="javascript:void(0)" onClick={() => seeNotification(notification._id)}>دیدم</a>
                                        </label>
                                    </li>))}
                                </>)}




                            </ul>
                        </div>
                    </div>
                    <div class="home-left">
                        <div class="home-profile">
                            <div class="home-profile-image">
                                <a href="#">
                                    <img src="/images/profile.jpg" alt="" />
                                </a>
                            </div>
                            <div class="home-profile-name">
                                <a href="#">{userInfo.name}</a>
                            </div>
                            <div class="home-profile-icon">
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
