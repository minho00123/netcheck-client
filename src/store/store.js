import { create } from "zustand";

const useStore = create(set => ({
  customId: "",
  url: "",
  id: "",
  data: {},
  historyData: {},
  selectedButton: "Information",
  resetData: () => set({ data: {} }),
  setId: id => set({ id }),
  setUrl: url => set({ url }),
  setData: data =>
    set(state => ({
      data: { ...state.data, ...data },
    })),
  setSelectedButton: selection => set(() => ({ selectedButton: selection })),
  setHistoryData: data => set({ historyData: data }),
  historyDataLoaded: false,
  setHistoryDataLoaded: loaded => set({ historyDataLoaded: loaded }),
}));

export default useStore;
