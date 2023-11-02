import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/features/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/features/product/productSlice";


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
    }
});