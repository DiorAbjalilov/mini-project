import { HIDE_LOADING, POSTS_GET, SHOW_LOADING } from "./types";
import axios from "axios";

const postFetchApi = async (type, api, data) => {
  let resData = null;
  if (type === "post") {
    const { userName, lastName, comment } = data;
    const userId = JSON.parse(localStorage.getItem("isLoginMe"))._id;
    const body = {
      userName,
      lastName,
      userId,
      comment,
    };
    const res = await axios.post(api, body);
    resData = await res.data;
  }
  return resData;
};
export default postFetchApi;

export function showLoader() {
  return {
    type: SHOW_LOADING,
  };
}
export function hideLoader() {
  return {
    type: HIDE_LOADING,
  };
}

export function getPostsApi() {
  return async (dispatch) => {
    try {
      // dispatch(showLoader());
      const userId = JSON.parse(localStorage.getItem("isLoginMe"))._id;
      // console.log("asadssf");
      const response = await axios.post(
        "http://localhost:5000/api/post/userPosts",
        {
          userId,
        }
      );
      const resData = await response.data;
      dispatch({ type: POSTS_GET, payload: resData });
      // return resData;
    } catch (error) {
      console.log(error);
    }
  };
}