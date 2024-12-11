import { JobSeekerDto } from "../(jobSeeker)/types";
import { VacancyDto } from "../(vacancy)/type";

export interface ApplicationDto {
  id: string;
  job_seeker?: JobSeekerDto;
  vacancy?: VacancyDto;
  document_urls: string[];
  message: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateApplicationDto {
  vacancy_id: VacancyDto["id"];
  document_urls: ApplicationDto["document_urls"];
  message: ApplicationDto["message"];
}

export interface ApplicationStoreState {
  applications: ApplicationDto[];
  isApplicationsLoading: boolean;
  application: ApplicationDto;
  isApplicationLoading: boolean;

  setApplications: (applications: ApplicationDto[]) => void;
  setIsApplicationsLoading: (isApplicationsLoading: boolean) => void;
  setApplication: (application: ApplicationDto) => void;
  setIsApplicationLoading: (isApplicationLoading: boolean) => void;
  getJobSeekerApplications: () => void;
  getVacancyApplicants: (id: string) => void;
  getApplication: (id: string) => void;
  createApplication: (request: CreateApplicationDto) => void;
  uploadResume: (file: File) => void;
  deleteResume: (key: string) => void;
}
