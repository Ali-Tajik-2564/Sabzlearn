import React from 'react'
import "./AdminIndex.css"
import { Outlet } from 'react-router'
import Sidebar from "../../../Components/AdminPanel/Sidebar/Sidebar"
export default function AdminIndex() {
    return (
        <>
            <div className="content
            ">
                <Sidebar />
            </div>
            <Outlet />
        </>
    )
}
