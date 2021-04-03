import { CREATE_PROJECT, CREATE_PROJECT_FAIL, GET_PROJECTS, LOAD_PROJECTS_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";
import history from "../helpers/history";
import setAuthToken from "../helpers/setAuthToken";

export const createProject = ({ name }) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:9000/api/projects/add", { name });
    dispatch({ type: CREATE_PROJECT });
    history.push(`/${res.data}/tasks`);
    message.success("Project " + name + " was successfully created");
  } catch (err) {
    dispatch({ type: CREATE_PROJECT_FAIL });
    console.log(err.message);
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get("http://localhost:9000/api/projects");
    dispatch({ type: GET_PROJECTS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOAD_PROJECTS_FAIL });
  }
};
