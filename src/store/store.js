import { create } from "zustand";

const useStore = create(set => ({
  id: "",
  url: "",
  latencies: [],
  setId: id => set({ id }),
  setUrl: url => set({ url }),
  setLatencies: data => set({ latencies: [...data] }),
}));

export default useStore;
