import { JobSeekerEntity } from '../auth/entity';
import { VacancyEntity } from '../vacancy/entity';

export interface ApplicationEntity {
  id: string;
  jobSeeker: JobSeekerEntity;
  vacancy: VacancyEntity;
  documentUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
