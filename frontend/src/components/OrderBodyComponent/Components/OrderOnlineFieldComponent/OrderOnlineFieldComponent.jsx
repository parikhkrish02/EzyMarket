import css from './OrderOnlineFieldComponent.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../../context/Auth/AuthContext';
import io from 'socket.io-client'

import EditModal from '../../../EditModal/EditModal'
import AddItemModal from '../../../AddItemModal/AddItemModal'

const OrderOnlineFieldComponent = () => {

  const [categoryModal, setCategoryModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null)

  const socket = io.connect("http://localhost:3001/")

  const { user } = useContext(AuthContext)
  const { businessNameSlug } = useParams()
  const [isActive, setIsActive] = useState(null)
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)

  const [isOwner, setIsOwner] = useState(false)

  const fetchBusiness = async () => {

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
        fetchBusiness()

        return () => clearInterval(id)
      })
    }, 100);

    return () => clearInterval(id)

    // eslint-disable-next-line
  }, [socket])


  useEffect(() => {

    setLoading(true)
    fetchBusiness()
    setLoading(false)

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchBusiness()
  }, [itemModal, categoryModal])

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

  const addItem = (e) => {
    setItemModal(true)
    setActiveCategory(e)
  }

  if (loading || !business) {
    return <>
      Loading...
    </>
  }


  return <div className={css.outerDiv}>
    <div className='m-2'>
      <span className={css.ttl}> Status: {isActive ? <span className='bg-green-300'>In Service</span> : <span className='bg-red-200'>Current Closed</span>}</span>
      {isOwner ?
        <label className="relative inline-flex items-center mr-5 cursor-pointer ml-2" >
          <input type="checkbox" value="" onClick={toggleActive} className="sr-only peer" defaultChecked={isActive} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
        :
        ""
      }
    </div>
    <div className={css.innerDiv}>
      <div className={css.leftBox}>
        {business.categories.map((item) => {
          return <div key={item.id} className={css.navTab}>
            {isOwner ?
              <button onClick={() => addItem(item.categoryName)}>{item.categoryName} +</button>
              :
              item.categoryName
            }
          </div>
        })}
        {isOwner ?
          <div className={css.navTab} onClick={() => setCategoryModal(true)}>Add</div>
          :
          <></>
        }
      </div>
      <div className={css.my}>
        <div className={css.itemsBox} id='itemsBox'>
          {business.categories.map((category) => {

            return <div key={category.id}>

              <div className={css.secTtl}>{category.categoryName}</div>

              {category.items.map((item) => {
                return <div key={item.id}>
                  <div className={css.outerDiv}>
                    <div className={css.innerDiv}>
                      <div className={css.imgBox}>
                        <img src={`http://127.0.0.1:8000${item.image}`} className={`${css.img} h-[130px]`} alt='food item' />
                      </div>
                      <div className={css.box}>
                        <div className={css.ttl}>{item.itemName}</div>
                        {/* <div className={css.box}> */}
                        <div className={css.price}>₹{item.price}</div>
                        Quantity: {item.quantity}
                        <br />
                        {isOwner ?
                          <button onClick={() => incr(item)}>+</button>
                          :
                          ""
                        }
                        <br />
                        {isOwner ?

                          <button onClick={() => decr(item)}>-</button>
                          :
                          ""
                        }
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              })}

            </div>

          })}
        </div>
      </div>
    </div>

    {categoryModal ? <EditModal setCategoryModal={setCategoryModal} businessNameSlug={business.businessNameSlug} /> : ""}
    {itemModal ? <AddItemModal setItemModal={setItemModal} activeCategory={activeCategory} businessNameSlug={business.businessNameSlug} /> : ""}
  </div>
}

export default OrderOnlineFieldComponent


