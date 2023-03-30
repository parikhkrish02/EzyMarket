import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const BusinessNearMe = () => {

    const [businessNearBy, setBusinessNearBy] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchBusiness = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/businesses-near-me/')
        if (response.status === 200) {
            let data = await response.json()
            console.log(data);
            setBusinessNearBy(data)
        }
        else {
            toast.error('Internal Server Error', {
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

    useEffect(() => {

        setLoading(true)
        fetchBusiness()
        setLoading(false)

        // eslint-disable-next-line
    }, [])

    if (loading || !businessNearBy) {
        return <>
            Loading..
        </>
    }


    return (
        <>
            {businessNearBy.map((business) => {

                return <Link to={`/business/${business.isBusiness.businessNameSlug}/`} key={business.isBusiness.id}>

                    {business.isBusiness.businessName}
                    <br />
                    Status: {business.isBusiness.isActive ? <>In Service</> : <>Current Closed</>}
                    <br />
                    Contact info: {business.isBusiness.contactNo}
                    <br />

                </Link>

            })}
        </>
    )
}

export default BusinessNearMe