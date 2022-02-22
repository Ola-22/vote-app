import axios from "axios";

const baseUrl = process.env.REACT_APP_URL;

console.log("b", baseUrl);

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
