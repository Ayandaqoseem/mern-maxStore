import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getCartQuantityId } from "../../../utils";

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
      const cartQuantity = getCartQuantityId(state.cartItems, action.payload._id)
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        // item already exists in the cart
        // increase the cartQuantity

        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.error("Max number of product reached!!!")
        } else {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} increase by one`, {
            position: "top-left",
          });

        }
      } else {
        // item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      // save to local storage
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    DECREASE_CART (state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        // Decrease cart
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter((item) => item._id !== action.payload._id)
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }

      // save to ls
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter((item) => item._id !== action.payload._id)
      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left"
      });
      // save to ls
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  },
});

export const { 
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
} = cartSlice.actions;

export const selectCartItems = (state => state.cart.cartItems);
export const selectCartTotalQuantity = (state => state.cartTotalQuantity);
export const selectCartTotalAmount = (state => state.cartTotalAmount);

export default cartSlice.reducer;
