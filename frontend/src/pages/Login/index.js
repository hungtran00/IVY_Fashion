import { useState } from "react";
import styles from "../Login/Login.module.scss"
import classNames from "classnames/bind"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/account/apiRequest";

const cx = classNames.bind(styles)

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [message, setMessage] = useState("")
    const nameRegex = /^[a-zA-Z0-9\-]+$/;
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(username.length !== 0 || password.length !== 0){
            if(nameRegex.test(username) === false){
                setMessage("Username không hợp lệ")
            }
            else if(passRegex.test(password) === false){
                setMessage("Username hoặc Password không đúng !")
            }
            else {
                const newUser = {
                    username: username,
                    password: password
                }
                console.log(newUser)
                loginUser(newUser, dispatch, navigate)
            }
        }
        else {
            setMessage("Vui lòng nhập thông tin")
        }
        const newUser = {
            username: username,
            password: password
        }
        console.log(newUser)
        loginUser(newUser, dispatch, navigate)
    }

    return ( 
        <section className={cx("login")}>
            <div className={cx('login__container')}>
                <div className={cx("login__title")}>MY ACCOUNT</div>
                <form onSubmit={handleSubmit} className={cx('login__form')}>
                    <div className={cx('login__group')}>
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username....' type='text' />
                    </div>

                    <div className={cx('login__group')}>
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password....' type='password' />
                    </div>
                    <div className={cx('login__service')}>
                        <div className={cx('login__service_group')}>
                            <button>LOGIN</button>
                            <p>{message}</p>
                        </div>
                        <div className={cx('login__footer')}>
                            <div className={cx("login__footer_left")}> Don't have an account yet? </div>
                            <Link className={cx("login__footer_right")} to="/register">Register now ! </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
     );
}
 
export default Login;