"use client";

import { useApplicationStore } from "@application/store";
import useAuthStore from "@auth/store";
import ApplicantCard from "@components/applicant/ApplicantCard";
import ApplicantsSkeleton from "@components/skeletons/ApplicantsSkeleton";
import { CONTAINER_CLASSES, getThemeClassNames } from "@utils/classNames";
import { hasPermission } from "@utils/permissions";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ApplicantsList = () => {
  const { applicants, isApplicantsLoading, getApplicantsByVacancyId } =
    useApplicationStore();
  const { auth } = useAuthStore();
  const { id } = useParams();

  useEffect(() => {
    if (hasPermission(auth, "application", "view")) {
      getApplicantsByVacancyId(id as string);
    }
  }, [auth?.role]);

  if (!hasPermission(auth, "application", "view")) {
    return null;
  }

  return (
    <div className={clsx(getThemeClassNames(CONTAINER_CLASSES), "w-full p-4 pb-6 rounded-lg shadow-md")}>
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>
      {isApplicantsLoading ? (
        <ApplicantsSkeleton />
      ) : applicants.length === 0 ? (
        <div className="text-center text-yellow-500">No applicants found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicants.map((applicant) => (
            <ApplicantCard applicant={applicant} key={applicant.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsList;
