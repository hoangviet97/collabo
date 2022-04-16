import { CREATE_MESSAGE, GET_MESSAGES, DATA_LOADING, UPDATE_VOTE, DELETE_VOTE } from "./types";
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
    console.log(res.data.messages);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setPoolVote = ({ project, firstname, lastname, email, option_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/messages/pool-vote", { project, option_id });
    const poolItem = Object.assign(res.data, { firstname: firstname }, { lastname: lastname }, { email: email });

    dispatch({ type: UPDATE_VOTE, payload: poolItem });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const deletePoolVote = ({ project, email, option_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/messages/delete-vote", { project, option_id });
    console.log(res);
    dispatch({ type: DELETE_VOTE, payload: { email, option_id } });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setLoading = () => {
  return {
    type: DATA_LOADING
  };
};
