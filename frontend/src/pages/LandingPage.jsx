import React, { useContext } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import useGeoLocation from "../hooks/useGeoLocation";

const LandingPage = () => {

    const { user } = useContext(AuthContext)
    const location = useGeoLocation()

    return (
        <div>
            Welcome, {user}
            <br />
            <br />
            {location.loaded ?
                location.error ?
                    <>{location.error.message}</>
                    :
                    <>
                        Location Coordinates are :
                        <br />
                        Latitude: {location.coordinates.lat}
                        <br />
                        Longitude: {location.coordinates.lng}
                    </>
                : "User Denied Location Access"
            }
        </div>
    )
}

export default LandingPage
