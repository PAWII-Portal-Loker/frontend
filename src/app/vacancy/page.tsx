"use client";

import VacanciesSkeleton from "@components/skeletons/VacanciesSkeleton";
import VacancyCard from "@components/vacancy/VacancyCard";
import { extractQueryParams } from "@utils/searchParams";
import useVacancyStore from "@vacancy/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VacancyPage = () => {
  const { vacancies, isVacanciesLoading, setFilters, getVacancies } =
    useVacancyStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    setFilters(extractQueryParams(searchParams));
    getVacancies();
  }, []);

  if (isVacanciesLoading) {
    return <VacanciesSkeleton />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vacancies</h1>
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

export default VacancyPage;
