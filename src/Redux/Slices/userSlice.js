import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseurl";

const initialState = {
  subcategories: [],          // ✅ list
  selectedSubcategory: null,  // ✅ single item
  status: "idle",
  error: null,
};

/* 🔹 GET ALL SUBCATEGORIES */
export const fetchuserPosts = createAsyncThunk(
  "user/fetchuserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/subCategory/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* 🔹 GET SUBCATEGORY BY ID */
export const fetchSubcategorybyId = createAsyncThunk(
  "user/fetchSubcategorybyId",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/subCategory/get/${categoryId}`
      );

      // ✅ ensure single object
      return Array.isArray(response.data)
        ? response.data[0]
        : response.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);  



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* LIST */
      .addCase(fetchuserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchuserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategories = action.payload;
      })
      .addCase(fetchuserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* SINGLE */
      .addCase(fetchSubcategorybyId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubcategorybyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("REDUX RECEIVED:", action.payload);
        state.selectedSubcategory = action.payload;
      })
      .addCase(fetchSubcategorybyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

/* ✅ SELECTORS (THIS FIXES YOUR ERROR) */
export const selectAllUsers = (state) => state.user.subcategories;
export const selectSubcategoryById = (state) =>
  state.user.selectedSubcategory;

export const getuserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export default userSlice.reducer;
