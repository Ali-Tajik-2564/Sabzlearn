import React from 'react'
import "./AdminIndex.css"
import { Outlet } from 'react-router'
import Sidebar from "../../../Components/AdminPanel/Sidebar/Sidebar"
import CmsTopbar from "../../../Components/AdminPanel/CmsTopbar/CmsTopbar"

export default function AdminIndex() {
    return (
        <>
            <div className="content
            ">
                <Sidebar />
                <div className="col-10" id='home'>
                    <CmsTopbar />
                    <div className="container-fluid" id='home-content'>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
