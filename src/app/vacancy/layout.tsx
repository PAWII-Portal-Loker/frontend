import Head from "next/head";

const VacancyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Vacancy</title>
      </Head>
      <section className="p-8">{children}</section>
    </>
  );
};

export default VacancyLayout;
