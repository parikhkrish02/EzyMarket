import { createPortal } from 'react-dom'

import css from './AddItemModal.module.css'
import { useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const EditModal = ({ setItemModal, activeCategory, businessNameSlug }) => {

    const [item, setItem] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)


    // const [file, setFile] = useState();
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }

    const changeQuantity = (e) => {
        setQuantity(e.target.value);
    }
    const changeItem = (e) => {
        setItem(e.target.value);
    }
    const changePrice = (e) => {
        setPrice(e.target.value);
    }
    // const changeFile = (e) => {
    //     setPrice(e.target.value);
    // }

    const submitItem = async () => {
        if (item === '' || item === ' ') {
            toast.error("Item can't be Empty !!", {
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
            let response = await fetch(`http://127.0.0.1:8000/api/business/addItem/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "businessNameSlug": businessNameSlug, "category": activeCategory, "item": item, "quantity": quantity, "price": price })
            })

            // let data = await response.json()
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
                toast.success(`Item added : ${item}`, {
                    // positon: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
            setItemModal(val => !val)
        }
    }

    const domObj = <><div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.header}>
                <div className={css.headerLeft}>
                    <div className={css.title}>Add Item in <span className='text-green-700'>{activeCategory} </span></div>
                </div>
                <span className={css.closeBtn} onClick={() => setItemModal(val => !val)}>
                    <img className={css.closeBtnImg} src={'/icons/closeBtn.jpg'} alt="close button" />
                </span>
            </div>
            <div className={css.bdy}>
                <form>
                    Enter Item:
                    <input type="text" className='border-2 m-2 p-2' onChange={changeItem} />
                    <br />
                    Enter Quantity:
                    <input type="number" className='border-2 m-2 p-2' onChange={changeQuantity} defaultValue={0} />
                    <br />
                    {/* <AddItemPhoto setAnyUpload={setAnyUpload} setFiles={setFiles} files={files} isError={isError} setIsError={setIsError} setErrorMessage={setErrorMessage} errorMessage={errorMessage} /> */}
                    <h2>Add Image:</h2>
                    {/* <input type="file" id="file-input" name="ImageStyle" onChange={changeFile}/>
                    <img src={file} /> */}
                    <br />
                    Enter Price:
                    <input type="number" className='border-2 m-2 p-2' onChange={changePrice} defaultValue={0} />
                    <br />
                    <button onClick={submitItem} className='mt-5'>Submit</button>
                </form>
            </div>
        </div>
    </div>
    </>

    return createPortal(domObj, document.getElementById('modal'));
}

export default EditModal