import { create } from "zustand";
import { RoleDialogStoreState } from "./type";

const useRoleDialogStore = create<RoleDialogStoreState>((set) => ({
  selectedRole: null,
  isRoleDialogOpen: false,
  isLoading: false,

  setRoleDialogOpen: (isOpen) => set({ isRoleDialogOpen: isOpen }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useRoleDialogStore;
