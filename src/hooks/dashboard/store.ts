import { create } from "zustand";
import { DashboardStoreState } from "./type";

const useDashboardStore = create<DashboardStoreState>((set) => ({
  isSearchFocused: false,

  setSearchFocused: (isFocused) => set({ isSearchFocused: isFocused }),
}));

export default useDashboardStore;
