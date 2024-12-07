"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncomeTypeStore, useJobTypeStore } from "@/contexts/const/reducer";
import useDashboardStore from "@/hooks/dashboard/reducer";
import { Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaChevronDown, FaKey } from "react-icons/fa";

export default function Home() {
  const { isSearchFocused, setIsSearchFocused } = useDashboardStore();

  const {
    data: jobTypes,
    fetchData: fetchJobTypes,
    isLoading: isJobTypesLoading,
  } = useJobTypeStore();
  const {
    data: incomeTypes,
    fetchData: fetchIncomeTypes,
    isLoading: isIncomeTypesLoading,
  } = useIncomeTypeStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        setIsSearchFocused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchFocused]);

  useEffect(() => {
    fetchJobTypes();
    fetchIncomeTypes();
  }, [fetchJobTypes, fetchIncomeTypes]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-slate-500 text-gray-100"
      style={{
        backgroundImage: "url('/hero.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="container flex flex-col items-center gap-6 px-4 py-16">
        <div className="flex flex-col">
          <p className="text-5xl font-bold tracking-tight text-center text-blue-300 sm:text-6xl">
            Find Your Dream Job
          </p>
          <p className="text-lg text-center">
            Explore thousands of job vacancies and find the right career for
            you.
          </p>
        </div>
        <div className="bg-slate-500 p-4 flex flex-col gap-4 lg:flex-row lg:gap-8 rounded-md">
          <div className="flex-1 relative">
            <Input
              placeholder="Keyword e.g. (Job Title, Description, Company Name)"
              ref={isSearchFocused ? (input) => input?.focus() : null}
              className="pl-10 pr-14 py-3 rounded-lg border-2 bg-gray-100 border-gray-300 focus:border-blue-500 text-lg text-gray-800 placeholder-gray-400"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaKey className="text-gray-400" />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="bg-gray-500 text-white rounded-lg text-sm px-2 py-1">
                ⌘F
              </kbd>
            </div>
          </div>
          <div className="relative">
            {isJobTypesLoading ? (
              <Skeleton className="lg:w-[160px] w-full h-[44px]" />
            ) : (
              <div className="relative">
                <select className="w-full pl-3 pr-8 py-1 rounded-lg border-2 border-gray-300 text-lg text-gray-600 appearance-none">
                  <option value="ALL">All</option>
                  {jobTypes.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {jobType}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            {isIncomeTypesLoading ? (
              <Skeleton className="lg:w-[160px] w-full h-[44px]" />
            ) : (
              <div className="relative">
                <select className="w-full pl-3 pr-8 py-1 rounded-lg border-2 border-gray-300 text-lg text-gray-600 appearance-none">
                  <option value="ALL">All</option>
                  {incomeTypes.map((incomeType) => (
                    <option key={incomeType} value={incomeType}>
                      {incomeType}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>
            )}
          </div>
          <Button className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
