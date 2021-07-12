import { combineReducers } from "redux";
import auth from "./auth";
import project from "./project";
import modal from "./modal";
import member from "./member";
import section from "./section";
import task from "./task";
import invitation from "./invitation";
import post from "./post";

const appReducer = combineReducers({
  auth,
  project,
  modal,
  member,
  section,
  task,
  invitation,
  post
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
