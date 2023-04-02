import { createPortal } from 'react-dom'

import css from './EditModal.module.css'
import { useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const EditModal = ({ setCategoryModal, businessNameSlug }) => {

    const [category, setCategory] = useState('')
    const [categoryType, setCategoryType] = useState('')

    const changeCategory = (e) => {
        setCategory(e.target.value);
    }

    const changeCategoryType = (e) => {
        setCategoryType(e.target.value);
    }

    const submitCategory = async () => {
        if (category === '' || category === ' ' || categoryType === '') {
            toast.error("Category can't be Empty !!", {
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
            let response = await fetch(`http://127.0.0.1:8000/api/business/addCategory/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "businessNameSlug": businessNameSlug, "categoryName": category, "categoryType": categoryType })
            })

            if (response.status !== 200) {
                toast.error(response.statusText, {
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
                toast.success(`Category added : ${category}`, {
                    // positon: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }


            setCategoryModal(val => !val)
        }
    }


    const domObj = <><div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.header}>
                <div className={css.headerLeft}>
                    <div className={css.title}>Add Category</div>
                </div>
                <span className={css.closeBtn} onClick={() => setCategoryModal(val => !val)}>
                    <img className={css.closeBtnImg} src={'/icons/closeBtn.jpg'} alt="close button" />
                </span>
            </div>
            <div className={css.bdy}>
                Enter Category:
                <input type="text" className='border-2 m-2 p-2' onChange={changeCategory} />
                <br />
                Enter Category Type:
                <input type="text" className='border-2 m-2 p-2' onChange={changeCategoryType} />
                <br />
                <button onClick={submitCategory} className='mt-5'>Submit</button>
            </div>
        </div>
    </div>
    </>

    return createPortal(domObj, document.getElementById('modal'));
}


export default EditModal;