import { create } from "zustand";

const useStore = create(set => ({
  url: "",
  tracerouteData: [],
  urlInfo: {},
  pingData: {},
  showHeaderInput: false,
  isUrlExist: true,
  setUrl: url => set({ url }),
  setTracerouteData: data => set({ tracerouteData: [...data] }),
  setUrlInfo: urlInfo => set({ urlInfo }),
  setPingData: data => set({ pingData: data }),
  changeHeaderInputState: () => set({ showHeaderInput: true }),
  setIsUrlExist: () => set({ isUrlExist: false }),
}));

export default useStore;
