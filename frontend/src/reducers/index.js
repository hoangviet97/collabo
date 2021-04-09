import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import modal from "./modal";

export default combineReducers({ auth, project, modal });
