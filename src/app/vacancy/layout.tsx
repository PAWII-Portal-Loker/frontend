import Head from "next/head";
import { Suspense } from "react";
import VacanciesSkeleton from "@components/skeletons/VacanciesSkeleton";

const VacancyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<VacanciesSkeleton />}>
      <Head>
        <title>Vacancy</title>
      </Head>
      <section className="p-8">{children}</section>
    </Suspense>
  );
};

export default VacancyLayout;
