import axios from "axios";

export const httpClient = axios.create({
  baseURL: `https://api.eurekalogistics.co.id`,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
