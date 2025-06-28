import axios from "axios";
import { API_BE } from "src/constants";

const axiosInstance = axios.create({
  baseURL: API_BE,
});

export default axiosInstance;
