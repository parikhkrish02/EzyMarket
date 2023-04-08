import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = ({ children }) => {

    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken'))["username"] : null)
    const [loading, setLoading] = useState(true)

    const loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.React_App_BACKEND_HOST}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value }),
        }).catch((err) => {
            alert(err.name);
        })
        let data = await response.json()
        if (response.status === 200) {
            localStorage.setItem('authToken', JSON.stringify(data))
            setAuthToken(data)
            setUser(jwt_decode(data.access)["username"]);
            toast.success('Logged In !!', {
                // positon: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        else {
            toast.error('Enter Correct Credentials !', {
                // positon: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }

    const afterSignUp = async (username, password) => {
        let response = await fetch(`${process.env.React_App_BACKEND_HOST}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })
        let data = await response.json()
        if (response.status === 200) {
            localStorage.setItem('authToken', JSON.stringify(data))
            setAuthToken(data)
            setUser(jwt_decode(data.access)["username"]);
            toast.success('Logged In !!', {
                // positon: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        else {
            alert(data)
        }
    }

    const updateToken = async () => {
        let response = await fetch(`${process.env.React_App_BACKEND_HOST}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': JSON.parse(localStorage.getItem('authToken'))["refresh"] })
        })
        let data = await response.json()
        if (response.status === 200) {
            localStorage.setItem('authToken', JSON.stringify(data))
            setAuthToken(data)
            setUser(jwt_decode(data.access)["username"]);
        }
        else {
            alert("updateToken error: " + data);
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            setLoading(false)
        }
        else if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4;
        let intervalId = setInterval(() => {
            if (localStorage.getItem('authToken') && !loading) {
                updateToken()
            }
        }, fourMinutes);
        return () => clearInterval(intervalId)
        // eslint-disable-next-line
    }, [authToken, loading])


    const logoutUser = () => {
        setUser(null)
        setAuthToken(null)
        localStorage.removeItem('authToken')
        toast.success('You were logged out !!', {
            // positon: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        afterSignUp: afterSignUp
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <h1>Loading...</h1> : children}
        </AuthContext.Provider>
    )
}

export default NoteState;