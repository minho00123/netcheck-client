import { create } from "zustand";

const useStore = create(set => ({
  showHeaderInput: false,
  showHeaderShare: false,
  changeHeaderInputState: () => set({ showHeaderInput: true }),
  changeHeaderShareState: () => set({ showHeaderShare: true }),
}));

export default useStore;
