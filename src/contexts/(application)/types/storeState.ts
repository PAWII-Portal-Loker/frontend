import { ApplicationDto } from ".";
import { CreateApplicationDto } from "./create";

export interface ApplicationStoreState {
  applications: ApplicationDto[];
  isApplicationsLoading: boolean;
  application: ApplicationDto;
  isApplicationLoading: boolean;

  applicants: ApplicationDto[];
  isApplicantsLoading: boolean;

  isApplicationDialogOpen: boolean;

  documents: FileList | null;
  isDocumentLoading: boolean;
  isDocumentUploading: boolean;
  isDocumentDeleting: boolean;

  setApplications: (applications: ApplicationDto[]) => void;
  setApplicationsLoading: (isApplicationsLoading: boolean) => void;
  setApplication: (application: ApplicationDto) => void;
  setApplicationLoading: (isApplicationLoading: boolean) => void;

  setApplicants: (applicants: ApplicationDto[]) => void;
  setApplicantsLoading: (isApplicantsLoading: boolean) => void;

  getJobSeekerApplications: () => void;
  getApplicantsByVacancyId: (id: string) => void;

  setApplicationDialogOpen: (isOpen: boolean) => void;
  createApplication: (request: CreateApplicationDto) => void;

  setDocuments: (documents: FileList | null) => void;
  setDocumentLoading: (isDocumentLoading: boolean) => void;
  setDocumentUploading: (isDocumentUploading: boolean) => void;
  setDocumentDeleting: (isDocumentDeleting: boolean) => void;
  getDocument: (key: string) => void;
  uploadDocuments: (file: FileList) => Promise<ApplicationDto["document_urls"]>;
  deleteDocument: (url: string) => void;
}
