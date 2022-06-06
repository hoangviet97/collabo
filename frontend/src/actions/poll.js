import { CREATE_POLL } from "./types";
import axios from "axios";

export const createPoll = ({ message_id, question }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/polls/add", { message_id, question });
    console.log(res.data);
    dispatch({ type: CREATE_POLL, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};
