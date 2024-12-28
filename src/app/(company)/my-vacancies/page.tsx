"use client";

import VacanciesSkeleton from "@components/skeletons/VacanciesSkeleton";
import VacancyCard from "@components/vacancy/VacancyCard";
import useVacancyStore from "@vacancy/store";
import { useEffect } from "react";

const MyVacanciesPage = () => {
  const { vacancies, isVacanciesLoading, getVacancies, setFilters } =
    useVacancyStore();

  useEffect(() => {
    setFilters({ ownedByMe: true });
    getVacancies();
  }, []);

  if (isVacanciesLoading) {
    return <VacanciesSkeleton />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Vacancies</h1>
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
