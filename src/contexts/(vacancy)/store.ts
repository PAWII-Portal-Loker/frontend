import { defaultVacancyFilter, VacancyDto, VacancyStoreState } from "./type";
import { defaultPagination } from "@/common/utils/defaultPagination";
import { create } from "zustand";
import VacancyService from "./service";
import { toaster } from "@/components/ui/toaster";
import { DefaultCompanyDto } from "../(company)/store";

const vacancyService = new VacancyService();

const DefaultVacancyDto: VacancyDto = {
  id: "",
  company: DefaultCompanyDto,
  job_type: "",
  income_type: "",
  position: "",
  thumbnail_url: "",
  description: "",
  applied_count: 0,
  is_closed: false,
  created_at: new Date(),
  updated_at: new Date(),
};

const useVacancyStore = create<VacancyStoreState>((set, get) => ({
  vacancies: [],
  isVacanciesLoading: false,
  vacancy: DefaultVacancyDto,
  isVacancyLoading: false,
  filters: defaultVacancyFilter,
  pagination: defaultPagination,

  setVacancies: (vacancies) => set({ vacancies }),
  setIsVacanciesLoading: (isVacanciesLoading) => set({ isVacanciesLoading }),
  setVacancy: (vacancy) => set({ vacancy }),
  setIsVacancyLoading: (isVacancyLoading) => set({ isVacancyLoading }),
  setFilters: (filters) => set({ filters }),
  setPagination: (pagination) => set({ pagination }),

  getVacancies: () => {
    get().setIsVacanciesLoading(true);

    vacancyService.getVacancies(
      {
        onSuccess: (vacancies) => {
          get().setVacancies(vacancies);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to get vacancies",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setIsVacanciesLoading(false);
        },
      },
      Object.assign(useVacancyStore.getState().filters),
    );
  },

  getVacancy: (id) => {
    get().setIsVacancyLoading(true);

    vacancyService.getVacancy(id, {
      onSuccess: (vacancy) => {
        get().setVacancy(vacancy);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to get vacancy",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsVacancyLoading(false);
      },
    });
  },
}));

export default useVacancyStore;
