import { CompanyResponse } from '../auth/entity';

export interface VacancyResponse {
  id: string;
  company: CompanyResponse;
  jobType: string;
  incomeType: string;
  position: string;
  thumnailUrl: string;
  description: string;
  applied_count: number;
  is_closed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
