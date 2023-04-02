import React from 'react'

import css from './RatingUtil.module.css'

const RatingUtil = ({rating, count, txt}) => {
  return <div className={css.outerDiv}>
    <div className={css.innerDiv}>
      <div className={css.left}>
        <div className={css.rating}>
          <span className={css.ratingTxt}>{rating}</span>
          <img src={'/icons/star.png'} className={css.starIcon} />
        </div>
      </div>
      <div className={css.right}>
        <div className={css.count}>{count}</div>
        <div className={css.txt}>{txt}</div>
      </div>
    </div>
  </div>
}

export default RatingUtil