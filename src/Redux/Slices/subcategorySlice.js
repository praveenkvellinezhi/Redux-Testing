import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseurl";

const initialState = {
  subcategory: [],
  status: "idle",
  error: null,
};
const EMPTY_ARRAY = [];

export const fetchsubcategory = createAsyncThunk(
  "subcategory/fetchsubcategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/Subcategory/get`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addsubcategory = createAsyncThunk(
  "subcategory/addsubcategory",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE_URL}/admin/Subcategory/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.subcategory;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const SubcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchsubcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchsubcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategory = action.payload;
      })
      .addCase(fetchsubcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addsubcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addsubcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategory.unshift(action.payload);
      })
      .addCase(addsubcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { clearsubcategories } = SubcategorySlice.actions;
export const selectAllSubcategories = (state) =>
  state.Subcategory?.subcategory ?? EMPTY_ARRAY;

export const getSubcategoryStatus = (state) => state.Subcategory?.status;
export const getSubcategoryError = (state) => state.Subcategory?.error;
export const selectSubcategoryById = (state) =>
  state.user.selectedSubcategory;


export default SubcategorySlice.reducer;
