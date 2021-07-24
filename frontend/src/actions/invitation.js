import { CREATE_INVITATION, CREATE_INVITATION_FAIL, GET_INVITATIONS, GET_INVITATIONS_FAIL } from "./types";
import axios from "axios";

export const createInvitation = ({ receiver_email, project }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/invitation/new", { receiver_email, project });
    //dispatch({ type: CREATE_INVITATION, payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: CREATE_INVITATION_FAIL });
  }
};

export const getAllInvitations = () => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/invitation/all");
    dispatch({ type: GET_INVITATIONS, payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: GET_INVITATIONS_FAIL });
  }
};
