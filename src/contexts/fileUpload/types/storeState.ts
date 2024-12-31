import { CreateApplicationDto } from "@application/types/create";

export interface FileUploadStoreState {
  uploadedFileUrls: CreateApplicationDto["document_urls"];
  isFileUploading: boolean;
  isFileDeleting: boolean;
  isFileLoading: boolean;

  setUploadedFileUrls: (
    uploadedFileUrls: CreateApplicationDto["document_urls"],
  ) => void;
  setFileUploading: (isFileUploading: boolean) => void;
  setFileDeleting: (isFileDeleting: boolean) => void;
  setFileLoading: (isFileLoading: boolean) => void;

  getFile: (key: string) => void;
  uploadFile: (file: File) => void;
  deleteFile: (url: string) => void;
}
