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
  onDriver: [],
  toggleDriver: async (driverId) => {
    try {
      const response = await axios.post(`${Baseurl}driver/ready-driver`, {
        id: 717,
      }, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTk5NTIsImV4cCI6MTY4MTcwNDc1Mn0.zSoGEIfPa_y0AntMy3NMacUzl5IE71Q505hMW4OaoQo',
          'Content-Type': 'application/json',
        },
      });
      set({ onDriver: response.status });
    } catch (error) {
      console.error(error);
    }
  },
}));
export default store;
