import { CREATE_POST, CREATE_POST_FAIL, GET_POSTS, GET_POSTS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createPost = ({ projectId, name, isPrivate }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/posts/new", { projectId, name, isPrivate });
    dispatch({ type: CREATE_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_POST_FAIL });
  }
};

export const getAllPosts = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/posts/all", { id });
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_POSTS_FAIL });
  }
};
