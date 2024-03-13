import { create } from "zustand";

const useStore = create(set => ({
  url: "",
  tracerouteData: [],
  urlInfo: {},
  showHeaderInput: false,
  isUrlExist: true,
  setUrl: url => set({ url }),
  setTracerouteData: data => set({ tracerouteData: [...data] }),
  setUrlInfo: urlInfo => set({ urlInfo }),
  changeHeaderInputState: () => set({ showHeaderInput: true }),
  setIsUrlExist: () => set({ isUrlExist: false }),
}));

export default useStore;
