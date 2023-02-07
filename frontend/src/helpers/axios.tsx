import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`
});

export default axiosClient;
