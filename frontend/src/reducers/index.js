import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import modal from "./modal";
import member from "./member";
import section from "./section";

export default combineReducers({ auth, project, modal, member, section });
