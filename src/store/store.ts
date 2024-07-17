import { create } from "zustand";

interface State {
  data: object;
}

const useStore = create(set => ({
  customId: "",
  url: "",
  id: "",
  data: {},
  historyData: {},
  selectedButton: "Information",
  resetData: () =>
    set({ data: {}, url: "", customId: "", id: "", historyData: {} }),
  setId: (id: string) => set({ id }),
  setUrl: (url: string) => set({ url }),
  setData: (data: object) =>
    set((state: State) => ({
      data: { ...state.data, ...data },
    })),
  setSelectedButton: (selection: string) =>
    set(() => ({ selectedButton: selection })),
  setHistoryData: (data: object) => set({ historyData: data }),
}));

export default useStore;
