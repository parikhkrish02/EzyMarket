import css from './BusinessPage.module.css'
import { Link, useParams } from 'react-router-dom'
import HeroComponent from '../../components/HeroComponent/HeroComponent'
import OrderTitleComponent from '../../components/OrderTitleComponent/OrderTitleComponent'
import OrderBodyComponent from '../../components/OrderBodyComponent/OrderBodyComponent'

const RestaurantPage = () => {

  const { businessNameSlug } = useParams()

  return <div className={css.outerDiv}>
    <div className={css.innerDiv}>
      <div className={css.breadcrumb}>
        <Link to='/' className='hover:text-red-500 m-1'>Home</Link>
        /
        <Link to='/business-near-by' className='hover:text-red-500 m-1'>Near by Business</Link>
        /
        <span className='m-1'>{businessNameSlug}</span>
      </div>
    </div>
    <HeroComponent />
    <div className={css.innerDiv2}>
      <OrderTitleComponent />
      <OrderBodyComponent />
    </div>
  </div>
}

export default RestaurantPage