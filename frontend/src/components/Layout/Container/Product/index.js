import styles from './Product.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProduct } from '../../../../reducers/product/productSlice'
import Loading from '../../../../pages/Loading'
import { Link } from 'react-router-dom'
import { addToCart } from '../../../../reducers/cart/cartSlice'



const cx = classNames.bind(styles)
function Product() {
    const [heart,setHeart] = useState('')
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(getProduct())
    }, [])
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div className={cx('product')}>
            <div className={cx('product__title')}>
                Products
            </div>
            <div className={cx('product__list')}>
                {
                    product.data.length === 0 ? <Loading /> : product.data.map((item, index) => {

                        const imgSrc1 = `/img/product/${item.img}`
                        // const imgSrc2 = `/img/product/1-${item.img}` 
                        const path = `/shop/${item._id}`
                        if (index)
                            return (
                                <div key={item._id} className={cx('product__item')}>
                                    <Link to={path} className={cx('product__img')}>
                                        <img src={imgSrc1} />
                                        {/* <img className={cx('img__change')} src={imgSrc2} /> */}
                                    </Link>
                                    <div className={cx('product__content')}>
                                        <div className={cx('product__innercontent')}>
                                            <span>{item.name}</span>
                                            <span>${item.price}.00</span>
                                            <button onClick={() => handleAddToCart(item)}>ADD TO CART</button>
                                            <div className={cx('product__icon')} style={{color: heart === index ? 'red' : 'black'}}>
                                                <FontAwesomeIcon icon={faHeart} onClick={()=> setHeart(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    })
                }
               
            </div>
        </div>
    )
}

export default Product