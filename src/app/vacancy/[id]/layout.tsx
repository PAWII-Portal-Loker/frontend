import VacancyDetailLoadingCard from "@components/containers/vacancyDetailLoadingCard";
import Head from "next/head";
import { Suspense } from "react";

const VacancyDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Vacancy</title>
      </Head>
      <section className="p-8">
        <Suspense fallback={<VacancyDetailLoadingCard />}>{children}</Suspense>
      </section>
    </>
  );
};

export default VacancyDetailLayout;
