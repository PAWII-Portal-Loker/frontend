import { create } from "zustand";
import FileUploadService from "@fileUpload/service";
import { FileUploadStoreState } from "./types/storeState";
import { toaster } from "@ui/toaster";

const fileUploadService = new FileUploadService();

export const useFileUploadStore = create<FileUploadStoreState>((set) => ({
  fileUpload: [],
  isFileUploading: false,
  isFileDeleting: false,
  isFileLoading: false,

  setFileUploading: (isFileUploading) => set({ isFileUploading }),
  setFileDeleting: (isFileDeleting) => set({ isFileDeleting }),
  setFileLoading: (isFileLoading) => set({ isFileLoading }),
  setFileUpload: (fileUpload) => set({ fileUpload }),

  getFile: async (key: string) => {
    set({ isFileLoading: true });
    fileUploadService.getFile(key, {
      onSuccess: (data) => {
        set((state) => ({
          fileUpload: [...(state.fileUpload || []), data.url],
        }));
      },
      onError: () => {
        toaster.create({
          title: "Failed to get file",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled: () => set({ isFileLoading: false }),
    });
  },

  uploadFile: async (file: File) => {
    set({ isFileUploading: true });
    fileUploadService.uploadFile(file, {
      onSuccess: (url) => {
        toaster.create({
          title: "File uploaded successfully",
          type: "success",
          duration: 3000,
        });
        set((state) => ({
          fileUpload: [...(state.fileUpload || []), url],
        }));
      },
      onError: () => {
        toaster.create({
          title: "Failed to upload file",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled: () => set({ isFileUploading: false }),
    });
  },

  deleteFile: async (url: string) => {
    set({ isFileDeleting: true });
    fileUploadService.deleteFile(url, {
      onSuccess: () => {
        toaster.create({
          title: "File deleted successfully",
          type: "success",
          duration: 3000,
        });
        set((state) => ({
          fileUpload: state.fileUpload?.filter((file) => file !== url),
        }));
      },
      onError: () => {
        toaster.create({
          title: "Failed to delete file",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled: () => set({ isFileDeleting: false }),
    });
  },
}));
