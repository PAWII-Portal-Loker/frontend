"use client";

import useVacancyStore from "@/contexts/(vacancy)/state";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { isValidImageUrl } from "@/common/utils/validImageUrl";

export default function VacancyDetailPage() {
  const { id } = useParams();
  const { vacancy, isLoading, fetchVacancy } = useVacancyStore();

  useEffect(() => {
    fetchVacancy(id as string);
  }, [fetchVacancy, id]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!vacancy) {
    return <div className="text-center text-gray-500">Vacancy not found</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <div className="lg:w-1/2">
          <Image
            src={
              isValidImageUrl(vacancy.thumbnail_url)
                ? vacancy.thumbnail_url
                : "/no-image.jpg"
            }
            alt={vacancy.position}
            width={800}
            height={400}
            priority
            className="w-full rounded-lg shadow-md"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/no-image.jpg";
            }}
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
                vacancy.is_closed ? "bg-red-500 " : "bg-green-500 ",
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
    </div>
  );
}
