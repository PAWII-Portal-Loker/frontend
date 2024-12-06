import { create } from "zustand";
import { DashboardActions, DashboardState } from "./state";

type StoreState = DashboardState & DashboardActions;
const useDashboardStore = create<StoreState>((set) => ({
  isSearchFocused: false,

  setIsSearchFocused: (isFocused) => set({ isSearchFocused: isFocused }),
}));

export default useDashboardStore;
