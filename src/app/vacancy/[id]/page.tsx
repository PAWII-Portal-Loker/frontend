"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import clsx from "clsx";
import useVacancyStore from "@vacancy/store";
import LoadingCard from "@components/containers/loadingCard";
import AsyncImage from "@commoncomponents/async/AsyncImage";

const VacancyDetailPage = () => {
  const { id } = useParams();
  const { vacancy, isVacancyLoading, getVacancy } = useVacancyStore();

  useEffect(() => {
    getVacancy(id as string);
  }, [id]);

  if (isVacancyLoading) {
    return <LoadingCard />;
  }
  if (!vacancy) {
    return <div className="text-center text-yellow-500">Vacancy not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="lg:w-1/2">
        <AsyncImage
          imgId={vacancy.thumbnail_url}
          alt={vacancy.position}
          width={800}
          height={400}
          className="w-full rounded-lg shadow-md"
        />
      </div>
      <div className="lg:w-1/2 p-4 bg-white text-gray-800 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-primary">
            {vacancy.position}
          </h1>
          <span
            className={clsx(
              "px-2 py-1 rounded-md text-xs font-bold text-white",
              vacancy.is_closed ? "bg-red-500 " : "bg-green-500 "
            )}
          >
            {vacancy.is_closed ? "Closed" : "Open"}
          </span>
        </div>
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          {vacancy.company.company_name}
        </h2>
        <div className="flex items-center mb-4">
          <span className="text-gray-500 text-sm">
            {vacancy.applied_count} Applied
          </span>
          <span className="text-primary text-sm font-medium ml-4">
            {vacancy.job_type} - {vacancy.income_type}
          </span>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {vacancy.description}
        </p>
      </div>
    </div>
  );
};

export default VacancyDetailPage;
