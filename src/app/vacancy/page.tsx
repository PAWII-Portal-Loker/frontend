"use client";

import useVacancyStore from "@/contexts/(vacancy)/reducer";
import { useEffect } from "react";
import VacancyCard from "./VacancyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function VacancyPage() {
  const { vacancies, isLoading, fetchVacancies } = useVacancyStore();

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vacancies</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden relative animate-pulse p-4"
            >
              <div className="w-full h-[200px] bg-gray-200 mb-3 rounded-lg"></div>
              <Skeleton width="60%" height="20px" mb="2" />
              <Skeleton width="30%" height="16px" mb="2" />
              <div className="flex justify-between">
                <Skeleton width="35%" height="16px" />
                <Skeleton width="30%" height="16px" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      )}
    </div>
  );
}
