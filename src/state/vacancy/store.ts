import { VacancyEntity } from '@/api/services/vacancy/entity';
import VacancyService from '@/api/services/vacancy/route';
import { toaster } from '@/components/ui/toaster';
import { create } from 'zustand';

const vacancyService = new VacancyService();
interface VacancyState {
  vacancies: VacancyEntity[];
  isLoading: boolean;
}

interface VacancyActions {
  setVacancies: (vacancies: VacancyEntity[]) => void;
  setIsLoading: (loading: boolean) => void;
  fetchVacancies: () => void;
}

interface StoreState extends VacancyState, VacancyActions {}

const useStore = create<StoreState>((set) => ({
  vacancies: [],
  isLoading: false,

  setVacancies: (vacancies) => set({ vacancies }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  fetchVacancies: async () => {
    set({ isLoading: true });

    vacancyService.getDummy({
      onSuccess: (vacancies) => {
        set({ vacancies });
      },
      onError: (message: string) => {
        toaster.create({
          title: 'Failed to fetch vacancies',
          description: message,
          type: 'error',
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
