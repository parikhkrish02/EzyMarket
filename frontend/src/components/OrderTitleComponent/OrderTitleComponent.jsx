import React, { useEffect, useState } from 'react'

import css from './OrderTitleComponent.module.css'

import RatingUtil from '../../components/RatingUtil/RatingUtil'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom'

const OrderTitleComponent = () => {

    const { businessNameSlug } = useParams()
    const [business, setBusiness] = useState(null)
    const [loading, setLoading] = useState(false)
    const [owner, setOwner] = useState(null)

    const fetchBusiness = async () => {
        let response = await fetch(`${process.env.React_App_BACKEND_HOST}/api/business/${businessNameSlug}/`, {
            'method': "GET",
        })

        if (response.status === 200) {
            let data = await response.json()
            setOwner(data.user.username)
            setBusiness(data.isBusiness)
        }
        else {
            let data = await response.json()
            toast.error(data, {
                // positon: "top-right",
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
    }, [])


    if (loading) {
        return <>Loading</>
    }

    return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.left}>
                <div className={css.title}>{business?.businessName}</div>
                <div className={css.specials}>Owner: {owner}</div>
                <div className={css.specials}>{business?.businessCategory}</div>
                <div className={css.address}>{business?.contactNo}</div>
            </div>
            <div className={css.right}>
                <RatingUtil rating="4.1" count="601" txt="Reviews" />
            </div>
        </div>
    </div>
}

export default OrderTitleComponent