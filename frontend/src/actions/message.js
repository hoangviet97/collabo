import { CREATE_MESSAGE, GET_MESSAGES, DATA_LOADING } from "./types";
import axios from "axios";

export const createMessage = ({ project, text, question, options }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/messages/add", { project, text, question, options });
    console.log(res.data);
    //dispatch({ type: CREATE_MESSAGE, payload: res.data });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getMessages = ({ id }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("http://localhost:9000/api/messages/all", { id });
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setLoading = () => {
  return {
    type: DATA_LOADING
  };
};
