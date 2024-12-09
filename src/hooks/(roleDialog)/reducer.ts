import { create } from "zustand";
import { RoleDialogActions, RoleDialogState } from "./state";

type StoreState = RoleDialogState & RoleDialogActions;
const useRoleDialogStore = create<StoreState>((set) => ({
  selectedRole: null,
  isRoleDialogOpen: false,
  isLoading: false,

  setIsRoleDialogOpen: (isOpen) => set({ isRoleDialogOpen: isOpen }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useRoleDialogStore;
