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

  memo: [],
  SetisiMemo: (memo) => set({ memo }),

  custumer: [],
  setCustumer: (custumer) => set({ custumer }),

  jenisBarang: [],
  setjenisBarang: (jenisBarang) => set({ jenisBarang }),

  orderdate: [],
  setOrderdate: (orderdate) => set({ orderdate }),

  asuransi: [],
  setAsuransi: (asuransi) => set({ asuransi }),

  detailmitra: [],
  setDetailMitra: (detailmitra) => set({ detailmitra }),

  phZustand: [],
  setPHZustand: (phZustand) => set({ phZustand }),
  
  jobdesk: [],
  setJobdesk: (jobdesk) => set({ jobdesk }),

  shipmentSementara: [],
  setshipmentSementara: (shipmentSementara) => set({ shipmentSementara }),


  mitra1: [],
  setmitra1: (mitra1) => set({ mitra1 }),

  mitra2: [],
  setmitra2: (mitra2) => set({ mitra2 }),
  
  kodekendaraan1: [],
  setkodekendaraan1: (kodekendaraan1) => set({ kodekendaraan1 }),
  
  namaDriver1: [],
  setnamaDriver1: (namaDriver1) => set({ namaDriver1 }),

  IsiKomenRejectSP: [],
  setIsiKomenRejectSP: (IsiKomenRejectSP) => set({ IsiKomenRejectSP }),
}));

export default mobil;
