import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Auth/AuthContext';
import UserProfileContext from "./UserProfileContext";

const UserProfileState = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [userProfile, setUserProfile] = useState(null)

    const fetchUserProfile = async () => {
        if (user) {
            let response = await fetch(`${process.env.React_App_BACKEND_HOST}/api/profile/${user}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 200) {
                let data = await response.json()
                setUserProfile(data)
            }
            else {
                alert("user doesnt exists")
            }
        }
    }

    useEffect(() => {
        fetchUserProfile()

        // eslint-disable-next-line
    }, [user])


    let contextData = {
        userProfile: userProfile
    }

    return (
        <UserProfileContext.Provider value={contextData}>
            {children}
        </UserProfileContext.Provider>
    )
}

export default UserProfileState;