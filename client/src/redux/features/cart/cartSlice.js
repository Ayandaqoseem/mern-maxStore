import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getCartQuantityId } from "../../../utils";
import cartService from "./CartService";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// save cart
export const saveCartDB = createAsyncThunk(
  "cart/saveCartDB",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.saveCartDB(cartData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get cart
export const getCartDB = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCartDB();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const cartQuantity = getCartQuantityId(
        state.cartItems,
        action.payload._id
      );
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        // item already exists in the cart
        // increase the cartQuantity

        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.error("Max number of product reached!!!");
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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
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
        const newCartItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }

      // save to ls
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });
      // save to ls
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success(`Cart cleard`, {
        position: "top-left",
      });
      // save to ls
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      // save cart
      .addCase(saveCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(saveCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      // get cart
      .addCase(getCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
        if (action.payload.length > 0) {
          window.location.href = FRONTEND_URL + "/cart";
        } else {
          window.location.href = FRONTEND_URL;
        }
        console.log(action.payload);
      })
      .addCase(getCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
