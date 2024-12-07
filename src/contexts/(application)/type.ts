import { JobSeekerEntity } from "../auth/type";
import { VacancyEntity } from "../(vacancy)/type";

export interface ApplicationEntity {
  id: string;
  jobSeeker: JobSeekerEntity;
  vacancy: VacancyEntity;
  documentUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
