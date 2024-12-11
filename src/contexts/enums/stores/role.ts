import { create } from "zustand";
import { RoleStoreState } from "../types/roles";
import ConstService from "../service";
import { toaster } from "@/components/ui/toaster";

const constService = new ConstService();

export const useRolestore = create<RoleStoreState>((set, get) => ({
  roles: [],
  isRolesLoading: false,

  setRoles: (roles) => set({ roles }),
  setIsRolesLoading: (isRolesLoading) => set({ isRolesLoading }),

  getRoles: () => {
    get().setIsRolesLoading(true);

    constService.getRoles({
      onSuccess: (roles) => {
        get().setRoles(roles);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch roles",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsRolesLoading(false);
      },
    });
  },
}));