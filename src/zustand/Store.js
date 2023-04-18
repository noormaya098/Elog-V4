import create from "zustand";
import axios from "axios";
const Baseurl = "https://api.eurekalogistics.co.id/";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEzNjg2MjcsImV4cCI6MTY4MTk3MzQyN30.SkUfT87Cn1EtxbYVGWxX54dxRYd9r2n9rA1RvEGpsDo";

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
