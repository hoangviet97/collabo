import { CREATE_POST, CREATE_POST_FAIL, GET_POSTS, GET_POSTS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createPost = ({ socket, postBody }) => (dispatch) => {
  console.log("ok");
  socket.emit("create post", postBody);
};

export const getAllPosts = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/posts/all", { id });
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    bitm;
    dispatch({ type: GET_POSTS_FAIL });
  }
};
