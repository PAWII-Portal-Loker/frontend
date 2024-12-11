import { FilterType, Pagination } from "@/common/types";
import { CompanyDto } from "../(company)/type";
import { JobTypeEnums } from "../enums/types/jobTypes";
import { IncomeTypeEnums } from "../enums/types/incomeTypes";

export interface VacancyDto {
  id: string;
  company: CompanyDto;
  job_type: JobTypeEnums;
  income_type: IncomeTypeEnums;
  position: string;
  thumbnail_url: string;
  description: string;
  applied_count: number;
  is_closed: boolean;
  created_at: Date;
  updated_at: Date;
}

export type CreateVacancyDto = {
  job_type: JobTypeEnums;
  income_type: IncomeTypeEnums;
  position: VacancyDto["position"];
  thumbnail_url: VacancyDto["thumbnail_url"];
  description: VacancyDto["description"];
};

export type UpdateVacancyDto = {
  job_type: JobTypeEnums;
  income_type: IncomeTypeEnums;
  position: VacancyDto["position"];
  thumbnail_url: VacancyDto["thumbnail_url"];
  description: VacancyDto["description"];
};

export type updateVacancyStatusDto = {
  is_closed: VacancyDto["is_closed"];
};

export interface VacancyFilter extends FilterType {
  ownedByMe: boolean;
  ownedBy: string;
  position: string;
  jobType: string;
  incomeType: string;
  isClosed: boolean;
}

export interface VacancyStoreState {
  vacancies: VacancyDto[];
  isVacanciesLoading: boolean;
  vacancy: VacancyDto;
  isVacancyLoading: boolean;
  filters: VacancyFilter;
  pagination: Pagination;

  setVacancies: (vacancies: VacancyDto[]) => void;
  setIsVacanciesLoading: (isVacanciesLoading: boolean) => void;
  setVacancy: (vacancy: VacancyDto) => void;
  setIsVacancyLoading: (isVacancyLoading: boolean) => void;
  setFilters: (filters: VacancyFilter) => void;
  setPagination: (pagination: Pagination) => void;
  getVacancies: () => void;
  getVacancy: (id: string) => void;
}
