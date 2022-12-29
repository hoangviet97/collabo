import axios from "axios";
import axiosClient from "./axios";

const setAuthToken = (token: string) => {
  if (token) {
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
