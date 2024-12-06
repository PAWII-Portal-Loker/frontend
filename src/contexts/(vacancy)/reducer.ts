import { create } from "zustand";
import VacancyService from "./service";
import { VacancyActions, VacancyState } from "./state";
import { toaster } from "@/components/ui/toaster";

const vacancyService = new VacancyService();

type StoreState = VacancyState & VacancyActions;
const useStore = create<StoreState>((set) => ({
  vacancies: [],
  vacancy: null,
  isLoading: false,

  setVacancies: (vacancies) => set({ vacancies }),
  setVacancy: (vacancy) => set({ vacancy }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  fetchVacancies: async () => {
    set({ isLoading: true });

    vacancyService.getDummy({
      onSuccess: (vacancies) => {
        set({ vacancies });
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
        set({ isLoading: false });
      },
    });
  },

  fetchVacancy: async (id) => {
    set({ isLoading: true });

    vacancyService.getOneDummy(id, {
      onSuccess: (vacancy) => {
        set({ vacancy });
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
        set({ isLoading: false });
      },
    });
  },
}));

export default useStore;
