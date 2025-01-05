import { create } from "zustand";
import { toaster } from "@ui/toaster";
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
    // job seeker - my applications
    applications: [],
    isApplicationsLoading: false,
    // job seeker - create application
    application: DefaultApplicationDto,
    isApplicationLoading: false,
    isApplicationDialogOpen: false,

    // company
    applicants: [],
    isApplicantsLoading: false,

    // job seeker
    setApplications: (applications) => set({ applications }),
    setApplicationsLoading: (isApplicationsLoading) =>
      set({ isApplicationsLoading }),
    setApplication: (application) => set({ application }),
    setApplicationLoading: (isApplicationLoading) =>
      set({ isApplicationLoading }),

    // company
    setApplicants: (applicants) => set({ applicants }),
    setApplicantsLoading: (isApplicantsLoading) => set({ isApplicantsLoading }),

    // job seeker
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

    // company
    getApplicantsByVacancyId: (id) => {
      get().setApplicantsLoading(true);

      applicationService.getApplicationByVacancyId(id, {
        onSuccess: (applications) => {
          get().setApplicants(applications);
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
          get().setApplicantsLoading(false);
        },
      });
    },

    // job seeker
    setApplicationDialogOpen: (isOpen) =>
      set({ isApplicationDialogOpen: isOpen }),

    createApplication: (request) => {
      get().setApplicationLoading(true);

      request.document_urls = request.document_urls!.map(
        (filename) => `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/${filename}`
      );
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

    // document
    documents: [],
    isDocumentLoading: false,
    isDocumentUploading: false,
    isDocumentDeleting: false,

    setDocuments: (documents) =>
      set((state) => ({
        documents:
          typeof documents === "function"
            ? documents(state.documents)
            : documents,
      })),
    setDocumentLoading: (isDocumentLoading) => set({ isDocumentLoading }),
    setDocumentUploading: (isDocumentUploading) => set({ isDocumentUploading }),
    setDocumentDeleting: (isDocumentDeleting) => set({ isDocumentDeleting }),

    getDocument: (key) => {
      get().setDocumentLoading(true);
      fileUploadService.getFile(key, {
        onSuccess: () => {},
        onError: (message) => {
          toaster.create({
            title: "Failed to get document",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setDocumentLoading(false);
        },
      });
    },

    uploadDocuments: (files) => {
      get().setDocumentUploading(true);
      return new Promise((resolve, reject) => {
        fileUploadService.uploadFile(files, {
          onSuccess: (urls) => {
            resolve(urls);
          },
          onError: (message) => {
            toaster.create({
              title: "Failed to upload documents",
              description: message,
              type: "error",
              duration: 3000,
            });
            reject(message);
          },
          onFullfilled() {
            get().setDocumentUploading(false);
          },
        });
      });
    },

    deleteDocument: (url) => {
      get().setDocumentDeleting(true);
      fileUploadService.deleteFile(url, {
        onSuccess: () => {},
        onError: (message) => {
          toaster.create({
            title: "Failed to delete document",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setDocumentDeleting(false);
        },
      });
    },
  })
);
