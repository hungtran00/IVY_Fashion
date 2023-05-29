import styles from './Banner.module.scss'
import classNames from 'classnames/bind'
import {BsArrowLeft,BsArrowRight} from 'react-icons/bs'
import { useState } from 'react'
const cx = classNames.bind(styles)




function Banner() {
    const scrollToProduct = () => {
        var screenHeight = window.innerHeight
        window.scrollTo(0, screenHeight)
    }
    
    
    const images = [
        "https://pubcdn.ivymoda.com/files/news/2023/05/24/9572a429f14f1b76d6e0c94bbd129837.jpg",
        "https://pubcdn.ivymoda.com/files/news/2023/03/06/dd8cd9fb84343609f1dfb9a5a7c96609.jpg",
        "https://pubcdn.ivymoda.com/files/news/2023/05/11/35cbc7f406f32b21a8ceee16f41ab9bd.gif",
        "https://pubcdn.ivymoda.com/files/news/2023/04/11/55836306652720d955e42831d0577809.jpg",
        "https://pubcdn.ivymoda.com/files/news/2023/04/18/4859e07eab26c0374c8c75212095403a.jpg"
        
    ]
    
    const [crr, setCrr] = useState(0)

    const Next = () => {
        setCrr(crr === images.length - 1 ? 0 : crr + 1)
    }
    

    const Prev = () => {
    setCrr(crr === 0 ? images.length - 1 : crr - 1)
    }
    
    const Nextslider = (idex) => {
        setCrr(idex)
    }
    return (
        <div className={cx('bannertop')}>
            <div className={cx('bannertop__img')}>
                {images.map((image,index)=>{
                    return (
                        <div key={index} className={cx('bannertop__item')}>
                            {index === crr && ( 
                                <img src={image} alt="" />
                            )}
                        </div>
                    )
                })}
            </div>
            <div className={cx('bannertop__list')}>
                {images.map((item,idex) => {
                    return (
                        <div className={cx('bannertop__list_item')} key={idex} onClick={() => Nextslider(idex)}>
                            <div className={cx(crr === idex ? 'bannertop__list_item_red' : 'bannertop__list_item_black')}>
                                .
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={cx('bannertop__container')}>
            </div>
            <div className={cx('btnLeft')}>
                <BsArrowLeft onClick={Prev} />
            </div>
            <div className={cx('btnRight')}>
                <BsArrowRight onClick={Next}/>
            </div>
           
        </div>

    )
}
export default Banner