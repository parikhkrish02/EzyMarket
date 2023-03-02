import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import UserProfileContext from '../context/UserProfile/UserProfileContext';

const UserProfilePage = () => {

    const viewingProfile = useParams()
    const { userProfile } = useContext(UserProfileContext)

    if (!userProfile) {
        return <>Loading..</>
    }
    
    if (viewingProfile.username !== userProfile.user.username) {
        return <>
            Can't View Others Profile
        </>
    }

    return (
        <>
            username: {userProfile.user.username}
            <br />
            email: {userProfile.user.email}
            <br />
            date_joined: {userProfile.user.date_joined}
            <br />
            last_login: {userProfile.user.last_login}
            <br />
            bio: {userProfile.bio}
            <br />
        </>
    )
}

export default UserProfilePage;