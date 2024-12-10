import { create } from "zustand";
import { MainStoreState } from "./type";

const useMainStore = create<MainStoreState>((set) => ({
  isNavigationOpen: false,
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,

  setIsNavigationOpen: (isOpen) => set({ isNavigationOpen: isOpen }),
  setIsLoginDialogOpen: (isOpen) => set({ isLoginDialogOpen: isOpen }),
  setIsRegisterDialogOpen: (isOpen) => set({ isRegisterDialogOpen: isOpen }),
}));

export default useMainStore;
