import { create } from "zustand";

const useStore = create(set => ({
  showHeaderInput: true,
  showHeaderShare: true,
  changeHeaderInputState: () => set({ showHeaderInput: true }),
  changeHeaderShareState: () => set({ showHeaderShare: true }),
}));

export default useStore;
