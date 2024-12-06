import { create } from "zustand";
import { toaster } from "@/components/ui/toaster";
import ConstService from "./service";
import {
  CompanyTypeActions,
  CompanyTypeState,
  ConstActions,
  ConstState,
  IncomeTypeActions,
  IncomeTypeState,
  JobTypeActions,
  JobTypeState,
  RoleActions,
  RoleState,
} from "./state";

const constService = new ConstService();

type ConstStoreState = ConstState & ConstActions;
export const useConstStore = create<ConstStoreState>((set) => ({
  consts: {
    company_types: [],
    income_types: [],
    job_types: [],
    roles: [],
  },
  isConstsLoading: false,

  setConsts: (consts) => set({ consts }),
  setIsConstsLoading: (isConstsLoading) => set({ isConstsLoading }),

  fetchConsts: () => {
    set({ isConstsLoading: true });

    constService.getConsts({
      onSuccess: (consts) => {
        set({ consts });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch const",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        set({ isConstsLoading: false });
      },
    });
  },
}));

type CompanyTypeStoreState = CompanyTypeState & CompanyTypeActions;
export const useCompanyTypeStore = create<CompanyTypeStoreState>((set) => ({
  data: [],
  isLoading: false,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    set({ isLoading: true });

    constService.getCompanyTypes({
      onSuccess: (data) => {
        set({ data });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch company types",
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

type IncomeTypeStoreState = IncomeTypeState & IncomeTypeActions;
export const useIncomeTypeStore = create<IncomeTypeStoreState>((set) => ({
  data: [],
  isLoading: false,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    set({ isLoading: true });

    constService.getIncomeTypes({
      onSuccess: (data) => {
        set({ data });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch income types",
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

type JobTypeStoreState = JobTypeState & JobTypeActions;
export const useJobTypeStore = create<JobTypeStoreState>((set) => ({
  data: [],
  isLoading: false,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    set({ isLoading: true });

    constService.getJobTypes({
      onSuccess: (data) => {
        set({ data });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch job types",
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

type RoleStoreState = RoleState & RoleActions;
export const useRoleStore = create<RoleStoreState>((set) => ({
  data: [],
  isLoading: false,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    set({ isLoading: true });

    constService.getRoles({
      onSuccess: (data) => {
        set({ data });
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
        set({ isLoading: false });
      },
    });
  },
}));
