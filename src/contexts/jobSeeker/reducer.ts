import { create } from "zustand";
import { toaster } from "@/components/ui/toaster";
import JobSeekerService from "./service";
import { JobSeekerActions, JobSeekerState } from "./state";
import { JobSeekerRequestEntity, defaultJobSeekerEntity } from "./type";
import useAuthStore from "../(auth)/reducer";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";

const jobSeekerService = new JobSeekerService();

type JobSeekerStoreState = JobSeekerState & JobSeekerActions;
export const useJobSeekerStore = create<JobSeekerStoreState>((set) => ({
  data: [],
  isLoading: false,
  singleData: defaultJobSeekerEntity,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    set({ isLoading: true });

    jobSeekerService.getAll({
      onSuccess: (data) => {
        set({ data });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch job Seeker",
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

    jobSeekerService.getOne(id, {
      onSuccess: (singleData) => {
        set({ singleData });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch job seeker",
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

    jobSeekerService.create(request as JobSeekerRequestEntity, {
      onSuccess: () => {
        toaster.create({
          title: `Job seeker ${request.name} created`,
          type: "success",
          duration: 3000,
        });
        useRoleDialogStore.getState().setIsRoleDialogOpen(false);
        useAuthStore.getState().checkLogin();
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to create job seeker",
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

    jobSeekerService.update(request as JobSeekerRequestEntity, {
      onSuccess: () => {
        toaster.create({
          title: "Job seeker updated",
          type: "success",
          duration: 3000,
        });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to update job seeker",
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
