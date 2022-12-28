import { CREATE_NOTE, UPDATE_NOTE, GET_NOTE } from "./types";
import axiosClient from "../helpers/axios";

export const createNote = (project_id: string, session_id: string, text: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.post(`/${project_id}/sessions/${session_id}/notes/add`, { text });
    dispatch({ type: CREATE_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const getNote = (project_id: string, session_id: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`/${project_id}/sessions/${session_id}/notes`);
    dispatch({ type: GET_NOTE, payload: res.data[0] });
  } catch (err) {
    console.log("...");
  }
};

export const updateNote = (project_id: string, session_id: string, id: string, text: string) => async (dispatch: any) => {
  try {
    const res = await axiosClient.patch(`/${project_id}/sessions/${session_id}/notes/${id}`, { text });
    dispatch({ type: UPDATE_NOTE, payload: { id, text } });
  } catch (err) {
    console.log("error note");
  }
};
