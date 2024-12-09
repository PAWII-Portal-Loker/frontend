import { Pagination } from "@/common/types";
import { defaultVacancyFilter, VacancyEntity, VacancyFilter } from "./type";
import { defaultPagination } from "@/common/utils/defaultPagination";
import { create } from "zustand";
import { fetchVacancies, fetchVacancy } from "./reducer";

interface VacancyState {
  vacancies: VacancyEntity[];
  vacancy: VacancyEntity | null;
  isLoading: boolean;
  filters: VacancyFilter;
  pagination: Pagination;
}

interface VacancyActions {
  setVacancies: (vacancies: VacancyEntity[]) => void;
  setVacancy: (vacancy: VacancyEntity) => void;
  setIsLoading: (loading: boolean) => void;
  setFilters: (filters: VacancyFilter) => void;
  setPagination: (pagination: Pagination) => void;
  fetchVacancies: () => void;
  fetchVacancy: (id: string) => void;
}

const initialVacancyState: VacancyState = {
  vacancies: [],
  vacancy: null,
  isLoading: false,
  filters: defaultVacancyFilter,
  pagination: defaultPagination,
};

type StoreState = VacancyState & VacancyActions;
const useVacancyStore = create<StoreState>((set) => ({
  ...initialVacancyState,

  setVacancies: (vacancies) => set({ vacancies }),
  setVacancy: (vacancy) => set({ vacancy }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setFilters: (filters) => set({ filters }),
  setPagination: (pagination) => set({ pagination }),

  fetchVacancies: () => fetchVacancies(),
  fetchVacancy: (id) => fetchVacancy(id),
}));

export default useVacancyStore;
