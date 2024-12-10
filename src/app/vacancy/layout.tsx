import Head from "next/head";

export default function VacancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Vacancy</title>
      </Head>
      <section className="p-8">{children}</section>
    </>
  );
}
