import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE, UPDATE_MEMBER_ROLE_FAILED, DELETE_MEMBER, LEAVE_PROJECT } from "./types";
import axios from "axios";
import { message } from "antd";

export const getMembers = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/${project_id}/members`);
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const getMembers2 = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/members/2`);
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const updateMemberRole = ({ id, project_id, role_id }) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:9000/api/${project_id}/members/${id}/role`, { role_id });
    dispatch({ type: UPDATE_MEMBER_ROLE, payload: { id, role_id } });
  } catch (err) {
    dispatch({ type: UPDATE_MEMBER_ROLE_FAILED });
    message.error(err.response.data.message);
  }
};

export const deleteMember = ({ id, project_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/members/${id}`);
    dispatch({ type: DELETE_MEMBER, payload: { id } });
  } catch (err) {
    //
  }
};

export const leaveProject = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:9000/api/${project_id}/members/leave`);
    //dispatch({ type: DELETE_MEMBER, payload: { id } });
  } catch (err) {
    //
  }
};
