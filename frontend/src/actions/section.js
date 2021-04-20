import { GET_SECTIONS, GET_SECTIONS_FAIL } from "./types";
import axios from "axios";

export const getSections = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/sections/all", { id });
    dispatch({ type: GET_SECTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_SECTIONS_FAIL });
  }
};
