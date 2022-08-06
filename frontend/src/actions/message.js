import { CREATE_MESSAGE, GET_MESSAGES, DATA_LOADING, UPDATE_VOTE, DELETE_VOTE, SEND_MESSAGE, GET_REPLIES, MESSAGE_LOADING } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createMessage = ({ project_id, text, question, options, user }) => async (dispatch) => {
  try {
    dispatch(setMsgLoading());
    const res = await axiosClient.post(`/${project_id}/messages/add`, { text, question, options });
    dispatch({ type: CREATE_MESSAGE, payload: { data: res.data, user: user } });
    message.success("Message created");
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getMessages = ({ project_id }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axiosClient.get(`/${project_id}/messages`);
    console.log(res.data);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setPoolVote = ({ project_id, message_id, firstname, lastname, email, color, poll_id, option_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/messages/${message_id}/polls/${poll_id}/options/${option_id}/vote`);
    const poolItem = Object.assign(res.data, { firstname: firstname }, { lastname: lastname }, { email: email }, { color: color });

    dispatch({ type: UPDATE_VOTE, payload: poolItem });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const deletePoolVote = ({ project_id, message_id, email, poll_id, option_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/messages/${message_id}/polls/${poll_id}/options/${option_id}/vote`);
    dispatch({ type: DELETE_VOTE, payload: { email, option_id } });
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const sendReply = ({ project_id, message_id, text }) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/messages/${message_id}/replies`, { text });
    dispatch({ type: SEND_MESSAGE, payload: res.data });
    console.log(res);
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getAllReplies = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/messages/replies`);
    dispatch({ type: GET_REPLIES, payload: res.data });
    console.log(res.data);
  } catch (err) {
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setMsgLoading = () => {
  return {
    type: MESSAGE_LOADING
  };
};

export const setLoading = () => {
  return {
    type: DATA_LOADING
  };
};
