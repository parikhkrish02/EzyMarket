import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import AuthContext from '../context/Auth/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import './BusinessNearMe.css'

const BusinessNearMe = () => {

    const { user } = useContext(AuthContext)
    const [businessNearBy, setBusinessNearBy] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchBusiness = async () => {
        let response = await fetch('http://192.168.182.75:8000/api/businesses-near-me/')
        if (response.status === 200) {
            let data = await response.json()
            setBusinessNearBy(data)
        }
        else {
            toast.error('Internal Server Error', {
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


    const privateButton = () => {
        if (!user) {
            toast.info('Login to Continue', {
                autoClose: 3000,
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
            <fieldset className="fieldset" id="fdset">
                <legend className="legend" id="nearmeheading">
                    Businesses Near You
                </legend>

                <div className="flex ml-7 p-8" id="cardinview">

                    {businessNearBy.map((business) => {
                        return <div key={business.isBusiness.id} onClick={privateButton}
                            className={`!z-5 m-3 relative flex flex-col rounded-[20px] max-w-screen-lg   bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col !p-4 3xl:p-![18px] ${business.isBusiness.isActive ? 'bg-[#e4f4ed]' : 'bg-[#f4e5e4]'} undefined`}>
                            <div className="h-full ">
                                <div className="relative w-full">

                                    {/* DYNAMIC IMAGE LEFT */}
                                    <img src="/images/2022-04-01.jpg" className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt="" />

                                    <button
                                        className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                                        <div
                                            className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                                                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z">
                                                </path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                                    <div className="mb-2">
                                        <p className="text-lg font-bold text-navy-700">{business.isBusiness.businessName}</p>
                                        <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">{business.isBusiness.contactNo}</p>
                                        <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">{business.isBusiness.businessCategory}</p>
                                    </div>

                                </div>
                                <div className="flex items-center justify-between md:items-center lg:justify-between ">
                                    <div className="flex">
                                        <p className={`!mb-0 text-sm font-bold text-brand-500 ${business.isBusiness.isActive ? 'text-[#186444]' : 'text-red-700'} tracking-wider`}>
                                            {business.isBusiness.isActive ?
                                                <>Open now</>
                                                :
                                                <>Closed</>
                                            }
                                        </p>
                                    </div>
                                    <Link to={`/business/${business.isBusiness.businessNameSlug}/`}
                                        className={`linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 ${business.isBusiness.isActive ? 'bg-[#378131]' : 'bg-[#ba2727]'} `}>Show
                                        Details</Link>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

            </fieldset>
        </>
    )
}

export default BusinessNearMe