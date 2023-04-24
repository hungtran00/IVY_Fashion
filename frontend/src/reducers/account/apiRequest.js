import axios from "axios"
import { loginFaild, loginSuccess, loginStart, registerFaild,registerStart,registerSuccess} from "../account/authSlice"


export const loginUser = async(user, dispatch, navigate)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/login", user)
        dispatch(loginSuccess(res.data))
        navigate("/")        
    } catch (error) {
        dispatch(loginFaild());
    }
}
export const registerUser = async(user,dispatch,navigate)=>{
    dispatch(registerStart());
    try {
        await axios.post("http://localhost:8000/v1/auth/register",user)
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFaild());
        
    }
}