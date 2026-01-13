import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Slices/CategorySlice";
import authReducer from "./Slices/authslice";
import SubcategoryReducer from "./Slices/subcategorySlice";
import userAuthReducer from "./Slices/userAuthslice";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/Productslice";
import cartReducer from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    Subcategory: SubcategoryReducer,
    userAuth: userAuthReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
