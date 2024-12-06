import { VacancyEntity } from "./type";

export interface VacancyState {
  vacancies: VacancyEntity[];
  vacancy: VacancyEntity | null;
  isLoading: boolean;
}

export interface VacancyActions {
  setVacancies: (vacancies: VacancyEntity[]) => void;
  setVacancy: (vacancy: VacancyEntity) => void;
  setIsLoading: (loading: boolean) => void;
  fetchVacancies: () => void;
  fetchVacancy: (id: string) => void;
}
