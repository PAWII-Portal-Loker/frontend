import { Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaKey } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Dropdown from "@ui/dropdown";
import { Button } from "@ui/button";
import useDashboardStore from "@hooks/dashboard/store";
import { useJobTypestore } from "@enums/stores/jobType";
import { useIncomeTypestore } from "@enums/stores/incomeType";
import { scaleVariants, slideVariants } from "@consts/animationVariants";
import useVacancyStore from "@vacancy/store";
import { VacancyFilter } from "@vacancy/types/filter";
import clsx from "clsx";
import {
  CONTAINER_ACTIVE_CLASSES,
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";

const JobSeekerDashboard = () => {
  const { isSearchFocused } = useDashboardStore();
  const { filters, setFilters } = useVacancyStore();
  const { jobTypes, isJobTypesLoading } = useJobTypestore();
  const { incomeTypes, isIncomeTypesLoading } = useIncomeTypestore();
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

  return (
    <div className="container flex flex-col items-center gap-6 px-4 py-16">
      <motion.div
        className="flex flex-col"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.3 }}
      >
        <p className="text-5xl font-bold tracking-tight text-center text-blue-500 sm:text-6xl">
          Find Your Dream Job
        </p>
        <p className="text-lg text-center">
          Explore thousands of job vacancies and find the right career for you.
        </p>
      </motion.div>
      <motion.div
        className={clsx(
          getThemeClassNames(CONTAINER_CLASSES),
          "p-4 flex flex-col gap-4 lg:flex-row lg:gap-8 rounded-md"
        )}
        variants={scaleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.5 }}
      >
        <div className="flex-1 relative">
          <Input
            placeholder="Keyword e.g. (Job Title, Description, Company Name)"
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
    </div>
  );
};

export default JobSeekerDashboard;
