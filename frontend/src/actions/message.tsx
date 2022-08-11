import { CREATE_MESSAGE, GET_MESSAGES, DATA_LOADING, UPDATE_VOTE, DELETE_VOTE, SEND_MESSAGE, GET_REPLIES, MESSAGE_LOADING } from "./types";
import axiosClient from "../helpers/axios";
import { message } from "antd";

export const createMessage = (project_id: string, text: string, question: string, options: any, user: any) => async (dispatch: any) => {
  try {
    dispatch(setMsgLoading());
    const res = await axiosClient.post(`/${project_id}/messages/add`, { text, question, options });
    dispatch({ type: CREATE_MESSAGE, payload: { data: res.data, user: user } });
    message.success("Message created");
  } catch (err) {
    message.error("Error");
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getMessages = (project_id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const res = await axiosClient.get(`/${project_id}/messages`);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    message.error("Error");
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const setPoolVote = (project_id: string, message_id: string, firstname: string, lastname: string, email: string, color: string, poll_id: string, option_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/messages/${message_id}/polls/${poll_id}/options/${option_id}/vote`);
    const poolItem = Object.assign(res.data, { firstname: firstname }, { lastname: lastname }, { email: email }, { color: color });

    dispatch({ type: UPDATE_VOTE, payload: poolItem });
  } catch (err) {
    message.error("Error");
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const deletePoolVote = (project_id: string, message_id: string, email: string, poll_id: string, option_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/messages/${message_id}/polls/${poll_id}/options/${option_id}/vote`);
    dispatch({ type: DELETE_VOTE, payload: { email, option_id } });
  } catch (err) {
    message.error("Error");
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const sendReply = (project_id: string, message_id: string, text: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/messages/${message_id}/replies`, { text });
    dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (err) {
    message.error("Error");
    //dispatch({ type: CREATE_TALKING_POINT_FAIL });
  }
};

export const getAllReplies = (project_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/messages/replies`);
    dispatch({ type: GET_REPLIES, payload: res.data });
  } catch (err) {
    message.error("Error");
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
