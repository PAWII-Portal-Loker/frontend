import { FilterType } from "@/common/types";
import { CompanyEntity } from "../company/type";

export interface VacancyEntity {
  id: string;
  company: CompanyEntity;
  job_type: string;
  income_type: string;
  position: string;
  thumbnail_url: string;
  description: string;
  applied_count: number;
  is_closed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface VacancyFilter extends FilterType {
  ownedByMe: boolean;
  ownedBy: string;
  position: string;
  jobType: string;
  incomeType: string;
  isClosed: boolean;
}

export const defaultVacancyFilter: VacancyFilter = {
  page: 1,
  limit: 10,
  order: "desc",
  sort: "createdAt",
  ownedByMe: false,
  ownedBy: "",
  position: "",
  jobType: "",
  incomeType: "",
  isClosed: false,
};
