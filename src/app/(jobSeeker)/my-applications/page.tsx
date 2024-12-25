"use client";

import { useApplicationStore } from "@application/store";
import VacanciesSkeleton from "@components/skeletons/VacanciesSkeleton";
import VacancyCard from "@components/vacancy/vacancyCard";
import { useEffect } from "react";

const MyApplicationsPage = () => {
  const { applications, isApplicationsLoading, getJobSeekerApplications } =
    useApplicationStore();

  useEffect(() => {
    getJobSeekerApplications();
  }, []);

  if (isApplicationsLoading) {
    return <VacanciesSkeleton />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {applications.length === 0 ? (
        <div className="text-center text-yellow-500">No applications found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((application, index) => (
            <VacancyCard
              key={application.id}
              vacancy={application?.vacancy}
              delay={index / 10}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
