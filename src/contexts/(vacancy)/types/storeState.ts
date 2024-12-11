import { Pagination } from "@/common/types";
import { VacancyDto } from ".";
import { VacancyFilter } from "./filter";
import { CreateVacancyDto } from "./create";
import { UpdateVacancyDto } from "./update";
import { UpdateVacancyStatusDto } from "./updateStatus";

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
  createVacancy: (request: CreateVacancyDto) => void;
  updateVacancy: (request: UpdateVacancyDto) => void;
  updateVacancyStatus: (request: UpdateVacancyStatusDto) => void;
}
