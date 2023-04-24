import { configureStore } from '@reduxjs/toolkit'
import accountSlice from '../account/accountSlice';
import cartSlice from '../cart/cartSlice';
import productSlice from '../product/productSlice';
import authReducer from "../account/authSlice"

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        account: accountSlice.reducer,
        cart: cartSlice,
        auth: authReducer
    }
});
export default store;