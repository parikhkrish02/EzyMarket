import { useState } from 'react'

import RedButton from '../../../RedButton/RedButton'

import GalleryImgCard from '../../../GalleryImgCard/GalleryImgCard'


import css from './PhotosComponent.module.css'

const PhotosComponent = () => {
  let biryaniImg = '/images/food1.jpg'
  let biryaniImg2 = '/images/food2.jpg'
  let biryaniImg3 = '/images/food3.jpg'

  const allPhotosData = [
    {
      imgSrc: biryaniImg
    },
    {
      imgSrc: biryaniImg2
    },
    {
      imgSrc: biryaniImg3
    },
  ]

  const [state, setState] = useState(allPhotosData)

  return <div className={css.outerDiv}>
    <div className={css.btns}>
      <RedButton txt="All" count={allPhotosData.length} onClick={() => setState(allPhotosData)} />
    </div>
    <div className={css.photoCards}>
      {state?.map((item, id) => {
        return <div key={id} className={css.imgCard}>
          <GalleryImgCard imgSrc={item.imgSrc} />
        </div>
      })}
    </div>
  </div>
}

export default PhotosComponent