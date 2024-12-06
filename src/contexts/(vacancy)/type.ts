import { CompanyEntity } from "../auth/type";

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
