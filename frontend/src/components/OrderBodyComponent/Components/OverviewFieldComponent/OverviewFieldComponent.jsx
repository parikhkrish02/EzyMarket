import { Link } from "react-router-dom"

import css from './OverviewFieldComponent.module.css'

const OverviewFieldComponent = () => {

  const moreInfo = ["Breakfast", "Takeaway Available", "Family Friendly", "Indoor Seating"]

  return <div className={css.outerDiv}>
    <div className={css.innerDiv}>
      <div className={css.leftBox}>
        <div className={css.ttl}>About this place</div>
        <div className={css.menuSec}>
          <div className={css.subTtl}>Photos</div>
          <div>
            <Link to={`photos`} className={css.menuLink}>See all Photos</Link>
            <img src={'/icons/right-arrow.png'} className={css.rightArrowIcon} alt="right arrow" />
          </div>
        </div>

        <div className={css.sec2}> 
            <div className={css.subTtl}>More Info</div>
            <div className={css.ulList}>
              {moreInfo?.map((val , id)=> {
                return <li key={id} className={css.list}>{val}</li>
              })}
            </div>
        </div>
      </div>
    </div>
  </div>
}

export default OverviewFieldComponent