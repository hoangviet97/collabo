import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9000/api"
});

export default axiosClient;

//"https://collaboatbe.herokuapp.com/api"
