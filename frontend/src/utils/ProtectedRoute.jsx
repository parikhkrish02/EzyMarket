import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/Auth/AuthContext'

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext)
    return (
        user ? <Outlet /> : <Navigate to="/signUp" />
    );
}

export default ProtectedRoute
