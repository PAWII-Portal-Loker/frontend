import { create } from "zustand";
import { JobTypeStoreState } from "../types/jobTypes";
import ConstService from "../service";
import { toaster } from "@ui/toaster";

const constService = new ConstService();

export const useJobTypestore = create<JobTypeStoreState>((set, get) => ({
  jobTypes: [],
  isJobTypesLoading: false,

  setJobTypes: (jobTypes) => set({ jobTypes }),
  setJobTypesLoading: (isJobTypesLoading) => set({ isJobTypesLoading }),

  getJobTypes: () => {
    get().setJobTypesLoading(true);

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
        get().setJobTypesLoading(false);
      },
    });
  },
}));
