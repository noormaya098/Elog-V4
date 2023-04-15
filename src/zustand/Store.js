import create from "zustand";
import axios from "axios";
const Baseurl = "https://api.eurekalogistics.co.id/";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTg3NzUsImV4cCI6MTY4MTcwMzU3NX0.NVkrtMUOM3G2fYjxBAKTYte0CCN1HS4wdXbEJuhUlCM";

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
