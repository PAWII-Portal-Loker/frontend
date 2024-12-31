import { create } from "zustand";
import FileUploadService from "@fileUpload/service";
import { FileUploadStoreState } from "./types/storeState";
import { toaster } from "@ui/toaster";

const fileUploadService = new FileUploadService();

export const useFileUploadStore = create<FileUploadStoreState>((set, get) => ({
  uploadedFileUrls: [],
  isFileUploading: false,
  isFileDeleting: false,
  isFileLoading: false,

  setFileUploading: (isFileUploading) => set({ isFileUploading }),
  setFileDeleting: (isFileDeleting) => set({ isFileDeleting }),
  setFileLoading: (isFileLoading) => set({ isFileLoading }),
  setUploadedFileUrls: (uploadedFileUrls) => set({ uploadedFileUrls }),

  getFile: async (key: string) => {
    get().setFileLoading(true);
    fileUploadService.getFile(key, {
      onSuccess: (data) => {
        get().setUploadedFileUrls([
          ...(get().uploadedFileUrls || []),
          data.url,
        ]);
      },
      onError: () => {
        toaster.create({
          title: "Failed to get file",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled: () => get().setFileLoading(false),
    });
  },

  uploadFile: async (file: File) => {
    get().setFileUploading(true);
    fileUploadService.uploadFile(file, {
      onSuccess: (url) => {
        toaster.create({
          title: "File uploaded successfully",
          type: "success",
          duration: 3000,
        });
        get().setUploadedFileUrls([...(get().uploadedFileUrls || []), url]);
      },
      onError: () => {
        toaster.create({
          title: "Failed to upload file",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled: () => get().setFileUploading(false),
    });
  },

  deleteFile: async (url: string) => {
    get().setFileDeleting(true);
    fileUploadService.deleteFile(url, {
      onSuccess: () => {
        toaster.create({
          title: "File deleted successfully",
          type: "success",
          duration: 3000,
        });
        get().setUploadedFileUrls(
          get().uploadedFileUrls?.filter((file) => file !== url),
        );
      },
      onError: () => {
        toaster.create({
          title: "Failed to delete file",
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled: () => get().setFileDeleting(false),
    });
  },
}));
