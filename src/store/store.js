import { create } from "zustand";

const useStore = create(set => ({
  id: "",
  url: "",
  speedData: {},
  latencies: [],
  securityData: {},
  selectedRegion: "Seoul",
  tracerouteData: [],
  informationData: {},
  reliabilityData: {},
  setId: id => set({ id }),
  setUrl: url => set({ url }),
  setSpeedData: data => set({ speedData: data }),
  setLatencies: data => set({ latencies: [...data] }),
  setSecurityData: data => set({ securityData: data }),
  setTracerouteData: data => set({ tracerouteData: [...data] }),
  setInformationData: data => set({ informationData: data }),
  setReliabilityData: data => set({ reliabilityData: data }),
  setSelectedRegion: region => set(() => ({ selectedRegion: region })),
}));

export default useStore;
