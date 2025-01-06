"use client";

import VacanciesSkeleton from "@components/skeletons/VacanciesSkeleton";
import VacancyCard from "@components/vacancy/VacancyCard";
import { Button } from "@ui/button";
import useVacancyStore from "@vacancy/store";
import { useEffect } from "react";
import CreateVacancyDialog from "src/app/(company)/my-vacancies/CreateVacancyDialog";

const MyVacanciesPage = () => {
  const {
    vacancies,
    isVacanciesLoading,
    getVacancies,
    setFilters,
    setVacancyDialogOpen,
  } = useVacancyStore();

  useEffect(() => {
    setFilters({ ownedByMe: true });
    getVacancies();
  }, []);

  if (isVacanciesLoading) {
    return <VacanciesSkeleton />;
  }

  return (
    <div>
      <CreateVacancyDialog />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Vacancies</h1>
        <Button
          className="bg-blue-500 text-white p-2 font-bold rounded transition-all duration-200"
          onClick={() => setVacancyDialogOpen(true)}
        >
          Create Vacancy
        </Button>
      </div>
      {vacancies.length === 0 ? (
        <div className="text-center text-yellow-500">No vacancies found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vacancies.map((vacancy, index) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              delay={index / 10}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVacanciesPage;
