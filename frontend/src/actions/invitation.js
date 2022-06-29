import { CREATE_INVITATION, ACCEPT_INVITATION, DELETE_INVITATION, UPDATE_SEEN_INVITATION, GET_PROJECT_INVITATIONS, CREATE_INVITATION_FAIL, GET_INVITATIONS, GET_INVITATIONS_FAIL, RESET_SECTIONS } from "./types";
import axios from "axios";
import { message } from "antd";

export const createInvitation = ({ receiver_email, project_id, socket }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/invitations/new`, { receiver_email });
    console.log(res);
    dispatch({ type: CREATE_INVITATION, payload: res.data });
    socket.emit("send-invitation", receiver_email);
  } catch (err) {
    message.error(err.response.data);
    //message.error(err.response.data.message);
  }
};

export const acceptInvitation = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:9000/api/${project_id}/invitations/${id}/accept`);
    console.log(res.data);
    dispatch({ type: DELETE_INVITATION, payload: id });
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const getAllInvitations = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/invitations/private`);
    dispatch({ type: GET_INVITATIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const getAllProjectInvitations = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/invitations`);
    console.log(res.data);
    dispatch({ type: GET_PROJECT_INVITATIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const updateSeenStatus = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/invitations/${id}/seen`);
    console.log(res.data);
    dispatch({ type: UPDATE_SEEN_INVITATION, payload: { id: id, seenStatus: res.data } });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const deleteInvitation = ({ project_id, id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/invitations/${id}`);
    dispatch({ type: DELETE_INVITATION, payload: id });
    message.success("Invitation has been deleted successuly");
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};
