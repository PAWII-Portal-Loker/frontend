import { VacancyDto } from ".";
import { VacancyFilter } from "./filter";
import { CreateVacancyDto } from "./create";
import { UpdateVacancyDto } from "./update";
import { UpdateVacancyStatusDto } from "./updateStatus";
import { Pagination } from "@types";

export interface VacancyStoreState {
  vacancies: VacancyDto[];
  isVacanciesLoading: boolean;
  vacancy: VacancyDto;
  isVacancyLoading: boolean;
  filters: Partial<VacancyFilter>;
  pagination: Pagination;
  isVacancyDialogOpen: boolean;
  image: File[];
  isImageLoading: boolean;

  setVacancies: (vacancies: VacancyDto[]) => void;
  setVacanciesLoading: (isVacanciesLoading: boolean) => void;
  setVacancy: (vacancy: VacancyDto) => void;
  setVacancyLoading: (isVacancyLoading: boolean) => void;
  setFilters: (filters: Partial<VacancyFilter>) => void;
  setPagination: (pagination: Pagination) => void;
  setVacancyDialogOpen: (isOpen: boolean) => void;
  setImage: (image: File[] | ((prevImage: File[]) => File[])) => void;
  uploadImage: (file: File[]) => Promise<VacancyDto["thumbnail_url"]>;
  setImageLoading: (isImageLoading: boolean) => void;
  getVacancies: () => void;
  getVacancy: (id: string) => void;
  createVacancy: (request: CreateVacancyDto) => void;
  updateVacancy: (request: UpdateVacancyDto) => void;
  updateVacancyStatus: (request: UpdateVacancyStatusDto) => void;
}
