import create from "zustand";
import axios from "axios";
const Baseurl = "https://api.eurekalogistics.co.id/";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTg3NzUsImV4cCI6MTY4MTcwMzU3NX0.NVkrtMUOM3G2fYjxBAKTYte0CCN1HS4wdXbEJuhUlCM";

const store = create((set) => ({
  OnDriver: [],
  onPost: async () => {
    const api = await axios.post(`${Baseurl}driver/ready-driver`, {
      headers: {
        Authorization: `token ${Token}`,
      },
    });
    set({ OnDriver: api.data.data.order });
  },
}));

export default store;
