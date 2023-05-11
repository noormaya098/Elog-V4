import create from "zustand";

const mobil = create((set, get) => ({
  jobdesk: "",
  setJobdesk: (jobdesk) => set({ jobdesk }),
  isidetail: [],
  setSpDetail: (isidetail) => set({ isidetail }),

  isiduit: [],
  setDuit: (isiduit) => set({ isiduit }),
  
  isicombinedData: [],
  setisiCombinedData: (isicombinedData) => set({ isicombinedData }),
}));

export default mobil;
