import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

export default axiosClient;
