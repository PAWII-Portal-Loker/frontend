import { VacancyDto } from "../(vacancy)/type";
import { JobSeekerDto } from "../(jobSeeker)/type";

export interface ApplicationDto {
  id: string;
  job_seeker: JobSeekerDto;
  vacancy: VacancyDto;
  document_urls: string[];
  created_at: Date;
  updated_at: Date;
}
