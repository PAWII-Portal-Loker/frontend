import { initialCommonState } from "@/common/types/commonStoreState";
import { JobSeekerStoreState } from "./type";
import { create } from "zustand";
import JobSeekerService from "./service";
import { toaster } from "@/components/ui/toaster";
import useRoleDialogStore from "@/hooks/roleDialog/store";
import useAuthStore from "../(auth)/store";
import { DefaultJobSeekerDto } from "./util";

const jobSeekerService = new JobSeekerService();

const { setIsRoleDialogOpen } = useRoleDialogStore.getState();
const { checkLogin } = useAuthStore.getState();

export const useJobSeekerStore = create<JobSeekerStoreState>((set, get) => ({
  ...initialCommonState,
  singleData: DefaultJobSeekerDto,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchData: () => {
    get().setIsLoading(true);

    jobSeekerService.getAll({
      onSuccess: (data) => {
        get().setData(data);
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
        get().setIsLoading(false);
      },
    });
  },

  fetchSingleData: (id) => {
    get().setIsLoading(true);

    jobSeekerService.getOne(id, {
      onSuccess: (singleData) => {
        get().setSingleData(singleData);
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
        get().setIsLoading(false);
      },
    });
  },

  createData: (request) => {
    get().setIsLoading(true);

    jobSeekerService.create(request, {
      onSuccess: () => {
        toaster.create({
          title: `Job seeker ${request.name} created`,
          type: "success",
          duration: 3000,
        });
        setIsRoleDialogOpen(false);
        checkLogin();
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
        get().setIsLoading(false);
      },
    });
  },

  updateData: (request) => {
    get().setIsLoading(true);

    jobSeekerService.update(request, {
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
        get().setIsLoading(false);
      },
    });
  },
}));
