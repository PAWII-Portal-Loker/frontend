import { VacancyEntity } from '@/api/services/vacancy/entity';
import { create } from 'zustand';

interface StoreState {
  vacancies: VacancyEntity[];
  setVacancies: (vacancies: VacancyEntity[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  vacancies: [],
  setVacancies: (vacancies) => set({ vacancies }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useStore;
