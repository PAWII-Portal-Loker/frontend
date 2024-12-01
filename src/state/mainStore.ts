import { create } from 'zustand';

interface MainStoreState {
  uuid: string | null;
  setUuid: (uuid: string) => void;
  isLoginDialogOpen: boolean;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  isRegisterDialogOpen: boolean;
  setIsRegisterDialogOpen: (isOpen: boolean) => void;
}

const useMainStore = create<MainStoreState>((set) => ({
  uuid: null,
  setUuid: (uuid) => set({ uuid }),
  isLoginDialogOpen: false,
  setIsLoginDialogOpen: (isOpen) => set({ isLoginDialogOpen: isOpen }),
  isRegisterDialogOpen: false,
  setIsRegisterDialogOpen: (isOpen) => set({ isRegisterDialogOpen: isOpen }),
}));

export default useMainStore;
