import { create } from "zustand";

const useStore = create(set => ({
  id: "",
  url: "",
  seoulData: {},
  londonData: {},
  virginiaData: {},
  selectedRegion: "Seoul",
  pingData: {},
  tracerouteData: {},
  setId: id => set({ id }),
  setUrl: url => set({ url }),
  resetData: () => set({ seoulData: {}, londonData: {}, virginiaData: {} }),
  setSeoulData: data => set({ seoulData: data }),
  setLondonData: data => set({ londonData: data }),
  setVirginiaData: data => set({ virginiaData: data }),
  setSelectedRegion: region => set(() => ({ selectedRegion: region })),
  setPingData: data => set({ pingData: data }),
  setTracerouteData: data => set({ tracerouteData: data }),
}));

export default useStore;
