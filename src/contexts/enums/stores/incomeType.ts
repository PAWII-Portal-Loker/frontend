import { create } from "zustand";
import { IncomeTypeStoreState } from "../types/incomeTypes";
import ConstService from "../service";
import { toaster } from "@ui/toaster";

const constService = new ConstService();

export const useIncomeTypestore = create<IncomeTypeStoreState>((set, get) => ({
  incomeTypes: [],
  isIncomeTypesLoading: false,

  setIncomeTypes: (incomeTypes) => set({ incomeTypes }),
  setIncomeTypesLoading: (isIncomeTypesLoading) =>
    set({ isIncomeTypesLoading }),

  getIncomeTypes: () => {
    get().setIncomeTypesLoading(true);

    constService.getIncomeTypes({
      onSuccess: (incomeTypes) => {
        get().setIncomeTypes(incomeTypes);
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
        get().setIncomeTypesLoading(false);
      },
    });
  },
}));
