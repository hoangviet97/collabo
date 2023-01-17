import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://collaboatapp.herokuapp.com/api"
});

export default axiosClient;
