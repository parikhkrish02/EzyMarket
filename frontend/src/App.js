import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import UserProfilePage from './components/UserProfilePage';
import NewBusiness from './pages/NewBusiness';
import SignUp from './components/SignUp';
import AuthState from './context/Auth/AuthState';
import UserProfileState from './context/UserProfile/UserProfileState';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import BusinessView from './pages/BusinessView';
import BusinessNearMe from './pages/BusinessNearMe';

const App = () => {
    return (
        <>
            <AuthState>
                <Router>
                    <UserProfileState>
                        <Navbar />

                        <Routes>

                            <Route element={<ProtectedRoute />}>
                                <Route path='/' element={<Home />} />
                                <Route path='/profile/:username' element={<UserProfilePage />} />

                                <Route path='/newBusiness' element={<NewBusiness />} />
                                <Route path='/business-near-by' element={<BusinessNearMe />} />
                                <Route path='/business/:businessNameSlug' element={<BusinessView />} />
                            </Route>

                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signUp" element={<SignUp />} />
                            <Route path="*" element={<PageNotFound />} />

                        </Routes>
                    </UserProfileState>
                </Router>
            </AuthState>
        </>
    )
}

export default App;
