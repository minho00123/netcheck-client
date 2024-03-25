import { create } from "zustand";

const useStore = create(set => ({
  id: "",
  url: "",
  seoulData: {},
  londonData: {},
  virginiaData: {},
  selectedRegion: "Seoul",
  setId: id => set({ id }),
  setUrl: url => set({ url }),
  resetData: () => set({ seoulData: {}, londonData: {}, virginiaData: {} }),
  setSeoulData: data => set({ seoulData: data }),
  setLondonData: data => set({ londonData: data }),
  setVirginiaData: data => set({ virginiaData: data }),
  setSelectedRegion: region => set(() => ({ selectedRegion: region })),
}));

export default useStore;
