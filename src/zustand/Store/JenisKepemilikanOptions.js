import create from 'zustand';
import axios from 'axios';
import Baseurl from '../../Api/BaseUrl';

const ZustandStore = create((set) => ({
  TipeKendaraan: [],
  jenisKepemilikan: [],
  UkuranSeragam : [],
  JenisSim : [],
  DriverType :[],
  WarnaPlat:[],
  
  setDriverType: async () => {
    try {
      const data = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ DriverType: data.data.data.driverType });
      console.log(`ini`,data.data.data.driverType);
    } catch (error) {
      console.error(error);
    }
  },
  setJenisSim: async () => {
    try {
      const data = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ JenisSim: data.data.data.jenisSim });
      console.log(`ini`,data.data.data.jenisSim);
    } catch (error) {
      console.error(error);
    }
  },
  setUkuranSeragam: async () => {
    try {
      const data = await axios.get(`${Baseurl}driver/get-select`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ UkuranSeragam: data.data.ukuranSeragam });
      console.log(`ini`,data.data.data);
    } catch (error) {
      console.error(error);
    }
  },
  FetchTipeKendaraan: async () => {
    try {
      const data = await axios.get(`${Baseurl}driver/get-select`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ TipeKendaraan: data.data.data });
      console.log(`ini`,data.data.data);
    } catch (error) {
      console.error(error);
    }
  },

  setjenisKepemilikan: async () => {
    try {
      const data = await axios.get(`${Baseurl}driver/get-select`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ jenisKepemilikan: data.data.jenisKepemilikan });
    } catch (error) {
      console.error(error);
    }
  },
  setWarnaPlat: async () => {
    try {
      const data = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ WarnaPlat: data.data.data.warnaPlat });
    } catch (error) {
      console.error(error);
    }
  },

  StatusDriverAktif:[],
  setStatusDriverAktif: async () => {
    try {
      const data = await axios.get(`${Baseurl}vehicle/get-filter`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ StatusDriverAktif: data.data.filterStatus });
      console.log(`ni status driver`,data.data.filterStatus);
    } catch (error) {
      console.error(error);
    }
  },
}));

export default ZustandStore;
