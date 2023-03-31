import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfileContext from '../context/UserProfile/UserProfileContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const { userProfile } = useContext(UserProfileContext)

    if (!userProfile && user) {
        return <>Loading..</>
    }

    const privateButton = () => {
        if (!user) {
            toast.info('Login to Continue', {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <header className="w-full navbar shadow-lg items-end fixed">
                    <div className="flex items-center mt-4">
                        <div className="image">
                            <img className="h-20 pl-10 pb-3" src="/images/EZY (6).png" alt="" />
                        </div>
                        <div className="home">
                            <ul className="flex items-stretch">
                                <Link to="/">
                                    <li className="p-2 pl-8 font-sans cursor-pointer font-bold over:subpixel-antialiased pb-5 text-base hover:text-[#08744C] ease-in-out duration-500 hover:text-lg">
                                        HOME
                                    </li></Link>
                                <Link to="/aboutUs">
                                    <li className="p-2 pl-8 font-sans cursor-pointer font-bold over:subpixel-antialiased pb-5 text-base hover:text-[#08744C] ease-in-out duration-500 hover:text-lg">
                                        ABOUT US
                                    </li></Link>
                                <Link to="/contactUs" className="p-2 pl-8 font-sans cursor-pointer font-bold over:subpixel-antialiased pb-5 text-base hover:text-[#08744C] ease-in-out duration-500 hover:text-lg">
                                    CONTACT US
                                </Link>
                            </ul>
                        </div>

                        <div className="Login text-center pb-7 pr-6 font-sans font-bold text-sm flex items-end ml-auto">
                            <Link to="/business" onClick={privateButton}><button className="rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                Start Business
                            </button></Link>
                            <Link to="/business-near-by"><button className="rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                Near By Business
                            </button></Link>

                            {user ?
                                <>
                                    <button onClick={logoutUser} className="rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Logout
                                    </button>
                                </>
                                :
                                <>
                                    <Link to="/login"><button className="rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Login
                                    </button></Link>
                                    <Link to="/signUp"><button className="rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Sign Up
                                    </button></Link>
                                </>
                            }


                        </div>
                    </div>
                </header>


                <div className='mt-[100px] overflow-y-auto'>
                    <Outlet />
                </div>

                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>

            {/* <Link to="/" onClick={privateButton} className="mr-5">Home</Link>
            {user ?
                <>
                    <Link to={`/profile/${user}/`} className="mr-5">My Profile</Link>
                    <Link to={`/business-near-by/`} className="mr-5">Business Near Me</Link>
                    {console.log(userProfile.isBusiness)}
                    {userProfile.isBusiness ?
                        <Link to={`/business/${userProfile.isBusiness.businessNameSlug}/`} className="mr-5">Business View</Link>
                        :
                        <Link to="/newBusiness" className="mr-5">Start a Business</Link>
                    }
                    <button onClick={logoutUser} className="mr-5">Logout</button>
                </>
                :
                <>
                    <Link to="/signUp" className="mr-5">Sign Up</Link>
                    <Link to="/login">Login</Link>
                </>
            } */}
        </>
    )
}

export default Navbar;
