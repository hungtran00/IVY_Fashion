import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currenUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        }
       
    },
    reducers: {
        loginStart:(state)=>{
            state.login.isFetching = true
        },
        loginSuccess:(state,action)=>{
            state.login.isFetching = false;
            state.login.currenUser = action.payload;
            state.login.error = false;

        },
        loginFaild:(state)=>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart:(state)=>{
            state.register.isFetching = true
        },
        registerSuccess:(state)=>{
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;

        },
        registerFaild:(state)=>{
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        }
      

    }
})
export const { loginFaild,loginStart, loginSuccess, registerFaild,registerStart,registerSuccess} = authSlice.actions;
export default authSlice.reducer;
