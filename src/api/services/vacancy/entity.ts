import { CompanyEntity } from "../auth/entity";

export interface VacancyEntity {
  id: string;
  company: CompanyEntity;
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
