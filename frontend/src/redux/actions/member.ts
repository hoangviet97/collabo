import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE, UPDATE_MEMBER_ROLE_FAILED, DELETE_MEMBER, LEAVE_PROJECT, GET_MODAL_MEMBERS } from "./types";
import { message } from "antd";
import axiosClient from "../../helpers/axios";
import { AppDispatch } from "../store";

export const getMembers = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/members`);
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const getModalMembers = (project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/${project_id}/members`);
    dispatch({ type: GET_MODAL_MEMBERS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const getMembers2 = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.get(`/members/2`);
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err: any) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const updateMemberRole = (id: string, project_id: string, role_id: string, current_role_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/members/${id}/role`, { role_id });
    dispatch({ type: UPDATE_MEMBER_ROLE, payload: { id, role_id } });
    message.success("Role of the member was updated");
  } catch (err: any) {
    dispatch({ type: UPDATE_MEMBER_ROLE_FAILED, payload: { id, current_role_id } });
    message.error(err.response.data.message);
  }
};

export const deleteMember = (id: string, project_id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/members/${id}`);
    dispatch({ type: DELETE_MEMBER, payload: id });
  } catch (err: any) {
    message.error(err.response.data);
  }
};

export const leaveProject = (project_id: string, history: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosClient.delete(`/${project_id}/members`);
    history.push("/");
  } catch (err: any) {
    message.error(err.response.data.message);
  }
};
