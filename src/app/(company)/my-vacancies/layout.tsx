"use client";

import useAuthStore from "@auth/store";
import { hasPermission } from "@utils/permissions";
import Head from "next/head";
import NotAuthorizedPage from "src/app/not-authorized";

const MyVacanciesLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore();

  if (hasPermission(auth, "myVacancies", "view")) {
    return <NotAuthorizedPage />;
  }

  return (
    <>
      <Head>
        <title>My Vacancies</title>
      </Head>
      <section className="p-[min(8%, 2rem)]">{children}</section>
    </>
  );
};

export default MyVacanciesLayout;
