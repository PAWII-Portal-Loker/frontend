import { initialCommonState } from "@/common/types/commonStoreState";
import {
  CompanyTypeStoreState,
  ConstStoreState,
  defaultConstEntity,
  IncomeTypeStoreState,
  JobTypeStoreState,
  LastEducationTypeStoreState,
  RoleStoreState,
} from "./type";
import { create } from "zustand";
import ConstService from "./service";
import { toaster } from "@/components/ui/toaster";

const constService = new ConstService();

export const useConstStore = create<ConstStoreState>((set, get) => ({
  data: defaultConstEntity,
  isLoading: false,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),
  fetchData: () => {
    get().setIsLoading(true);

    constService.getConsts({
      onSuccess: (data) => {
        get().setData(data);
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
        get().setIsLoading(false);
      },
    });
  },
}));

export const useCompanyTypeStore = create<CompanyTypeStoreState>(
  (set, get) => ({
    ...initialCommonState,

    setData: (data) => set({ data }),
    setIsLoading: (isLoading) => set({ isLoading }),

    fetchData: () => {
      get().setIsLoading(true);

      constService.getCompanyTypes({
        onSuccess: (data) => {
          get().setData(data);
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
          get().setIsLoading(false);
        },
      });
    },
  }),
);

export const useIncomeTypeStore = create<IncomeTypeStoreState>((set, get) => ({
  ...initialCommonState,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    get().setIsLoading(true);

    constService.getIncomeTypes({
      onSuccess: (data) => {
        get().setData(data);
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
        get().setIsLoading(false);
      },
    });
  },
}));

export const useJobTypeStore = create<JobTypeStoreState>((set, get) => ({
  ...initialCommonState,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    get().setIsLoading(true);

    constService.getJobTypes({
      onSuccess: (data) => {
        get().setData(data);
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
        get().setIsLoading(false);
      },
    });
  },
}));

export const useRoleStore = create<RoleStoreState>((set, get) => ({
  ...initialCommonState,

  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    get().setIsLoading(true);

    constService.getRoles({
      onSuccess: (data) => {
        get().setData(data);
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
        get().setIsLoading(false);
      },
    });
  },
}));

export const useLastEducationStore = create<LastEducationTypeStoreState>(
  (set, get) => ({
    ...initialCommonState,

    setData: (data) => set({ data }),
    setIsLoading: (isLoading) => set({ isLoading }),

    fetchData: () => {
      get().setIsLoading(true);

      constService.getLastEducationTypes({
        onSuccess: (data) => {
          get().setData(data);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to fetch last education types",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setIsLoading(false);
        },
      });
    },
  }),
);
