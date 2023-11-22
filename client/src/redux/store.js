import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/features/product/productSlice";
import FilterReducer from "../redux/features/product/FilterSlice";
import couponReducer from "../redux/features/coupon/couponSlice";
import cartReducer from "../redux/features/cart/cartSlice";


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        filter: FilterReducer,
        coupon: couponReducer,
        cart: cartReducer
    }
});