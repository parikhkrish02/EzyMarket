import React, { useContext, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfileContext from '../context/UserProfile/UserProfileContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const { userProfile } = useContext(UserProfileContext)

    const [isNavOpen, setIsNavOpen] = useState(false);

    const isActiveClass = (e) => {
        if (e?.isActive) {
            return 'text-[#186444] underline p-2 pl-8 font-sans cursor-pointer font-bold over:subpixel-antialiased pb-5 text-base hover:text-[#08744C] ease-in-out duration-500 hover:text-lg';
        } else {
            return 'text-black-500 p-2 pl-8 font-sans cursor-pointer font-bold over:subpixel-antialiased pb-5 text-base hover:text-[#08744C] ease-in-out duration-500 hover:text-lg';
        }
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
        setIsNavOpen(false)
    }

    // useEffect(() => {
    //   setIsNavOpen(false)
    // }, [])


    return (
        <>
            <div className="flex flex-col h-screen">
                <header className="w-full navbar shadow-lg items-end fixed">
                    <div className="flex  relative items-center mt-4">
                        <div className="image">
                            <Link to="/"><img className="h-20 pl-10 pb-3" src="/images/EZY (6).png" alt="" /></Link>
                        </div>
                        <div className="home ">
                            <ul className="hidden lg:flex lg:items-stretch">

                                <NavLink to="/" className={isActiveClass}>
                                    HOME
                                </NavLink>

                                <NavLink to="/aboutUs" className={isActiveClass}>
                                    ABOUT US
                                </NavLink>
                                <NavLink to="/contactUs" className={isActiveClass}>
                                    CONTACT US
                                </NavLink>
                            </ul>
                        </div>

                        <div className="Login text-center pb-7 pr-6 font-sans font-bold text-sm flex items-end ml-auto">
                            {user ?
                                (userProfile?.isBusiness) ?
                                    <>
                                        <Link to="/landing-page" onClick={privateButton}><button className="hidden lg:inline-block rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                            User Profile
                                        </button></Link>
                                        <Link to={`/business/${userProfile?.isBusiness?.businessNameSlug}/`} onClick={privateButton}><button className="rounded-xl lg:inline-block hidden font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                            My Business
                                        </button></Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/landing-page" onClick={privateButton}><button className="hidden lg:inline-block rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                            User Profile
                                        </button></Link>
                                        <Link to="/business" onClick={privateButton}><button className="rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br lg:inline-block  hidden from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                            Start Business
                                        </button></Link>
                                    </>
                                :
                                <>
                                    <Link to="/business" onClick={privateButton}><button className="hidden lg:inline-block rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Start Business
                                    </button></Link>
                                </>
                            }
                            <Link to="/business-near-by"><button className="hidden lg:inline-block rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                Near By Business
                            </button></Link>

                            {user ?
                                <>
                                    <button onClick={logoutUser} className="hidden lg:inline-block rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Logout
                                    </button>
                                </>
                                :
                                <>
                                    <Link to="/login"><button className="hidden lg:inline-block rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Login
                                    </button></Link>
                                    <Link to="/signUp"><button className="hidden lg:inline-block rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                        Sign Up
                                    </button></Link>
                                </>
                            }

                            <section className="MOBILE-MENU flex lg:hidden">
                                <div
                                    className="HAMBURGER-ICON space-y-2"
                                    onClick={() => setIsNavOpen((prev) => !prev)}
                                >
                                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                                </div>

                                <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                                    <div
                                        className="absolute top-0 right-0 px-8 py-8"
                                        onClick={() => setIsNavOpen(false)}
                                    >
                                        <svg
                                            className="h-8 w-8 text-gray-600"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </div>
                                    <ul className="flex flex-col items-center justify-between min-h-[250px]">
                                        {/* <li className="border-b border-gray-400 my-8 uppercase"> */}
                                        <NavLink to="/" className={isActiveClass} onClick={() => { setIsNavOpen(false) }}>
                                            HOME
                                        </NavLink>

                                        <NavLink to="/aboutUs" className={isActiveClass} onClick={() => { setIsNavOpen(false) }}>
                                            ABOUT US
                                        </NavLink>


                                        <NavLink to="/contactUs" className={isActiveClass} onClick={() => { setIsNavOpen(false) }}>
                                            CONTACT US
                                        </NavLink>

                                        {user ?
                                            (userProfile?.isBusiness) ?
                                                <>
                                                    <Link to={`/business/${userProfile?.isBusiness?.businessNameSlug}/`} onClick={privateButton} ><button className="rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                                        My Business
                                                    </button></Link>
                                                </>
                                                :
                                                <>
                                                    <Link to="/business" onClick={privateButton}><button className="rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                                        Start Business
                                                    </button></Link>
                                                </>
                                            :
                                            <Link to="/business" onClick={privateButton}><button className=" lg:inline-block rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                                Start Business
                                            </button></Link>
                                        }
                                        <Link to="/business-near-by" onClick={() => { setIsNavOpen(false) }}><button className=" lg:inline-block rounded-xl  font-sans  mr-5 mt-2 bg-gradient-to-br   from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                            Near By Business
                                        </button></Link>

                                        {user ?
                                            <>
                                                <button onClick={logoutUser} className=" lg:inline-block rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                                    Logout
                                                </button>
                                            </>
                                            :
                                            <>
                                                <Link to="/login" onClick={() => { setIsNavOpen(false) }}><button className=" lg:inline-block rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                                    Login
                                                </button></Link>
                                                <Link to="/signUp" onClick={() => { setIsNavOpen(false) }}><button className=" lg:inline-block rounded-xl font-sans mr-5 mt-2 bg-gradient-to-br from-[#08744c] to-[#afe9d1] px-8 py-2 text-base font-medium text-white transition  hover:shadow-lg hover:shadow-[#1d5742]/50 duration-700">
                                                    Sign Up
                                                </button></Link>
                                            </>
                                        }

                                    </ul>

                                </div>
                            </section>


                        </div>
                    </div>
                </header>

                <div className={`mt-[100px] overflow-y-auto  ${isNavOpen ? "hidden" : "block"}`}>
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

            <style>{`
                .hideMenuNav {
                    display: none;
                }
                .showMenuNav {
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
            `}</style>
        </>
    )
}

export default Navbar;
