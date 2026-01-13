import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseurl";

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};


export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/category/get`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const addPosts = createAsyncThunk(
    "posts/addPosts",
    async (formData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${BASE_URL}/admin/category/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data.category;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

/* ===================== UPDATE POST ===================== */
export const updatePosts = createAsyncThunk(
    "posts/updatePosts",
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `${BASE_URL}/admin/category/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.category;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const deletePost = createAsyncThunk("posts/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
             await axios.delete(`${BASE_URL}/admin/category/delete/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }

    }
)

/* ===================== SLICE ===================== */
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            /* ADD */
            .addCase(addPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts.unshift(action.payload);
            })
            .addCase(addPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            /* UPDATE */
            .addCase(updatePosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePosts.fulfilled, (state, action) => {
                state.status = "succeeded";

                const index = state.posts.findIndex(
                    (post) => post.id === action.payload.id
                );

                if (index !== -1) {
                    state.posts[index] = {
                        ...action.payload,
                        imageUrl: action.payload.imageUrl,
                    }
                }
            })
            .addCase(updatePosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            }).addCase(deletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.posts = state.posts.filter(
                    (post) => post.id !== action.payload
                );
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    },
});

export default postSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
