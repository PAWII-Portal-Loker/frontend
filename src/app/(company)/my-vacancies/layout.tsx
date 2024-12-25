"use client";

import useAuthStore from "@auth/store";
import { ROLE_COMPANY } from "@enums/types/roles";
import Head from "next/head";
import NotAuthorizedPage from "src/app/not-authorized";

const MyVacanciesLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore();

  if (auth.role !== ROLE_COMPANY) {
    return <NotAuthorizedPage />;
  }

  return (
    <>
      <Head>
        <title>My Vacancies</title>
      </Head>
      <section className="p-8">{children}</section>
    </>
  );
};

export default MyVacanciesLayout;