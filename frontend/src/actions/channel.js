import { CREATE_CHANNEL, CREATE_CHANNEL_FAIL, GET_CHANNELS, GET_CHANNELS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createChannel = ({ projectId, name, isPrivate }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/channels/new", { projectId, name, isPrivate });
    dispatch({ type: CREATE_CHANNEL, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_CHANNEL_FAIL });
  }
};

export const getAllChannels = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/channels/all", { id });
    dispatch({ type: GET_CHANNELS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_CHANNELS_FAIL });
  }
};
