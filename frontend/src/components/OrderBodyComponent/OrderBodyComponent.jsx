import { useState, useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom"

import css from './OrderBodyComponent.module.css'

import OverviewFieldComponent from './Components/OverviewFieldComponent/OverviewFieldComponent'
// import OrderOnlineFieldComponent from './Components/OrderOnlineFieldComponent/OrderOnlineFieldComponent'
import PhotosComponent from './Components/PhotosComponent/PhotosComponent'
import OrderOnlineFieldComponent from './Components/OrderOnlineFieldComponent/OrderOnlineFieldComponent'
// import ReviewsComponent from './Components/ReviewsComponent/ReviewsComponent'
// import MenuComponent from './Components/MenuComponent/MenuComponent'

const OrderBodyComponent = () => {

    const { businessNameSlug } = useParams()
    const [pageCompo, setPageComp] = useState("")

    const { page = "" } = useParams();

    const isActiveClass = (e) => {
        if (e?.isActive) {
            return [css.menuTxt, css.menuTxtActive].join(" ");
        } else {
            return css.menuTxt;
        }
    }

    useEffect(() => {
        switch (`/${page}`) {
            // case `/${city}/${hotel}/`:
            //     setPageComp(<OverviewFieldComponent />);
            //     break;
            case `/order`:
                setPageComp(<OrderOnlineFieldComponent />);
                break;
            // case `/reviews`:
            //     setPageComp(<ReviewsComponent />);
            //     break;
            case `/photos`:
                setPageComp(<PhotosComponent />);
                break;
            // case `/menu`:
            //     setPageComp(<MenuComponent />);
            //     break;
            default:
                setPageComp(<OverviewFieldComponent />);
        }
    }, [page])


    return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.menu}>
                <NavLink to={`/business/${businessNameSlug}/`} className={isActiveClass}>
                    Overview
                </NavLink>
                <NavLink to={`/business/${businessNameSlug}/order`} className={isActiveClass}>
                    Order
                </NavLink>
                {/* <NavLink to={`/reviews`} className={isActiveClass}>
                Reviews
                </NavLink> */}
                <NavLink to={`/business/${businessNameSlug}/photos`} className={isActiveClass}>
                    Photos
                </NavLink>
                {/* <NavLink to={`/menu`} className={isActiveClass}>
                Menu
                </NavLink> */}
            </div>
            <div className={css.componentsBody}>
                {pageCompo}
            </div>
        </div>
    </div>
}

export default OrderBodyComponent