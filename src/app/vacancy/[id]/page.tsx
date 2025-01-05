"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import clsx from "clsx";
import useVacancyStore, { DefaultVacancyDto } from "@vacancy/store";
import AsyncImage from "@commoncomponents/async/AsyncImage";
import ApplicantsList from "./(company)/ApplicantsList";
import { hasPermission } from "@utils/permissions";
import useAuthStore from "@auth/store";
import { useApplicationStore } from "@application/store";
import ApplicationDialog from "./(jobSeeker)/ApplicationDialog";
import NotFoundPage from "src/app/not-found";
import { fadeVariants, scaleVariants } from "@consts/animationVariants";
import { motion } from "framer-motion";
import VacancyDetailLoadingCard from "@components/skeletons/VacancyDetailSkeleton";
import { CONTAINER_CLASSES, getThemeClassNames } from "@utils/classNames";

const VacancyDetailPage = () => {
  const { id } = useParams();
  const { vacancy, isVacancyLoading, getVacancy } = useVacancyStore();
  const { setApplicationDialogOpen } = useApplicationStore();
  const { auth } = useAuthStore();

  useEffect(() => {
    getVacancy(id as string);
  }, [id]);

  if (isVacancyLoading) {
    return <VacancyDetailLoadingCard />;
  }

  if (vacancy == DefaultVacancyDto) {
    return <NotFoundPage />;
  }

  return (
    <>
      {hasPermission(auth, "application", "create") && <ApplicationDialog />}
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          variants={scaleVariants}
          initial="initial"
          animate="animate"
          className="w-fit mx-auto"
        >
          <AsyncImage
            imgId={vacancy.thumbnail_url}
            alt={vacancy.position}
            width={800}
            height={400}
            imageClassName="w-[30rem] rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          variants={fadeVariants}
          animate="animate"
          initial="initial"
          transition={{ delay: 0.2 }}
          className={clsx(
            getThemeClassNames(CONTAINER_CLASSES),
            "lg:w-full p-4 rounded-lg shadow-md"
          )}
        >
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
          <h2 className="text-lg font-medium mb-2">
            {vacancy.company.company_name}
          </h2>
          <div className="flex items-center mb-4 text-sm">
            <span>{vacancy.applied_count} Applied</span>
            <span className="text-primary font-medium ml-4">
              {vacancy.job_type} - {vacancy.income_type}
            </span>
          </div>
          <p className="text-lg leading-relaxed mb-6">{vacancy.description}</p>
          {hasPermission(auth, "application", "create") && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full transition-colors duration-200"
              onClick={() => setApplicationDialogOpen(true)}
            >
              Apply
            </button>
          )}
        </motion.div>
      </div>
      <div className="mt-6 w-full">
        <ApplicantsList />
      </div>
    </>
  );
};

export default VacancyDetailPage;
