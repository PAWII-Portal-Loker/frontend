import Head from "next/head";

const VacancyDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Vacancy</title>
      </Head>
      <section className="p-8">{children}</section>
    </>
  );
};

export default VacancyDetailLayout;
