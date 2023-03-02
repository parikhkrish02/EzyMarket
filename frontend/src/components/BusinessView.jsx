import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const BusinessView = () => {

    const { businessNameSlug } = useParams()
    const [isActive, setIsActive] = useState(null)
    const [business, setBusiness] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchBusiness = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/business/${businessNameSlug}/`, {
            'method': "GET",
        })

        if (response.status === 200) {
            let data = await response.json()
            setBusiness(data.isBusiness)
            setIsActive(data.isBusiness.isActive)
        }
        else {
            let data = await response.json()
            toast.error(data, {
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
    }, [isActive])


    if (loading || !business) {
        return <>
            Loading...
        </>
    }

    return (
        <>
            {business.businessName}
            <br />
            Status: {isActive ? <>In Service</> : <>Current Closed</>}
            <br />
            Contact info: {business.contactNo}
            <br />

            {business.categories.map((category) => {

                return <div key={category.id}>
                    {category.categoryName}
                    <div className='ml-5'>

                        {category.items.map((item) => {
                            return <div key={item.id}>
                                {item.itemName} :-
                                <div className='ml-5'>
                                    Qty: {item.quantity}
                                    <br />
                                    Price: {item.price}
                                    <br />
                                </div>
                            </div>
                        })}

                    </div>
                </div>

            })}
        </>
    )
}

export default BusinessView