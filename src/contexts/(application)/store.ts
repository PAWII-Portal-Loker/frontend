import { create } from "zustand";
import { DefaultJobSeekerDto } from "../(jobSeeker)/store";
import { DefaultVacancyDto } from "../(vacancy)/store";
import ApplicationService from "./service";
import { toaster } from "@/components/ui/toaster";
import FileUploadService from "../fileUpload/service";
import { ApplicationDto } from "./types";
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
    setIsApplicationsLoading: (isApplicationsLoading) =>
      set({ isApplicationsLoading }),
    setApplication: (application) => set({ application }),
    setIsApplicationLoading: (isApplicationLoading) =>
      set({ isApplicationLoading }),

    getJobSeekerApplications: () => {
      get().setIsApplicationsLoading(true);

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
          get().setIsApplicationsLoading(false);
        },
      });
    },

    getVacancyApplicants: (id) => {
      get().setIsApplicationsLoading(true);

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
          get().setIsApplicationsLoading(false);
        },
      });
    },

    getApplication: (id) => {
      get().setIsApplicationLoading(true);

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
          get().setIsApplicationLoading(false);
        },
      });
    },

    createApplication: (request) => {
      get().setIsApplicationLoading(true);
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
          get().setIsApplicationLoading(false);
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
              (url) => url !== key,
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
  }),
);
