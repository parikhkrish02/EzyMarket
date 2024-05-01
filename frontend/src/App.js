import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import UserProfilePage from './components/UserProfilePage';
import Business from './pages/Business';
import SignUp from './components/SignUp';
import AuthState from './context/Auth/AuthState';
import UserProfileState from './context/UserProfile/UserProfileState';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import BusinessNearMe from './pages/BusinessNearMe';
import AboutUs from './components/AboutUs';
import WelcomeCards from './components/WelcomeCards';
import ContactUs from './components/ContactUs';
import BusinessPage from './pages/BusinessPage/BusinessPage';


const App = () => {
    return (
        <>
            <AuthState>
                <Router>
                    <UserProfileState>

                        <Routes>
                            <Route path='/' element={<Navbar />} >

                                <Route element={<Home />}>
                                    <Route index element={<WelcomeCards />} />
                                    <Route path='aboutUs' element={<AboutUs />} />
                                    <Route path='contactUs' element={<ContactUs />} />
                                </Route>

                                <Route element={<ProtectedRoute />}>

                                    <Route path='/landing-page' element={<LandingPage />} />

                                    <Route path='/profile/:username' element={<UserProfilePage />} />

                                    <Route path='/business' element={<Business />} />
                                    <Route path='/business/:businessNameSlug' element={<BusinessPage />} />
                                    <Route path='/business/:businessNameSlug/:page' element={<BusinessPage />} />
                                </Route>

                                <Route path='/business-near-by' element={<BusinessNearMe />} />
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/signUp" element={<SignUp />} />
                                <Route path="*" element={<PageNotFound />} />

                            </Route>
                        </Routes>
                    </UserProfileState>
                </Router>
            </AuthState>
        </>
    )
}

export default App;
