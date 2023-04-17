import create from 'zustand';
import axios from 'axios';

const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvcGVyYXNpb25hbCIsImZ1bGxuYW1lIjoiQWRpbmRhIFB1dHJpIFIiLCJpYXQiOjE2ODEwOTgyMTcsImV4cCI6MTY4MTcwMzAxN30.JqwiPCZzsts9rkA-veeSNi8aRHjKoXkNyOpEMQtMTNQ`;
const Baseurl = `https://api.eurekalogistics.co.id/driver/update-driver/`;

const useVehicleStore = create((set) => ({
  vehicles: [],
  fetchVehicles: async () => {
    try {
      const response = await axios.get(`${Baseurl}vehicle/get-select?vehicleType=`, {
        headers: {
          'Authorization': `token ${Token}`,
        }
      });
      set({ vehicles: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useVehicleStore;
