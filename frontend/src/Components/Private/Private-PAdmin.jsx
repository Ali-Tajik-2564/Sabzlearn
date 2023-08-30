import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'

import { useNavigate } from 'react-router-dom'
export default function PrivatePAdmin({ children }) {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <>
            {
                authContext.userInfo !== null && (
                    <>
                        {
                            authContext.userInfo.role === "ADMIN" ? <>{children}</> : navigate("/login")
                        }
                    </>
                )
            }
        </>
    )
}
