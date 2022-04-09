import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import modal from "./modal";
import member from "./member";
import section from "./section";
import task from "./task";
import invitation from "./invitation";
import message from "./message";
import session from "./session";
import talking_point from "./talking_point";
import file from "./file";
import folder from "./folder";
import time_record from "./time_record";
import note from "./note";
import tag from "./tag";
import poll from "./poll";

const appReducer = combineReducers({
  auth,
  project,
  modal,
  member,
  section,
  task,
  invitation,
  message,
  session,
  talking_point,
  file,
  folder,
  time_record,
  note,
  tag,
  poll
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
