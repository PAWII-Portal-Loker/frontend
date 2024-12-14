import { create } from "zustand";
import { JobTypeStoreState } from "../types/jobTypes";
import ConstService from "../service";
import { toaster } from "@components/ui/toaster";

const constService = new ConstService();

export const useJobTypestore = create<JobTypeStoreState>((set, get) => ({
  jobTypes: [],
  isJobTypesLoading: false,

  setJobTypes: (jobTypes) => set({ jobTypes }),
  setIsJobTypesLoading: (isJobTypesLoading) => set({ isJobTypesLoading }),

  getJobTypes: () => {
    get().setIsJobTypesLoading(true);

    constService.getJobTypes({
      onSuccess: (jobTypes) => {
        get().setJobTypes(jobTypes);
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
        get().setIsJobTypesLoading(false);
      },
    });
  },
}));
