import { JobSeekerDto } from "@/contexts/(jobSeeker)/types";
import { VacancyDto } from "@/contexts/(vacancy)/types";

export interface ApplicationDto {
  id: string;
  job_seeker?: JobSeekerDto;
  vacancy?: VacancyDto;
  document_urls: string[];
  message: string;
  created_at: Date;
  updated_at: Date;
}
