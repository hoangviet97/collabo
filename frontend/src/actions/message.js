import { CREATE_MESSAGE, GET_MESSAGES, DATA_LOADING } from "./types";
import axios from "axios";

export const createMessage = ({ project, text, question, options }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/messages/add", { project, text, question, options });
    dispatch({ type: CREATE_MESSAGE, payload: res.data });
    console.log(res.data);
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getMessages = ({ id }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.post("http://localhost:9000/api/messages/all", { id });
    console.log(res.data);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setPoolVote = ({ option_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/messages/pool-vote", { option_id });
    console.log(res.data.msg);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const deletePoolVote = ({ option_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/messages/delete-vote", { option_id });
    console.log(res.data.msg);
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
