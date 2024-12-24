import { create } from "zustand";
import { LastEducationTypeStoreState } from "../types/lastEducationTypes";
import ConstService from "../service";
import { toaster } from "src/common/ui/toaster";

const constService = new ConstService();

export const useLastEducationTypeStore = create<LastEducationTypeStoreState>(
  (set, get) => ({
    lastEducationTypes: [],
    isLastEducationTypesLoading: false,

    setLastEducationTypes: (lastEducationTypes) => set({ lastEducationTypes }),
    setLastEducationTypesLoading: (isLastEducationTypesLoading) =>
      set({ isLastEducationTypesLoading }),

    getLastEducationTypes: () => {
      get().setLastEducationTypesLoading(true);

      constService.getLastEducationTypes({
        onSuccess: (lastEducationTypes) => {
          get().setLastEducationTypes(lastEducationTypes);
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
          get().setLastEducationTypesLoading(false);
        },
      });
    },
  })
);
