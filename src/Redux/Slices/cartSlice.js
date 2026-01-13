import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseurl";

/* =========================
   THUNKS
========================= */

export const fetchCart = createAsyncThunk(
  "user/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("userToken");

     
      const response = await axios.get(
        `${BASE_URL}/user/cart/view-cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addTocart = createAsyncThunk(
  "user/addTocart",
  async (cartData, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.post(`${BASE_URL}/user/cart/add`, cartData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* =========================
   SLICE
========================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
  cartItems: [],
  totalPrice: 0,
  discountedTotal: 0,
  status: "idle",
  error: null,
},

  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH CART */
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.items || []; // ✅ ARRAY
        state.totalPrice = action.payload.totalPrice;
        state.discountedTotal = action.payload.discountedTotal;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ADD TO CART */
      .addCase(addTocart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTocart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addTocart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.cartItems;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;
export const selectuserId = (state) => state.userAuth.userId;
export const selectCartcount = (state) => state.cart.cartItems.length;
