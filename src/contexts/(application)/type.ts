import { VacancyEntity } from "../(vacancy)/type";
import { JobSeekerEntity } from "../jobSeeker/type";

export interface ApplicationEntity {
  id: string;
  job_seeker: JobSeekerEntity;
  vacancy: VacancyEntity;
  document_urls: string[];
  created_at: Date;
  updated_at: Date;
}
