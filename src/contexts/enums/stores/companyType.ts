import { create } from "zustand";
import { CompanyTypeStoreState } from "../types/companyTypes";
import ConstService from "../service";
import { toaster } from "@/components/ui/toaster";

const constService = new ConstService();

export const useCompanyTypeStore = create<CompanyTypeStoreState>(
  (set, get) => ({
    companyTypes: [],
    isCompanyTypesLoading: false,

    setCompanyTypes: (companyTypes) => set({ companyTypes }),
    setIsCompanyTypesLoading: (isCompanyTypesLoading) =>
      set({ isCompanyTypesLoading }),

    getCompanyTypes: () => {
      get().setIsCompanyTypesLoading(true);

      constService.getCompanyTypes({
        onSuccess: (companyTypes) => {
          get().setCompanyTypes(companyTypes);
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
          get().setIsCompanyTypesLoading(false);
        },
      });
    },
  }),
);
