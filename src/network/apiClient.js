import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://a1f0-2407-0-3002-146-6dab-a18a-a4e8-e67a.ap.ngrok.io`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
