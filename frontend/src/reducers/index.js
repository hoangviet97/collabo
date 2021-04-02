import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";

export default combineReducers({ auth, project });
