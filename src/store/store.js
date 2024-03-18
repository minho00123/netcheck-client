import { create } from "zustand";

const useStore = create(set => ({
  id: "",
  url: "",
  urlInfo: {},
  pingData: {},
  trafficData: [],
  bandwidthData: {},
  tracerouteData: [],
  isUrlExist: true,
  showHeaderInput: false,
  setId: id => set({ id }),
  setUrl: url => set({ url }),
  setUrlInfo: urlInfo => set({ urlInfo }),
  setPingData: data => set({ pingData: data }),
  setTrafficData: data => set({ trafficData: data }),
  setBandwidthData: data => set({ bandwidthData: data }),
  setTracerouteData: data => set({ tracerouteData: [...data] }),
  setIsUrlExist: () => set({ isUrlExist: false }),
  setShowHeaderInput: () => set({ showHeaderInput: true }),
}));

export default useStore;
