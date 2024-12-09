import { create } from "zustand";
import { MainActions, MainState } from "./state";

type StoreState = MainState & MainActions;
const useMainStore = create<StoreState>((set) => ({
  isNavigationOpen: false,
  setIsNavigationOpen: (isOpen) => set({ isNavigationOpen: isOpen }),
  isLoginDialogOpen: false,
  setIsLoginDialogOpen: (isOpen) => set({ isLoginDialogOpen: isOpen }),
  isRegisterDialogOpen: false,
  setIsRegisterDialogOpen: (isOpen) => set({ isRegisterDialogOpen: isOpen }),
}));

export default useMainStore;
