import React from 'react';
import styles from "./CartItem.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const CartItem = () => {
    //Dữ liệu lấy về thuộc dạng mảng nên phải parser data từ string sang json
    const dataProduct = JSON.parse(sessionStorage.getItem('cart'))
    console.log(dataProduct)
    return (
                <div className={cx('cart')}>
                    <div className={cx('cart__title')}>SẢN PHẨM ĐÃ MUA</div>
                    <div className={cx('cart__container')}>
                        <div className={cx('cart__content')}>
                            <ul className={cx('cart__label')}>
                                <li></li>
                                <li>SẢN PHẨM</li>
                                <li>GIÁ</li>
                                <li>SỐ LƯỢNG</li>
                                <li>TỔNG</li>
                            </ul>
                            {dataProduct.map((item)=>{
                                return (
                                    <>
                                    <ul key={item._id} className={cx('cart__item')}>
                                    <li className={cx("cart__img")}>
                                    <img src={require(`../../../public/img/product/${item.img}`)}
                                    />
                                    </li>
                                    <li className={cx("cart__name")}>{item.name}</li>
                                    <li className={cx("cart__price")}>${item.price}.00</li>
                                    <li className={cx("cart__price")}>${item.cartQuanlity}</li>
                                    <li className={cx("cart__subtotal")}>
                                         ${parseInt(item.price) * parseInt(item.cartQuanlity)}.00
                                    </li>
                                    </ul>
                                    </>
                                )
                            })}
                            <span>
                            Total: $
                            {dataProduct.reduce((sum, item) => {
                                return sum + parseInt(item.price) * parseInt(item.cartQuanlity);
                            }, 0)}
                            .00
                            </span>
                        </div>
                    </div>
                </div>
       
    );
};

export default CartItem;