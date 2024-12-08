import { create } from "zustand";
import { RoleDialogActions, RoleDialogState } from "./state";
import CompanyService from "@/contexts/company/service";
import JobSeekerService from "@/contexts/jobSeeker/service";
import { CompanyRequestEntity } from "@/contexts/company/type";
import { JobSeekerRequestEntity } from "@/contexts/jobSeeker/type";
import { toaster } from "@/components/ui/toaster";
import useAuthStore from "@/contexts/(auth)/reducer";

const companyService = new CompanyService();
const jobSeekerService = new JobSeekerService();

type StoreState = RoleDialogState & RoleDialogActions;
const useRoleDialogStore = create<StoreState>((set) => ({
  selectedRole: null,
  isRoleDialogOpen: false,
  isLoading: false,

  setIsRoleDialogOpen: (isOpen) => set({ isRoleDialogOpen: isOpen }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  createCompanyRole: (request) => {
    set({ isLoading: true });

    companyService.create(request as CompanyRequestEntity, {
      onSuccess: () => {
        set({ isRoleDialogOpen: false });
        useAuthStore.getState().checkLogin();
      },
      onError: (message) => {
        toaster.create({
          title: "Failed to create company",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        set({ isLoading: false });
      },
    });
  },
  createJobSeekerRole: (request) => {
    set({ isLoading: true });

    jobSeekerService.create(request as JobSeekerRequestEntity, {
      onSuccess: () => {
        set({ isRoleDialogOpen: false });
        useAuthStore.getState().checkLogin();
      },
      onError: (message) => {
        toaster.create({
          title: "Failed to create job seeker",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        set({ isLoading: false });
      },
    });
  },
}));

export default useRoleDialogStore;
