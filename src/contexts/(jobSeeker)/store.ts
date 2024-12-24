import { create } from "zustand";
import { JobSeekerDto } from "./types";
import { DefaultUserDto } from "@user/store";
import JobSeekerService from "./service";
import useRoleDialogStore from "@hooks/roleDialog/store";
import useAuthStore from "@auth/store";
import { JobSeekerStoreState } from "./types/storeState";
import { toaster } from "src/common/ui/toaster";

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

const { setRoleDialogOpen } = useRoleDialogStore.getState();
const { checkLogin } = useAuthStore.getState();

export const useJobSeekerStore = create<JobSeekerStoreState>((set, get) => ({
  jobSeekers: [],
  isJobSeekersLoading: false,
  jobSeeker: DefaultJobSeekerDto,
  isJobSeekerLoading: false,

  setJobSeekers: (jobSeekers) => set({ jobSeekers }),
  setJobSeekersLoading: (isJobSeekersLoading) => set({ isJobSeekersLoading }),
  setJobSeeker: (jobSeeker) => set({ jobSeeker }),
  setJobSeekerLoading: (isJobSeekerLoading) => set({ isJobSeekerLoading }),

  getJobSeekers: () => {
    get().setJobSeekersLoading(true);

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
        get().setJobSeekersLoading(false);
      },
    });
  },

  getJobSeeker: (id) => {
    get().setJobSeekerLoading(true);

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
        get().setJobSeekerLoading(false);
      },
    });
  },

  createJobSeeker: (request) => {
    get().setJobSeekerLoading(true);

    jobSeekerService.createJobSeeker(request, {
      onSuccess: () => {
        toaster.create({
          title: `Job seeker ${request.name} created`,
          type: "success",
          duration: 3000,
        });
        setRoleDialogOpen(false);
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
        get().setJobSeekerLoading(false);
      },
    });
  },

  updateJobSeeker: (request) => {
    get().setJobSeekerLoading(true);

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
        get().setJobSeekerLoading(false);
      },
    });
  },
}));
