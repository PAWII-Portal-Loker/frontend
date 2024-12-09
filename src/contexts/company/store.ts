import { initialCommonState } from "@/common/types/commonStoreState";
import { CompanyStoreState } from "./type";
import { create } from "zustand";
import CompanyService from "./service";
import { toaster } from "@/components/ui/toaster";
import useRoleDialogStore from "@/hooks/roleDialog/store";
import useAuthStore from "../(auth)/store";
import { DefaultCompanyDto } from "./util";

const companyService = new CompanyService();

const { setIsRoleDialogOpen } = useRoleDialogStore.getState();
const { checkLogin } = useAuthStore.getState();

export const useCompanyStore = create<CompanyStoreState>((set, get) => ({
  ...initialCommonState,
  singleData: DefaultCompanyDto,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    get().setIsLoading(true);

    companyService.getAll({
      onSuccess: (data) => {
        get().setData(data);
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
        get().setIsLoading(false);
      },
    });
  },

  fetchSingleData: (id) => {
    get().setIsLoading(true);

    companyService.getOne(id, {
      onSuccess: (singleData) => {
        get().setSingleData(singleData);
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
        get().setIsLoading(false);
      },
    });
  },

  createData: (request) => {
    get().setIsLoading(true);

    companyService.create(request, {
      onSuccess: () => {
        toaster.create({
          title: `Company ${request.company_name} created`,
          type: "success",
          duration: 3000,
        });
        setIsRoleDialogOpen(false);
        checkLogin();
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
        get().setIsLoading(false);
      },
    });
  },

  updateData: (request) => {
    get().setIsLoading(true);

    companyService.update(request, {
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
        get().setIsLoading(false);
      },
    });
  },
}));
