import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://resumeku.online/api/v1/book`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
