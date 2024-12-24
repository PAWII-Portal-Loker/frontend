import { create } from "zustand";
import { CompanyTypeStoreState } from "../types/companyTypes";
import ConstService from "../service";
import { toaster } from "src/common/ui/toaster";

const constService = new ConstService();

export const useCompanyTypeStore = create<CompanyTypeStoreState>(
  (set, get) => ({
    companyTypes: [],
    isCompanyTypesLoading: false,

    setCompanyTypes: (companyTypes) => set({ companyTypes }),
    setCompanyTypesLoading: (isCompanyTypesLoading) =>
      set({ isCompanyTypesLoading }),

    getCompanyTypes: () => {
      get().setCompanyTypesLoading(true);

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
          get().setCompanyTypesLoading(false);
        },
      });
    },
  })
);
