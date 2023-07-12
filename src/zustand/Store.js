import create from "zustand";
import axios from "axios";
import Token from "../Api/Token";
const Baseurl = "https://api.eurekalogistics.co.id/";

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
}));
export default store;
