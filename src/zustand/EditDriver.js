import create from "zustand";
import axios from "axios";

const Baseurl = "https://api.eurekalogistics.co.id/";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODA0ODk1MTAsImV4cCI6MTY4MTA5NDMxMH0.rM1kY9dx2mFKTmNtGsVUYiE9h2kyVcjFoC-FiyCNLKQ";

const store = create((set) => ({
  posts: [],
  fetchPosts: async () => {
    const api = await axios.get(
      `${Baseurl}driver/get-driver?limit=10&page=1&keyword=`,
      {
        headers: {
          Authorization: `token ${Token}`,
        },
      }
    );
    set({ posts: api.data.data.order });
  },
  updateDriver: async (driverData) => {
    try {
      const response = await axios.put(
        `${Baseurl}driver/update-driver`,
        driverData,
        {
          headers: {
            Authorization: `token ${Token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
}));

export default store;