import { create } from "zustand";
import JobSeekerService from "./service";
import { toaster } from "@/components/ui/toaster";
import useRoleDialogStore from "@/hooks/roleDialog/store";
import useAuthStore from "../auth/store";
import { DefaultUserDto } from "../user/store";
import { JobSeekerDto } from "./types";
import { JobSeekerStoreState } from "./types/storeState";

export const DefaultJobSeekerDto: JobSeekerDto = {
  id: "",
  user: DefaultUserDto,
  name: "",
  last_education: "",
  major: "",
  gpa: 0,
  created_at: new Date(),
  updated_at: new Date(),
};
const jobSeekerService = new JobSeekerService();

const { setIsRoleDialogOpen } = useRoleDialogStore.getState();
const { checkLogin } = useAuthStore.getState();

export const useJobSeekerStore = create<JobSeekerStoreState>((set, get) => ({
  jobSeekers: [],
  isJobSeekersLoading: false,
  jobSeeker: DefaultJobSeekerDto,
  isJobSeekerLoading: false,

  setJobSeekers: (jobSeekers) => set({ jobSeekers }),
  setIsJobSeekersLoading: (isJobSeekersLoading) => set({ isJobSeekersLoading }),
  setJobSeeker: (jobSeeker) => set({ jobSeeker }),
  setIsJobSeekerLoading: (isJobSeekerLoading) => set({ isJobSeekerLoading }),

  getJobSeekers: () => {
    get().setIsJobSeekersLoading(true);

    jobSeekerService.getJobSeekers({
      onSuccess: (jobSeekers) => {
        get().setJobSeekers(jobSeekers);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to get job seekers",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsJobSeekersLoading(false);
      },
    });
  },

  getJobSeeker: (id) => {
    get().setIsJobSeekerLoading(true);

    jobSeekerService.getJobSeeker(id, {
      onSuccess: (jobSeeker) => {
        get().setJobSeeker(jobSeeker);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to get job seeker",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsJobSeekerLoading(false);
      },
    });
  },

  createJobSeeker: (request) => {
    get().setIsJobSeekerLoading(true);

    jobSeekerService.createJobSeeker(request, {
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
        get().setIsJobSeekerLoading(false);
      },
    });
  },

  updateJobSeeker: (request) => {
    get().setIsJobSeekerLoading(true);

    jobSeekerService.updateJobSeeker(request, {
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
        get().setIsJobSeekerLoading(false);
      },
    });
  },
}));
