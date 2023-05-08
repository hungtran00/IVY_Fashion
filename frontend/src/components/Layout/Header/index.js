import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import {
  faBars,
  faXmark,
  faLocationDot,
  faUserTie,
  faEnvelope,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCart } from "../../../reducers/cart/cartSlice";
import { useRef } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Header() {
  const [selectCart, setSelectCart] = useState(false);
  const [selectMenu, setSelectMenu] = useState(false);
  const [datas, setDatas] = useState([]);
  // const [user,setUser] = useState("hungtran")
  const user = useSelector((state) => state.auth.login.currenUser);
  let activeStyle = {
    color: "var(--primary-color)",
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartPrice = cart.cartItem.map((item) => {
    return {
      price: parseInt(item.price),
      quanlity: item.cartQuanlity,
    };
  });

  const handleClear = (item) => {
    dispatch(deleteToCart(item));
  };
  const inputRef = useRef(null)
  const timeOutSet = useRef(null);
  const handleInput = async (value) => {
    if (timeOutSet.current !== null) {
      clearTimeout(timeOutSet.current);
    }
    timeOutSet.current = setTimeout(async () => {
      const getData = await axios.get(
        "https://api-shopee-three.vercel.app/api/product"
      );
      const data = getData.data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setDatas(value.length===0?[]:data);
      console.log(data)
     
    }, 300);
  };

  // inputRef.current.value  <=> Element.target.value
  return (
    <Fragment>
      <div className={cx("header")}>
        <div className={cx("header__menu")}>
          <ul className={cx("header__list")}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className={cx("header__item")}
              end
            >
              <span>TRANG CHỦ</span>
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? cx("activeNav", "header__item") : cx("header__item")
              }
            >
              <span>SẢN PHẨM</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? cx("activeNav", "header__item") : cx("header__item")
              }
            >
              <span>LIÊN HỆ</span>
            </NavLink>
            <NavLink
              to="/lifestyle"
              className={({ isActive }) =>
                isActive ? cx("activeNav", "header__item") : cx("header__item")
              }
            >
              <span>LIFESTYLE</span>
            </NavLink>
            
          </ul>
        </div>
        <div className={cx("header__title")}>
          <Link to="/">FASHION SHOP</Link>
        </div>
        <div className={cx("header__icon")}>
          <div style={{position:"relative"}} className={cx("header__icon_search")}>
            <CiSearch className={cx("header__icon_search_icon")} />
            <input
              onChange={(e) => handleInput(e.target.value)}
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              ref={inputRef}
            />
                <div className={cx("header__search")}>
                    <div style={{width:"100%"}}>
                        {datas.map(item=>(
                         <div style={{width:"100%"}}>
                          <Link className={cx('header__search_item')} onClick={()=> {inputRef.current.value = ''; setDatas([])}} to={`/shop/${item._id}`}> {item.name}</Link>
                         </div>
                        ))}
                    </div>
                </div>
          </div>
          <span>
            <NavLink
              className={({ isActive }) =>
                isActive ? cx("activeNav") : undefined
              }
              to="/login"
            >
              <FontAwesomeIcon icon={faUserTie} />
            </NavLink>
          </span>
          {user ? (
            <>
              <p className={cx('header__input')}>
                Hi ,<span>{user.username}</span>
                <div className={cx('header__input_item')}>
                  <NavLink to='/cart/item'>
                    <li className={cx('header__input_link')}>Đơn hàng của tôi</li>
                  </NavLink>
                  <NavLink to='/register'>
                    <li className={cx('header__input_link')}>Đăng xuất</li>
                  </NavLink>
                </div>
              </p>
            </>
          ) : (
            <span>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          )}
          <span
            style={{ position: "relative" }}
            onClick={() => {
              selectCart ? setSelectCart(false) : setSelectCart(true);
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span className={cx("cart__count")}>
              {cart.cartItem.reduce((count, item) => {
                return count + item.cartQuanlity;
              }, 0)}
            </span>
          </span>
          <span
            onClick={() => {
              selectMenu ? setSelectMenu(false) : setSelectMenu(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
        </div>
      </div>
      <div
        className={cx("cart__modal")}
        style={{ display: selectCart ? "block" : "none" }}
      >
        <div className={cx("cart__banner")}>
          <span
            onClick={() => {
              setSelectCart(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className={cx("cart__container")}>
          {cart.cartItem.map((item) => {
            return (
              <div key={item._id} className={cx("cart__item")}>
                {/* <img src={`img/product/${item.img}`} /> */}
                <img
                  src={require(`../../../../public/img/product/${item.img}`)}
                />
                <div className={cx("item__description")}>
                  <div className={cx("item__name")}>{item.name}</div>
                  <div className={cx("item__quanlity")}>
                    x{item.cartQuanlity}
                  </div>
                </div>
                <span onClick={() => handleClear(item)}>
                  <AiOutlineDelete />
                </span>
              </div>
            );
          })}
        </div>
        <div className={cx("cart__footer")}>
          <Link className={cx("cart__view")} to="/cart">
            XEM GIỎ HÀNG
          </Link>
          <div className={cx("cart__price")}>
            Total: $
            {cartPrice.reduce((price, item) => {
              return price + item.price * item.quanlity;
            }, 0)}
          </div>
        </div>
      </div>
      <div
        className={cx("menu__modal")}
        style={{ display: selectMenu ? "block" : "none" }}
      >
        <div className={cx("menu__banner")}>
          <span
            onClick={() => {
              setSelectMenu(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className={cx("menu__container")}>
          <div className={cx("menu__icon")}>
            
            <span>
              <NavLink
                className={({ isActive }) =>
                  isActive ? cx("activeNav") : undefined
                }
                to="/login"
              >
                <FontAwesomeIcon icon={faUserTie} />
              </NavLink>
            </span>
            <span>
              {/* <FontAwesomeIcon icon={faEnvelope} /> */}
            </span>
            <span>
              {/* <FontAwesomeIcon icon={faHeart} /> */}
            </span>
          </div>

          <ul className={cx("menu__list")}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className={cx("header__item")}
              end
            >
              <span>TRANG CHỦ</span>
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? cx("activeNav", "header__item") : cx("header__item")
              }
            >
              <span>SẢN PHẨM</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? cx("activeNav", "header__item") : cx("header__item")
              }
            >
              <span>LIÊN HỆ</span>
            </NavLink>
            <NavLink
              to="/lifestyle"
              className={({ isActive }) =>
                isActive ? cx("activeNav", "header__item") : cx("header__item")
              }
            >
              <span>LIFESTYLE</span>
            </NavLink>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
