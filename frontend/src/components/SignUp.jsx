import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const { user, afterSignUp } = useContext(AuthContext);
    const navigate = useNavigate()

    const signUp = async (e) => {
        e.preventDefault()
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;

        if (username === '' || email === '' || password === '' || confirm_password === '') {
            toast.warn('Details Missing', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        else if (password !== confirm_password) {
            toast.warn("Password Doesn't Match !!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return;
        }
        else {
            let response = await fetch(`http://127.0.0.1:8000/api/signUp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, email: email, password: password })
            })
            if (response.status === 200) {
                afterSignUp(username, password)
                navigate("/")
            } else {
                let data = await response.json()
                toast.error(data, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        }
    }

    return (
        <>
            {user ?
                <Navigate to="/" />
                :
                <>
                    <form onSubmit={signUp}>
                        <div className="bg-grey-lighter min-h-screen flex flex-col">
                            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                                <div className="bg-black px-6 py-8 rounded shadow-md text-black w-full">
                                    <h1 className="text-white mb-8 text-3xl text-center">Sign up</h1>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="username"
                                        autoComplete="on"
                                        placeholder="User Name" />

                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="email"
                                        autoComplete="on"
                                        placeholder="Email" />

                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="password"
                                        autoComplete="on"
                                        placeholder="Password" />
                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-3 rounded mb-4"
                                        name="confirm_password"
                                        autoComplete="on"
                                        placeholder="Confirm Password" />

                                    <button
                                        type="submit"
                                        className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
                                    >Create Account</button>
                                </div>

                                <div className="text-grey-dark mt-6">
                                    Already have an account?
                                    <Link to="/login" className="no-underline border-b border-blue text-blue" >
                                        Log in
                                    </Link>.
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            }
        </>
    )
}

export default SignUp