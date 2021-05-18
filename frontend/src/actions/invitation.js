import { CREATE_INVITATION, CREATE_INVITATION_FAIL } from "./types";
import axios from "axios";

export const createInvitation = ({ senderEmail, receiverId, projectId }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/invitation/new", { senderEmail, receiverId, projectId });
    dispatch({ type: CREATE_INVITATION, payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: CREATE_INVITATION_FAIL });
  }
};
