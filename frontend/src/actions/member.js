import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE, UPDATE_MEMBER_ROLE_FAILED, DELETE_MEMBER, LEAVE_PROJECT, GET_MODAL_MEMBERS } from "./types";
import { message } from "antd";
import axiosClient from "../helpers/axios";

export const getMembers = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/members`);
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const getModalMembers = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/members`);
    dispatch({ type: GET_MODAL_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const getMembers2 = () => async (dispatch) => {
  try {
    const res = await axiosClient.get(`/members/2`);
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const updateMemberRole = ({ id, project_id, role_id, current_role_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/members/${id}/role`, { role_id });
    dispatch({ type: UPDATE_MEMBER_ROLE, payload: { id, role_id } });
    message.success("Role of the member was updated");
  } catch (err) {
    dispatch({ type: UPDATE_MEMBER_ROLE_FAILED, payload: { id, current_role_id } });
    message.error(err.response.data);
  }
};

export const deleteMember = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/members/${id}`);
    dispatch({ type: DELETE_MEMBER, payload: id });
  } catch (err) {
    message.error(err.response.data);
  }
};

export const leaveProject = ({ project_id, history }) => async (dispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/members`);
    history.push("/");
  } catch (err) {
    message.error(err.response.data);
  }
};
