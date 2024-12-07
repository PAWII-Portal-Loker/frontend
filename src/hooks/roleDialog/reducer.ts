import { create } from "zustand";
import { RoleDialogActions, RoleDialogState } from "./state";

type StoreState = RoleDialogState & RoleDialogActions;
const useRoleDialogStore = create<StoreState>((set) => ({
  selectedRole: null,

  setSelectedRole: (role) => set({ selectedRole: role }),
}));

export default useRoleDialogStore;
