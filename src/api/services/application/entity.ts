import { JobSeekerResponse } from '../auth/entity';
import { VacancyResponse } from '../vacancy/entity';

export interface ApplicationResponseDto {
  id: string;
  jobSeeker: JobSeekerResponse;
  vacancy: VacancyResponse;
  documentUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
