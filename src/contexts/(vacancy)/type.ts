import { FilterType, Pagination } from "@/common/types";
import { CompanyDto } from "../company/type";
import { CommonStoreState } from "@/common/types/commonStoreState";

export interface VacancyDto {
  id: string;
  company: CompanyDto;
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

export interface VacancyStoreState extends CommonStoreState<VacancyDto> {
  singleData: VacancyDto | null;
  filters: VacancyFilter;
  pagination: Pagination;

  setSingleData: (data: VacancyDto) => void;
  setFilters: (filters: VacancyFilter) => void;
  setPagination: (pagination: Pagination) => void;
  fetchData: () => void;
  fetchSingleData: (id: string) => void;
}
