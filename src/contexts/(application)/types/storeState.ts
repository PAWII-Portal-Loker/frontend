import { ApplicationDto } from ".";
import { CreateApplicationDto } from "./create";

export interface ApplicationStoreState {
  applications: ApplicationDto[];
  isApplicationsLoading: boolean;
  application: ApplicationDto;
  isApplicationLoading: boolean;

  setApplications: (applications: ApplicationDto[]) => void;
  setApplicationsLoading: (isApplicationsLoading: boolean) => void;
  setApplication: (application: ApplicationDto) => void;
  setApplicationLoading: (isApplicationLoading: boolean) => void;
  getJobSeekerApplications: () => void;
  getVacancyApplicants: (id: string) => void;
  getApplication: (id: string) => void;
  createApplication: (request: CreateApplicationDto) => void;
  uploadResume: (file: File) => void;
  deleteResume: (key: string) => void;
}
