import { GET_MEMBERS, GET_MEMBERS_FAIL } from "./types";
import axios from "axios";

export const getMembers = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/members/all", { id });
    dispatch({ type: GET_MEMBERS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_MEMBERS_FAIL });
  }
};
