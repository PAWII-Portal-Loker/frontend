import { create } from "zustand";
import { VacancyDto } from "./types";
import { DefaultCompanyDto } from "@company/store";
import { VacancyFilter } from "./types/filter";
import VacancyService from "./service";
import { VacancyStoreState } from "./types/storeState";
import { toaster } from "@ui/toaster";
import { DefaultPagination } from "@utils/defaultPagination";

export const DefaultVacancyDto: VacancyDto = {
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

const DefaultVacancyFilter: VacancyFilter = {
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

const vacancyService = new VacancyService();

const useVacancyStore = create<VacancyStoreState>((set, get) => ({
  vacancies: [],
  isVacanciesLoading: false,
  vacancy: DefaultVacancyDto,
  isVacancyLoading: false,
  filters: DefaultVacancyFilter,
  pagination: DefaultPagination,

  setVacancies: (vacancies) => set({ vacancies }),
  setVacanciesLoading: (isVacanciesLoading) => set({ isVacanciesLoading }),
  setVacancy: (vacancy) => set({ vacancy }),
  setVacancyLoading: (isVacancyLoading) => set({ isVacancyLoading }),
  setFilters: (filters) => set({ filters }),
  setPagination: (pagination) => set({ pagination }),

  getVacancies: () => {
    get().setVacanciesLoading(true);

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
          get().setVacanciesLoading(false);
        },
      },
      Object.assign(useVacancyStore.getState().filters)
    );
  },

  getVacancy: (id) => {
    get().setVacancyLoading(true);

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
        get().setVacancyLoading(false);
      },
    });
  },

  createVacancy: (request) => {
    get().setVacancyLoading(true);

    vacancyService.createVacancy(request, {
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: "Vacancy created successfully",
          type: "success",
          duration: 3000,
        });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to create vacancy",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setVacancyLoading(false);
      },
    });
  },

  updateVacancy: (request) => {
    get().setVacancyLoading(true);

    vacancyService.updateVacancy(get().vacancy.id, request, {
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: "Vacancy updated successfully",
          type: "success",
          duration: 3000,
        });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to update vacancy",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setVacancyLoading(false);
      },
    });
  },

  updateVacancyStatus: (request) => {
    get().setVacancyLoading(true);

    vacancyService.updateVacancyStatus(get().vacancy.id, request, {
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: "Vacancy status updated successfully",
          type: "success",
          duration: 3000,
        });
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to update vacancy status",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setVacancyLoading(false);
      },
    });
  },
}));

export default useVacancyStore;
