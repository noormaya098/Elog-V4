import axios from "axios";
import create from "zustand";

const baseUrl = `http://api.eurekalogistics.co.id/`;
const urlGetSP = "sp/get-SP?limit=100&page=1&keyword=";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEzNjg2MjcsImV4cCI6MTY4MTk3MzQyN30.SkUfT87Cn1EtxbYVGWxX54dxRYd9r2n9rA1RvEGpsDo";

const useSpStore = create((set) => ({
  posts: [],
  nama:[],
  spDetails: [],
  fetchPosts: async () => {
    const api = await axios.get(baseUrl + urlGetSP, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const namaArr = api.data.data.order.map((item) => item.salesName);
    set({idmpGet: api.data.data.order })
    set({ nama: namaArr });
    set({ posts: api.data.data.order });
  },
  // fetchSpDetails: async (idmp) => {
  //   const getidmp = await axios.get(`${baseUrl}sp/get-SP-detail?idmp=${idmp}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   set((state) => ({ spDetails: [...state.spDetails, getidmp.data.data] }));
  // },
}));

export default useSpStore;
