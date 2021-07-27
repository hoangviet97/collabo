import { CREATE_INVITATION, UPDATE_SEEN_INVITATION, GET_PROJECT_INVITATIONS, CREATE_INVITATION_FAIL, GET_INVITATIONS, GET_INVITATIONS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";

export const createInvitation = ({ receiver_email, project }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/invitation/new", { receiver_email, project });
    dispatch({ type: CREATE_INVITATION, payload: res.data });
    console.log(res.data);
  } catch (err) {
    message.error(err.response.data.message);
  }
};

export const getAllInvitations = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:9000/api/invitation/private");
    dispatch({ type: GET_INVITATIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const getAllProjectInvitations = ({ project }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/invitation/all", { project });
    console.log(res.data);
    dispatch({ type: GET_PROJECT_INVITATIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const updateSeenStatus = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/invitation/seen", { id });
    console.log(res.data);
    dispatch({ type: UPDATE_SEEN_INVITATION, payload: { id: id, seenStatus: res.data } });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};
