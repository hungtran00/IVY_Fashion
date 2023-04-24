import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind'
import styles from './Scroll.module.scss'
import {FaArrowUp} from 'react-icons/fa'


const cx = classNames.bind(styles)

const Scroll = () => {
    const [scroll,setscroll] = useState(false)
   

    useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setscroll(true);
      } else {
        setscroll(false);
      }
    });
  }, []);
  const scrollTop = ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
        
    })
  }
    return (
        <div className={cx('Scroll')}>
            {scroll && (
                <FaArrowUp onClick={scrollTop} className={cx('Scroll__top')}/>

            )}
            
           
        </div>
    );
};

export default Scroll;