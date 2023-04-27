import axios from "axios";
import create from "zustand";
import Token from "../../../../Api/Token";

const baseUrl = `http://api.eurekalogistics.co.id/`;
const urlGetSP = "sp/get-SP?limit=10&page=1&keyword=";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJqb2JkZXNrIjoib3BlcmFzaW9uYWwiLCJpYXQiOjE2ODI0Nzk3MzgsImV4cCI6MTY4MjU2NjEzOH0.O5EHTzaDAGKPo3F9EwP79GrOGH3qFG5fKCddB4k-oCk";

const useSpStore = create((set) => ({
  posts: [],
  nama:[],
  spDetails: [],
  fetchPosts: async () => {
    const api = await axios.get(baseUrl + urlGetSP, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    const namaArr = api.data.data.order.map((item) => item.salesName);
    set({idmpGet: api.data.data.order })
    set({ nama: namaArr });
    set({ posts: api.data.data.order });
  },
}));

export default useSpStore;

