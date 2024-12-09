import { VacancyEntity } from "../(vacancy)/type";
import { JobSeekerEntity } from "../jobSeeker/type";

export interface ApplicationEntity {
  id: string;
  jobSeeker: JobSeekerEntity;
  vacancy: VacancyEntity;
  documentUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
