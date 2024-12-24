import { create } from "zustand";
import { toaster } from "src/common/ui/toaster";
import { ApplicationDto } from "./types";
import { DefaultJobSeekerDto } from "@jobSeeker/store";
import { DefaultVacancyDto } from "@vacancy/store";
import ApplicationService from "./service";
import FileUploadService from "@fileUpload/service";
import { ApplicationStoreState } from "./types/storeState";

const DefaultApplicationDto: ApplicationDto = {
  id: "",
  job_seeker: DefaultJobSeekerDto,
  vacancy: DefaultVacancyDto,
  document_urls: [],
  message: "",
  created_at: new Date(),
  updated_at: new Date(),
};

const applicationService = new ApplicationService();
const fileUploadService = new FileUploadService();

export const useApplicationStore = create<ApplicationStoreState>(
  (set, get) => ({
    applications: [],
    isApplicationsLoading: false,
    application: DefaultApplicationDto,
    isApplicationLoading: false,

    setApplications: (applications) => set({ applications }),
    setApplicationsLoading: (isApplicationsLoading) =>
      set({ isApplicationsLoading }),
    setApplication: (application) => set({ application }),
    setApplicationLoading: (isApplicationLoading) =>
      set({ isApplicationLoading }),

    getJobSeekerApplications: () => {
      get().setApplicationsLoading(true);

      applicationService.getJobSeekerApplications({
        onSuccess: (applications) => {
          get().setApplications(applications);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to get applications",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setApplicationsLoading(false);
        },
      });
    },

    getVacancyApplicants: (id) => {
      get().setApplicationsLoading(true);

      applicationService.getVacancyApplicants(id, {
        onSuccess: (applications) => {
          get().setApplications(applications);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to get applicants",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setApplicationsLoading(false);
        },
      });
    },

    getApplication: (id) => {
      get().setApplicationLoading(true);

      applicationService.getApplication(id, {
        onSuccess: (application) => {
          get().setApplication(application);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to get application",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setApplicationLoading(false);
        },
      });
    },

    createApplication: (request) => {
      get().setApplicationLoading(true);
      applicationService.createApplication(request, {
        onSuccess: () => {
          toaster.create({
            title: "Success",
            description: "Application created successfully",
            type: "success",
            duration: 3000,
          });
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to create application",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setApplicationLoading(false);
        },
      });
    },

    uploadResume: (file) => {
      fileUploadService.uploadFile(file, {
        onSuccess: (url) => {
          get().setApplication({
            ...get().application,
            document_urls: [...get().application.document_urls, url],
          });
        },
        onError: (message) => {
          toaster.create({
            title: "Failed to upload resume",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
      });
    },

    deleteResume: (key) => {
      fileUploadService.deleteFile(key, {
        onSuccess: () => {
          get().setApplication({
            ...get().application,
            document_urls: get().application.document_urls.filter(
              (url) => url !== key
            ),
          });
        },
        onError: (message) => {
          toaster.create({
            title: "Failed to delete resume",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
      });
    },
  })
);
