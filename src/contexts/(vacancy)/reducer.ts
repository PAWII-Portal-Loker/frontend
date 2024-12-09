import VacancyService from "./service";
import useVacancyStore from "./state";
import { toaster } from "@/components/ui/toaster";

const vacancyService = new VacancyService();

export const fetchVacancies = () => {
  const { setVacancies, setIsLoading } = useVacancyStore.getState();
  setIsLoading(true);

  vacancyService.getAll(
    {
      onSuccess: (vacancies) => {
        setVacancies(vacancies);
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
        setIsLoading(false);
      },
    },
    Object.assign(useVacancyStore.getState().filters),
  );
};

export const fetchVacancy = (id: string) => {
  const { setIsLoading, setVacancy } = useVacancyStore.getState();
  setIsLoading(true);

  vacancyService.getOne(id, {
    onSuccess: (vacancy) => {
      setVacancy(vacancy);
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
      setIsLoading(false);
    },
  });
};
