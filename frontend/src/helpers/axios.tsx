import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://collaboatbe.herokuapp.com/api"
});

export default axiosClient;

//"https://collaboatbe.herokuapp.com/api"
