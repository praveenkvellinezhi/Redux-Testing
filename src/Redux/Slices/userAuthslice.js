import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseurl";

export const userLogin = createAsyncThunk(
  "userAuth/userLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/auth/login`,
        credentials
      );

      console.log(response.data,"lllllllllll");
      
      return response.data;

    } catch (error) {
      // ✅ Handle 404 and all errors safely
      if (error.response) {
        return rejectWithValue(
          error.response.data?.message ||
          `Request failed with status ${error.response.status}`
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);






const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("userToken") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    userLogout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
    },
  },
   extraReducers: (builder) => {
    builder
 .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";

        // ✅ build user object from response
        state.user = {
          email: action.payload.email,
          phone: action.payload.phone,
        };

        // ✅ correct userId
        state.userId = action.payload.userId;
        state.token = action.payload.token;

        // ✅ persist
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;


