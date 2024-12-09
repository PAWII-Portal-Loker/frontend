import { create } from "zustand";
import { RoleDialogStoreState } from "./type";

const useRoleDialogStore = create<RoleDialogStoreState>((set) => ({
  selectedRole: null,
  isRoleDialogOpen: false,
  isLoading: false,

  setIsRoleDialogOpen: (isOpen) => set({ isRoleDialogOpen: isOpen }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useRoleDialogStore;
