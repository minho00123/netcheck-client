import { create } from "zustand";

const useStore = create(set => ({
  url: "",
  urlInfo: {},
  pingData: {},
  bandwidthData: {},
  tracerouteData: [],
  isUrlExist: true,
  showHeaderInput: false,
  setUrl: url => set({ url }),
  setUrlInfo: urlInfo => set({ urlInfo }),
  setPingData: data => set({ pingData: data }),
  setBandwidthData: data => set({ bandwidthData: data }),
  setTracerouteData: data => set({ tracerouteData: [...data] }),
  setIsUrlExist: () => set({ isUrlExist: false }),
  changeHeaderInputState: () => set({ showHeaderInput: true }),
}));

export default useStore;
