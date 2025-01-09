import { create } from "zustand";
import { MainStoreState } from "./type";

const useMainStore = create<MainStoreState>((set) => ({
  isNavigationOpen: false,
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
  isProfileDialogOpen: false,

  setNavigationOpen: (isOpen) => set({ isNavigationOpen: isOpen }),
  setLoginDialogOpen: (isOpen) => set({ isLoginDialogOpen: isOpen }),
  setRegisterDialogOpen: (isOpen) => set({ isRegisterDialogOpen: isOpen }),
  setProfileDialogOpen: (isOpen) => set({ isProfileDialogOpen: isOpen }),
}));

export default useMainStore;
