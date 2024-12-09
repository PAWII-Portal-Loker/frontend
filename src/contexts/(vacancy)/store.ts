import { defaultVacancyFilter, VacancyStoreState } from "./type";
import { defaultPagination } from "@/common/utils/defaultPagination";
import { create } from "zustand";
import VacancyService from "./service";
import { toaster } from "@/components/ui/toaster";
import { initialCommonState } from "@/common/types/commonStoreState";

const vacancyService = new VacancyService();

const useVacancyStore = create<VacancyStoreState>((set, get) => ({
  ...initialCommonState,
  singleData: null,
  filters: defaultVacancyFilter,
  pagination: defaultPagination,

  setData: (data) => set({ data }),
  setSingleData: (singleData) => set({ singleData }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setFilters: (filters) => set({ filters }),
  setPagination: (pagination) => set({ pagination }),

  fetchData: () => {
    get().setIsLoading(true);

    vacancyService.getAll(
      {
        onSuccess: (vacancies) => {
          get().setData(vacancies);
        },
        onError: (message: string) => {
          toaster.create({
            title: "Failed to fetch vacancies",
            description: message,
            type: "error",
            duration: 3000,
          });
        },
        onFullfilled() {
          get().setIsLoading(false);
        },
      },
      Object.assign(useVacancyStore.getState().filters),
    );
  },

  fetchSingleData: (id) => {
    get().setIsLoading(true);

    vacancyService.getOne(id, {
      onSuccess: (vacancy) => {
        get().setSingleData(vacancy);
      },
      onError: (message: string) => {
        toaster.create({
          title: "Failed to fetch vacancy",
          description: message,
          type: "error",
          duration: 3000,
        });
      },
      onFullfilled() {
        get().setIsLoading(false);
      },
    });
  },
}));

export default useVacancyStore;
