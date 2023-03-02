import React, { useContext } from 'react'
import AuthContext from '../context/Auth/AuthContext'

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            Welcome, {user}
        </div>
    )   
}

export default Home
