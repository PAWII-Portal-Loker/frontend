import { create } from 'zustand';

interface MainStoreState {
  uuid: string | null;
  setUuid: (uuid: string) => void;
  isNavigationOpen: boolean;
  setIsNavigationOpen: (isOpen: boolean) => void;
  isLoginDialogOpen: boolean;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  isRegisterDialogOpen: boolean;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
}

const useMainStore = create<MainStoreState>((set) => ({
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
