import { create } from "zustand";

interface MainState {
  uuid: string | null;
  isNavigationOpen: boolean;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
}

interface MainActions {
  setUuid: (uuid: string) => void;
  setIsNavigationOpen: (isOpen: boolean) => void;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
}

interface StoreState extends MainState, MainActions {}

const useMainStore = create<StoreState>((set) => ({
  uuid: null,
  setUuid: (uuid) => set({ uuid }),
  isNavigationOpen: false,
  setIsNavigationOpen: (isOpen) => set({ isNavigationOpen: isOpen }),
  isLoginDialogOpen: false,
  setIsLoginDialogOpen: (isOpen) => set({ isLoginDialogOpen: isOpen }),
  isRegisterDialogOpen: false,
  setIsRegisterDialogOpen: (isOpen) => set({ isRegisterDialogOpen: isOpen }),
}));

export default useMainStore;
