import create from 'zustand';
import axios from 'axios';
import Baseurl from '../../Api/BaseUrl';

const useMitraStore = create((set) => ({
  NamaMitra: [],
  fetchMitra: async () => {
    try {
      const data = await axios.get(`${Baseurl}sm/get-sm-filter`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ NamaMitra: data.data.mitra });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useMitraStore;
