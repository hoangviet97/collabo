import { GET_MEMBERS, GET_MEMBERS_FAIL, UPDATE_MEMBER_ROLE, DELETE_MEMBER, LEAVE_PROJECT } from "./types";
import axios from "axios";

export const getMembers = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/members/all", { id });
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const updateMemberRole = ({ id, project, role_id }) => async (dispatch) => {
  try {
    const res = await axios.patch("http://localhost:9000/api/members/role", { id, project, role_id });
    console.log(res);
    dispatch({ type: UPDATE_MEMBER_ROLE, payload: { id, role_id } });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const deleteMember = ({ id, project }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/members/delete", { id, project });
    console.log(res);
    dispatch({ type: DELETE_MEMBER, payload: { id } });
  } catch (err) {
    //
  }
};

export const leaveProject = ({ project_id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/members/leave", { project_id });
    console.log(res);
    //dispatch({ type: DELETE_MEMBER, payload: { id } });
  } catch (err) {
    //
  }
};
