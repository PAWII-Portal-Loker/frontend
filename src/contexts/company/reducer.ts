import { create } from "zustand";
import { toaster } from "@/components/ui/toaster";
import CompanyService from "./service";
import { CompanyActions, CompanyState } from "./state";
import { CompanyRequestEntity, defaultCompanyEntity } from "./type";
import useAuthStore from "../(auth)/reducer";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";

const companyService = new CompanyService();

type CompanyStoreState = CompanyState & CompanyActions;
export const useCompanyStore = create<CompanyStoreState>((set) => ({
  data: [],
  isLoading: false,
  singleData: defaultCompanyEntity,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    set({ isLoading: true });

    companyService.getAll({
      onSuccess: (data) => {
        set({ data });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch company",
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

  fetchSingleData: (id) => {
    set({ isLoading: true });

    companyService.getOne(id, {
      onSuccess: (singleData) => {
        set({ singleData });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch company",
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

  createData: (request) => {
    set({ isLoading: true });

    companyService.create(request as CompanyRequestEntity, {
      onSuccess: () => {
        toaster.create({
          title: `Company ${request.company_name} created`,
          type: "success",
          duration: 3000,
        });
        useRoleDialogStore.getState().setIsRoleDialogOpen(false);
        useAuthStore.getState().checkLogin();
      },
      onError: (message: string) => {
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

  updateData: (request) => {
    set({ isLoading: true });

    companyService.update(request as CompanyRequestEntity, {
      onSuccess: () => {
        toaster.create({
          title: "Company updated",
          type: "success",
          duration: 3000,
        });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to update company",
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
