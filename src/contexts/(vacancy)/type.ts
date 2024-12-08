import { CompanyEntity } from "../company/type";

export interface VacancyEntity {
  id: string;
  company: CompanyEntity;
  jobType: string;
  incomeType: string;
  position: string;
  thumbnailUrl: string;
  description: string;
  appliedCount: number;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
