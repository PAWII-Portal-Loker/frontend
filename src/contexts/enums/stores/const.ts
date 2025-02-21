import { create } from "zustand";
import ConstService from "../service";
import { toaster } from "@ui/toaster";
import { ConstDto, ConstStoreState } from "../types/conts";

const constService = new ConstService();

export const DefaultConstDto: ConstDto = {
  company_types: [],
  income_types: [],
  job_types: [],
  roles: [],
};

export const useConstStore = create<ConstStoreState>((set, get) => ({
  consts: DefaultConstDto,
  isConstsLoading: false,

  setConsts: (consts) => set({ consts }),
  setConstsLoading: (isConstsLoading) => set({ isConstsLoading }),
  getConsts: () => {
    get().setConstsLoading(true);

    constService.getConsts({
      onSuccess: (consts) => {
        get().setConsts(consts);
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
        get().setConstsLoading(false);
      },
    });
  },
}));
