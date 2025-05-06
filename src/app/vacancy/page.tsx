"use client";

import VacanciesSkeleton from "@components/skeletons/VacanciesSkeleton";
import VacancyCard from "@components/vacancy/VacancyCard";
import { scaleVariants } from "@consts/animationVariants";
import { extractQueryParams } from "@utils/searchParams";
import useVacancyStore from "@vacancy/store";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { get } from "node_modules/axios/index.cjs";
import { useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";
import { VacancyFilter } from "@vacancy/types/filter";
import useDashboardStore from "@hooks/dashboard/store";
import { useJobTypestore } from "@enums/stores/jobType";
import { useIncomeTypestore } from "@enums/stores/incomeType";
import { FaKey } from "react-icons/fa6";
import Dropdown from "@ui/dropdown";
import { 
  CONTAINER_ACTIVE_CLASSES, 
  CONTAINER_CLASSES, 
  getThemeClassNames, 
  TEXT_CLASSES 
} from "@utils/classNames";
import clsx from "clsx";

const VacancyPage = () => {
  const { isSearchFocused } = useDashboardStore();
  const { jobTypes, isJobTypesLoading } = useJobTypestore();
  const { incomeTypes, isIncomeTypesLoading } = useIncomeTypestore();
  const { vacancies, isVacanciesLoading, filters, setFilters, getVacancies } =
    useVacancyStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    for (const key in filters) {
      const value = filters[key as keyof VacancyFilter];
      if (value) {
        queryParams.append(key, value.toString());
      }
    }
    const queryString = queryParams.toString();
    router.push(`/vacancy${queryString ? "?" + queryString : ""}`);
  };

  useEffect(() => {
    getVacancies();
  }, [searchParams]);

  if (isVacanciesLoading) {
    return <VacanciesSkeleton />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vacancies</h1>
      {/* For Filter Vacancies */}
      <motion.div
        className={clsx(
          getThemeClassNames(CONTAINER_CLASSES),
          "p-4 flex flex-col gap-4 lg:flex-row lg:gap-8 rounded-md mb-6",
        )}
        variants={scaleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.5 }}
      >
        <div className="flex-1 relative">
          <Input
            placeholder="Search Jobs e.g (Title)"
            ref={isSearchFocused ? (input) => input?.focus() : null}
            className={clsx(
              "pl-10 pr-14 py-3 rounded-lg focus:border-blue-500 text-lg",
              getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
            )}
            value={filters.position}
            onChange={(e) => setFilters({ position: e.target.value })}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaKey className="dark:text-gray-200 text-gray-500" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <kbd className="dark:bg-gray-200 bg-gray-500 dark:text-slate-700 text-slate-100 rounded-lg text-sm px-2 py-1">
              ⌘F
            </kbd>
          </div>
        </div>
        <Dropdown
          items={jobTypes}
          name="Job Type"
          value={filters.jobType}
          onSelect={(value) => setFilters({ jobType: value })}
          isLoading={isJobTypesLoading}
        />
        <Dropdown
          items={incomeTypes}
          name="Income Type"
          value={filters.incomeType}
          onSelect={(value) => setFilters({ incomeType: value })}
          isLoading={isIncomeTypesLoading}
        />
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
          onClick={handleSearch}
        >
          Search
        </Button>
      </motion.div>
      {/* ----- */}
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