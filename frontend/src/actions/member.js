import { GET_MEMBERS, GET_MEMBERS_FAIL, MEMBERS_LOADING } from "./types";
import axios from "axios";
import { message } from "antd";
import setAuthToken from "../helpers/setAuthToken";

export const getMembers = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(setMembersLoading());
    const res = await axios.post("http://localhost:9000/api/members/all", { id });
    dispatch({ type: GET_MEMBERS, payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};

export const setMembersLoading = () => {
  return {
    type: MEMBERS_LOADING
  };
};
