import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://collaboatdb.herokuapp.com/api"
});

export default axiosClient;

//"https://collaboatbe.herokuapp.com/api"
