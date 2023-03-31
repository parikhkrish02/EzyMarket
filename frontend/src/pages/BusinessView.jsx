import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/Auth/AuthContext';
import io from 'socket.io-client'


const BusinessView = () => {
    const socket = io.connect("http://localhost:3001/")

    const { user } = useContext(AuthContext)
    const { businessNameSlug } = useParams()
    const [isActive, setIsActive] = useState(null)
    const [business, setBusiness] = useState(null)
    const [loading, setLoading] = useState(true)

    const [isOwner, setIsOwner] = useState(false)

    const fetchBusiness = async () => {
        console.log('Hello World');
        let response = await fetch(`http://127.0.0.1:8000/api/business/${businessNameSlug}/`, {
            'method': "GET",
        })

        if (response.status === 200) {
            let data = await response.json()
            setBusiness(data.isBusiness)
            setIsActive(data.isBusiness.isActive)
            if (data.user.username === user) {
                setIsOwner(true)
            }
            else {
                setIsOwner(false)
            }
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

    const sendUpdate = () => {
        socket.emit("send_update")
    }

    useEffect(() => {

        let id = setInterval(() => {
            socket.on("update", () => {
                console.log("updated");
                fetchBusiness()

                return () => clearInterval(id)
            })
        }, 5000);

        return () => clearInterval(id)

        // eslint-disable-next-line
    }, [socket])


    useEffect(() => {
        console.log('called');
        setLoading(true)
        fetchBusiness()
        setLoading(false)

        // eslint-disable-next-line
    }, [])

    const toggleActive = async () => {
        await fetch(`http://127.0.0.1:8000/api/business/${businessNameSlug}/toggleActive/`)
        setIsActive(!isActive)
        sendUpdate()
    }

    const incr = async (item) => {
        await fetch(`http://127.0.0.1:8000/api/business/updateItem/${item.id}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "type": "incr" })
        })
        await fetchBusiness()
        sendUpdate()
    }

    const decr = async (item) => {
        if (item.quantity === 0) {
            toast.error("Item can't be less than 0 !!", {
                // positon: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        else {
            await fetch(`http://127.0.0.1:8000/api/business/updateItem/${item.id}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "type": "decr" })
            })
            await fetchBusiness()
            sendUpdate()
        }
    }

    // eslint-disable-next-line
    const changeQty = async (e, item) => {
        if (e.target.value === "" || e.target.value === " ") {
            return;
        }
        else if (e.target.value < 0) {
            toast.error("Item can't be less than 0 !!", {
                // positon: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        else {
            await fetch(`http://127.0.0.1:8000/api/business/updateItem/${item?.id}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "type": "change", "quantity": e.target.value })
            })
            await fetchBusiness()
            sendUpdate()
        }
    }

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
            {isOwner ?
                <label className="relative inline-flex items-center mr-5 cursor-pointer" >
                    <input type="checkbox" value="" onClick={toggleActive} className="sr-only peer" defaultChecked={isActive} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
                :
                ""
            }
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

                                    {isOwner ?
                                        <button onClick={() => incr(item)}>+</button>
                                        :
                                        ""
                                    }

                                    Quantity: {item.quantity}
                                    {isOwner ?

                                        <button onClick={() => decr(item)}>-</button>
                                        :
                                        ""
                                    }

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