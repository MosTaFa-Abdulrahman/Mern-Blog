import { publicRequest } from "../requestMethod";
import { fetchStart, fetchSuccess, fetchFaulire } from "./postSlice";
import {
  updateUserFauilure,
  updateUserStart,
  updateUserSuccess,
} from "./userSlice";

export const addPost = async (dispatch, post) => {
  dispatch(fetchStart());
  try {
    const res = await publicRequest.post("post/create", post);
    dispatch(fetchSuccess(res.data));
  } catch (err) {
    dispatch(fetchFaulire());
  }
};

export const updateUserrr = async (dispatch, id, uid, user) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.put(`user/update/${id}`, uid, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFauilure());
  }
};
