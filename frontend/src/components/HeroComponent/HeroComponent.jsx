import React from 'react'
import css from './HeroComponent.module.css'

import GalleryImgCard from '../../components/GalleryImgCard/GalleryImgCard'
import AddPhotosCard from '../../components/AddPhotosCard/AddPhotosCard'
import ViewGalleryImgCard from '../../components/ViewGalleryImgCard/ViewGalleryImgCard'

const HeroComponent = () => {
  return <div className={css.outerDiv}>
    <div className={css.innerDiv}>
      <div className={css.scr1}>
        <GalleryImgCard imgSrc={'/images/food1.jpg'} />
      </div>
      <div className={css.scr2}>
          <GalleryImgCard imgSrc={'/images/food2.jpg'} />
          <ViewGalleryImgCard imgSrc={'/images/food1.jpg'}/>
          <GalleryImgCard imgSrc={'/images/food3.jpg'} />
          <AddPhotosCard />
      </div>
    </div>
  </div>
}

export default HeroComponent