import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import modal from "./modal";
import member from "./member";

export default combineReducers({ auth, project, modal, member });
