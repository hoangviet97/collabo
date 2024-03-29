import { CREATE_INVITATION, ACCEPT_INVITATION, DELETE_INVITATION, UPDATE_SEEN_INVITATION, GET_PROJECT_INVITATIONS, CREATE_INVITATION_FAIL, ADD_INVITATION, GET_INVITATIONS, GET_INVITATIONS_FAIL, RESET_SECTIONS } from "./types";
import axiosClient from "../../helpers/axios";
import { message } from "antd";
import { AppDispatch } from "../store";

export const createInvitation = (receiver_email: string, project_id: string, socket: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/invitations/new`, { receiver_email });
    dispatch({ type: CREATE_INVITATION, payload: res.data });
    socket.emit("send-invitation", { receiver: receiver_email, data: res.data });
  } catch (err: any) {
    message.error(err.response.data);
  }
};

export const addInvitation = (data: any) => {
  return {
    type: ADD_INVITATION,
    payload: data
  };
};

export const acceptInvitation = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.post(`/${project_id}/invitations/${id}/accept`);
    dispatch({ type: DELETE_INVITATION, payload: id });
  } catch (err: any) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const getAllInvitations = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/invitations/private`);
    dispatch({ type: GET_INVITATIONS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const getAllProjectInvitations = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/invitations`);
    dispatch({ type: GET_PROJECT_INVITATIONS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const updateSeenStatus = (project_id: string, id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/invitations/${id}/seen`);
    dispatch({ type: UPDATE_SEEN_INVITATION, payload: { id: id, seenStatus: res.data } });
  } catch (err: any) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};

export const deleteInvitation = (project_id: string, id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/invitations/${id}`);
    dispatch({ type: DELETE_INVITATION, payload: id });
    message.success("Invitation has been deleted successuly");
  } catch (err: any) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};
