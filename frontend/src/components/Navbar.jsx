import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
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
                position: "top-right",
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
        <div>
            <Link to="/" onClick={privateButton} className="mr-5">Home</Link>
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
            }

            {/* custom Toast - components can call like a alert */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Navbar;
