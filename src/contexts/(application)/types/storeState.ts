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
  uploadResume: (file: File) => void;
  deleteResume: (key: string) => void;
}
