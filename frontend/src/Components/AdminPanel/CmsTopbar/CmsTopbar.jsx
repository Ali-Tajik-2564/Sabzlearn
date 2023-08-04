import React, { useEffect, useState } from 'react'

export default function CmsTopbar() {
    const [userInfo, setUserInfo] = useState({})

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
            })
    })
    return (
        <div class="container-fluid">
            <div class="container">
                <div class="home-header">
                    <div class="home-right">
                        <div class="home-searchbar">
                            <input type="text" class="search-bar" placeholder="جستجو..." />
                        </div>
                        <div class="home-notification">
                            <button type="button">
                                <i class="far fa-bell"></i>
                            </button>
                        </div>
                        <div class="home-notification-modal">
                            <ul class="home-notification-modal-list">
                                <li class="home-notification-modal-item">
                                    <span class="home-notification-modal-text">پیغام ها</span>
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="home-notification-modal-item">
                                    <span class="home-notification-modal-text">پیغام ها</span>
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="home-notification-modal-item">
                                    <span class="home-notification-modal-text">پیغام ها</span>
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="home-notification-modal-item">
                                    <span class="home-notification-modal-text">پیغام ها</span>
                                    <label class="switch">
                                        <input type="checkbox" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </li>
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
