import { CREATE_PROJECT, CREATE_PROJECT_FAIL } from "./types";
import axios from "axios";
import { message } from "antd";
import history from "../helpers/history";

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
