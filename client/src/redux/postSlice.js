import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    currentPost: null,
    isFetching: false,
    error: false,
  },

  reducers: {
    // ADD
    fetchStart: (state) => {
      state.isFetching = true;
    },
    fetchSuccess: (state, action) => {
      state.isFetching = false;
      state.currentVideo = action.payload;
    },
    fetchFaulire: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE
    deletePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostSuccess: (state, action) => {
      state.isFetching = false;
      // ** delete only way in (Redux-Toolkit) **
      state.posts.splice(
        state.posts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deletePostFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE
    updatePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts[
        state.posts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.post;
    },
    updatePostFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFaulire,
  deletePostStart,
  deletePostSuccess,
  deletePostFauilure,
  updatePostStart,
  updatePostSuccess,
  updatePostFauilure,
} = postSlice.actions;

export default postSlice.reducer;
