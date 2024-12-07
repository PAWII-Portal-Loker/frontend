import { create } from "zustand";

export interface MainState {
  isNavigationOpen: boolean;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
}

export interface MainActions {
  setIsNavigationOpen: (isOpen: boolean) => void;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
}

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
