import { useState } from "react";
import styles from "../Register/Register.module.scss"
import classNames from "classnames/bind"
import { registerUser } from "../../reducers/account/apiRequest";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

const Register = () => {
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [message, setMessage] = useState("")
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const nameRegex = /^[a-zA-Z0-9\-]+$/;
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (email.length !== 0 || username.length !== 0 || password.length !== 0) {
            if (emailRegex.test(email) === false) {
                setMessage("Email không hợp lệ")
            }
            else if (nameRegex.test(username) === false) {
                setMessage("Username không hợp lệ")
            }
            else if (passRegex.test(password) === false) {
                setMessage("Password ít nhất 6  ký tự bao gồm 1 chữ cái viết hoa, 1 số và 1 ký tự đặc biệt")
            }
            else {
                const newUser = {
                    username: username,
                    password: password,
                    email: email
                }
                console.log(newUser)
                registerUser(newUser,dispatch,navigate)
            }
            
        }
        else {
            setMessage("Vui lòng nhập thông tin")
        }
        

    }
    return ( 
        <section className={cx('register')}>
            <div className={cx('register__container')}>
                {/* <div className={cx('register__title')}> SIGN UP </div> */}
                <form onSubmit={handleSubmit} className={cx('register__form')}>
                    <p className={cx('register__title')}>SIGN UP</p>
                    <div className={cx('register__group')}>
                        <label>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email....' type='email' />
                    </div>
                    <div className={cx('register__group')}>
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username....' type='text' />
                    </div>

                    <div className={cx('register__group')}>
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password....' type='password' />
                    </div>
                    <div className={cx('register__service')}>
                        <div className={cx('register__service_group')}>
                            <button className={cx('register__button')} type="submit" >
                                CREATE ACCOUNT 
                            </button>
                            <p className={cx('register__message')}>{message}</p>
                        </div>
                        <span>Do you have account? <Link className={cx('register__active')} to='/login'>Login</Link></span>
                    </div>
                    
                </form> 

            </div>
        </section>
        
     );
}
 
export default Register;