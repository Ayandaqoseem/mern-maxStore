import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
                    const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

                    if(productIndex >= 0) {
                                        // item already exists in the cart
                                        // increase the cartQuantity
                                        state.cartItems[productIndex].cartQuantity += 1
                                        toast.success(`${action.payload.name} increase by one`, {
                                                            position: "top-left"
                                        })
                    } else {
                                        // item doesn't exists in the cart
                                        // Add item to the cart
                                        const tempProduct = { ...action.payload, cartQuantity: 1 }
                                        state.cartItems.push(tempProduct)
                                        toast.success(`${action.payload.name} added to cart`, {
                                                            position: "top-left"
                                        })
                    }
                    // save to local storage 
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItems))
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;
export default cartSlice.reducer;
